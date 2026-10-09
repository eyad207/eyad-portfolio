import type { ProjectCategory } from "./portfolio-types";

type Table<Row> = {
  Row: Row;
  Insert: Partial<Row>;
  Update: Partial<Row>;
  Relationships: [];
};

export type Database = {
  public: {
    Tables: {
      projects: Table<{
        slug: string;
        name: string;
        summary: string;
        description: string;
        categories: ProjectCategory[];
        technology_heading: string | null;
        features: string[];
        contribution: string | null;
        status: string | null;
        planned: string[];
        metrics: { label: string; value: string; context: string }[];
        related_project_slugs: string[];
        sort_order: number;
        published: boolean;
      }>;
      technologies: Table<{ id: number; name: string }>;
      project_technologies: Table<{
        project_slug: string;
        technology_id: number;
        sort_order: number;
      }>;
      experience_technologies: Table<{
        experience_slug: string;
        technology_id: number;
        sort_order: number;
      }>;
      project_images: Table<{
        id: number;
        project_slug: string;
        src: string;
        alt: string;
        caption: string | null;
        sort_order: number;
        public_id: string | null;
        width: number | null;
        height: number | null;
        format: string | null;
        bytes: number | null;
        created_at: string;
      }>;
      experiences: Table<{
        slug: string;
        organization: string;
        role: string;
        start_date: string;
        end_date: string | null;
        summary: string;
        responsibilities: string[];
        sort_order: number;
        published: boolean;
      }>;
      events: Table<{
        slug: string;
        name: string;
        organization: string;
        type: string;
        date_label: string | null;
        description: string;
        learning: string[];
        people: { role: string; names: string[] }[];
        related_project_slug: string | null;
        sort_order: number;
        published: boolean;
      }>;
      event_tags: Table<{
        id: number;
        event_slug: string;
        tag: string;
        sort_order: number;
      }>;
      links: Table<{
        id: number;
        entity_type: string;
        entity_slug: string | null;
        kind: string;
        label: string;
        url: string;
        sort_order: number;
      }>;
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
