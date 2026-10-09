// Syncs Cloudinary portfolio assets into their matching project and event records.
// Usage: npm run sync:images
import { createClient } from "@supabase/supabase-js";

const PROJECT_ROOT_FOLDER =
  process.env.CLOUDINARY_ROOT_FOLDER || "portfolio/projects_imgs";
const EVENT_ROOT_FOLDER =
  process.env.CLOUDINARY_EVENT_ROOT_FOLDER || "portfolio/events";

const required = [
  "SUPABASE_URL",
  "SUPABASE_SERVICE_ROLE_KEY",
  "CLOUDINARY_CLOUD_NAME",
  "CLOUDINARY_API_KEY",
  "CLOUDINARY_API_SECRET",
];
const missing = required.filter((name) => !process.env[name]);
if (missing.length) {
  console.error(
    `Missing environment variables in .env.local: ${missing.join(", ")}`,
  );
  process.exit(1);
}

const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
const authHeader = `Basic ${Buffer.from(
  `${process.env.CLOUDINARY_API_KEY}:${process.env.CLOUDINARY_API_SECRET}`,
).toString("base64")}`;

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  {
    auth: { persistSession: false, autoRefreshToken: false },
  },
);

const normalize = (value) => value.toLowerCase().replace(/[^a-z0-9]/g, "");

