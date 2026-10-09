-- Cloudinary-backed project images: track the asset, keep one row per asset,
-- and index the foreign keys used by the portfolio queries.
alter table public.project_images
  add column if not exists public_id text,
  add column if not exists width integer,
  add column if not exists height integer,
  add column if not exists format text,
  add column if not exists bytes integer,
  add column if not exists created_at timestamptz not null default now();

create unique index if not exists project_images_project_public_id_key
  on public.project_images (project_slug, public_id)
  where public_id is not null;

create index if not exists project_images_project_sort_idx
  on public.project_images (project_slug, sort_order);
create index if not exists project_technologies_technology_idx
  on public.project_technologies (technology_id);
create index if not exists experience_technologies_technology_idx
  on public.experience_technologies (technology_id);
create index if not exists event_tags_event_sort_idx
  on public.event_tags (event_slug, sort_order);
create index if not exists events_related_project_idx
  on public.events (related_project_slug);
create index if not exists links_entity_idx
  on public.links (entity_type, entity_slug, sort_order);

comment on column public.project_images.public_id is
  'Cloudinary public_id, e.g. portfolio/fixtech/home. Populated by npm run sync:images.';
