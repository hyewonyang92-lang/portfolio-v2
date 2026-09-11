export type LayoutVariant =
  | "text-left-image-right"
  | "full-width-bottom-text"
  | "image-left-text-right"
  | "large-centered";

export type ContentModule =
  | { type: "full-width-image"; tone: number }
  | { type: "two-column-image"; tones: [number, number] }
  | { type: "text-block"; heading: string; body: string };

export interface Project {
  number: string;
  slug: string;
  title: string;
  category: string;
  year: string;
  client: string;
  tone: number;
  layoutVariant: LayoutVariant;
  gallery: number[];
  content: ContentModule[];
}