async function searchCloudinary(expression) {
  const resources = [];
  let nextCursor;

  do {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/resources/search`,
      {
        method: "POST",
        headers: {
          Authorization: authHeader,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          expression,
          max_results: 500,
          sort_by: [{ public_id: "asc" }],
          ...(nextCursor ? { next_cursor: nextCursor } : {}),
        }),
      },
    );
    const body = await response.json();
    if (!response.ok) {
      throw new Error(
        body.error?.message ?? `Cloudinary request failed (${response.status})`,
      );
    }
    resources.push(...body.resources);
    nextCursor = body.next_cursor;
  } while (nextCursor);

  return resources;
}

async function fetchResources(rootFolder) {
  // Dynamic folder mode uses asset_folder; fixed folder mode uses folder.
  try {
    return await searchCloudinary(
      `asset_folder:${rootFolder}/* AND resource_type:image`,
    );
  } catch {
    return searchCloudinary(`folder:${rootFolder}/* AND resource_type:image`);
  }
}

const folderOf = (resource) => resource.asset_folder ?? resource.folder ?? "";

const { data: projects, error: projectsError } = await supabase
  .from("projects")
  .select("slug, name");
if (projectsError) throw projectsError;
const { data: events, error: eventsError } = await supabase
  .from("events")
  .select("slug, name");
if (eventsError) throw eventsError;

// Folder names are matched loosely, so "houseofshawarma" maps to "house-of-shawarma".
const projectsByKey = new Map();
for (const project of projects) {
  projectsByKey.set(normalize(project.slug), project);
  projectsByKey.set(normalize(project.name), project);
}

const grouped = new Map();
for (const resource of await fetchResources(PROJECT_ROOT_FOLDER)) {
  const folderName = folderOf(resource)
    .slice(PROJECT_ROOT_FOLDER.length + 1)
    .split("/")[0];
  if (!folderName) continue;
  const project = projectsByKey.get(normalize(folderName));
  if (!project) {
    console.warn(
      `Skipping "${folderName}": no project with a matching slug or name.`,
    );
    continue;
  }
  grouped.set(project.slug, [...(grouped.get(project.slug) ?? []), resource]);
}

for (const [slug, resources] of grouped) {
  const project = projects.find((item) => item.slug === slug);
  resources.sort((a, b) =>
    (a.display_name ?? a.public_id).localeCompare(
      b.display_name ?? b.public_id,
      undefined,
      {
        numeric: true,
      },
    ),
  );

  const { data: existing, error: existingError } = await supabase
    .from("project_images")
    .select("id, public_id")
    .eq("project_slug", slug);
  if (existingError) throw existingError;

  const rows = resources.map((resource, index) => ({
    project_slug: slug,
    public_id: resource.public_id,
    src: resource.secure_url,
    alt: `${project.name} screenshot ${index + 1}`,
    width: resource.width,
    height: resource.height,
    format: resource.format,
    bytes: resource.bytes,
    sort_order: index,
  }));

  // Rows added by hand (no public_id) are left untouched; existing alt text is preserved.
  const known = new Set(
    existing.filter((row) => row.public_id).map((row) => row.public_id),
  );
  const toUpdate = rows.filter((row) => known.has(row.public_id));
  const toInsert = rows.filter((row) => !known.has(row.public_id));
  const current = new Set(rows.map((row) => row.public_id));
  const stale = existing.filter(
    (row) => row.public_id && !current.has(row.public_id),
  );

  for (const row of toUpdate) {
    const { error } = await supabase
      .from("project_images")
      .update({
        src: row.src,
        width: row.width,
        height: row.height,
        format: row.format,
        bytes: row.bytes,
        sort_order: row.sort_order,
      })
      .eq("project_slug", slug)
      .eq("public_id", row.public_id);
    if (error) throw error;
  }
  if (toInsert.length) {
    const { error } = await supabase.from("project_images").insert(toInsert);
    if (error) throw error;
  }
  if (stale.length) {
    const { error } = await supabase
      .from("project_images")
      .delete()
      .in(
        "id",
        stale.map((row) => row.id),
      );
    if (error) throw error;
  }

  console.log(
    `${slug}: ${toInsert.length} added, ${toUpdate.length} updated, ${stale.length} removed`,
  );
}

if (!grouped.size) {
  console.log(`No project images found under "${PROJECT_ROOT_FOLDER}/".`);
}

const eventsByKey = new Map();
for (const event of events) {
  eventsByKey.set(normalize(event.slug), event);
  eventsByKey.set(normalize(event.name), event);
}

const groupedEvents = new Map();
for (const resource of await fetchResources(EVENT_ROOT_FOLDER)) {
  const folderName = folderOf(resource)
    .slice(EVENT_ROOT_FOLDER.length + 1)
    .split("/")[0];
  if (!folderName) continue;
  const event = eventsByKey.get(normalize(folderName));
  if (!event) {
    console.warn(
      `Skipping "${folderName}": no event with a matching slug or name.`,
    );
    continue;
  }
  groupedEvents.set(event.slug, [...(groupedEvents.get(event.slug) ?? []), resource]);
}

for (const [slug, resources] of groupedEvents) {
  const event = events.find((item) => item.slug === slug);
  resources.sort((a, b) =>
    (a.display_name ?? a.public_id).localeCompare(
      b.display_name ?? b.public_id,
      undefined,
      { numeric: true },
    ),
  );

  const { data: existing, error: existingError } = await supabase
    .from("event_images")
    .select("id, public_id")
    .eq("event_slug", slug);
  if (existingError) throw existingError;

  const rows = resources.map((resource, index) => ({
    event_slug: slug,
    public_id: resource.public_id,
    src: resource.secure_url,
    alt: `${event.name} photo ${index + 1}`,
    caption: `A moment from ${event.name}.`,
    width: resource.width,
    height: resource.height,
    format: resource.format,
    bytes: resource.bytes,
    sort_order: index,
  }));

  const known = new Set(
    existing.filter((row) => row.public_id).map((row) => row.public_id),
  );
  const toUpdate = rows.filter((row) => known.has(row.public_id));
  const toInsert = rows.filter((row) => !known.has(row.public_id));
  const current = new Set(rows.map((row) => row.public_id));
  const stale = existing.filter(
    (row) => row.public_id && !current.has(row.public_id),
  );

  for (const row of toUpdate) {
    const { error } = await supabase
      .from("event_images")
      .update({
        src: row.src,
        width: row.width,
        height: row.height,
        format: row.format,
        bytes: row.bytes,
        sort_order: row.sort_order,
      })
      .eq("event_slug", slug)
      .eq("public_id", row.public_id);
    if (error) throw error;
  }
  if (toInsert.length) {
    const { error } = await supabase.from("event_images").insert(toInsert);
    if (error) throw error;
  }
  if (stale.length) {
    const { error } = await supabase
      .from("event_images")
      .delete()
      .in(
        "id",
        stale.map((row) => row.id),
      );
    if (error) throw error;
  }

  console.log(
    `${slug}: ${toInsert.length} event images added, ${toUpdate.length} updated, ${stale.length} removed`,
  );
}

if (!groupedEvents.size) {
  console.log(`No event images found under "${EVENT_ROOT_FOLDER}/".`);
}
