import type { Project } from "@/types/project";

export const projects: Project[] = [
  {
    number: "01",
    slug: "muum",
    title: "MUUM",
    category: "SPACE RESERVATION PLATFORM",
    year: "2026",
    client: "MUUM",
    tone: 1,
    layoutVariant: "text-left-image-right",
    gallery: [1, 2, 3, 4, 5],
    content: [
      { type: "full-width-image", tone: 1 },
      { type: "text-block", heading: "OVERVIEW", body: "MUUM is a space reservation platform designed to make booking shared spaces effortless, clear, and consistent across every touchpoint." },
      { type: "two-column-image", tones: [1, 2] },
    ],
  },
  {
    number: "02",
    slug: "hearts-dosan",
    title: "HEARTS DOSAN",
    category: "UI/UX DESIGN",
    year: "2025",
    client: "HEARTS DOSAN",
    tone: 2,
    layoutVariant: "full-width-bottom-text",
    gallery: [2, 3, 4, 5, 1],
    content: [
      { type: "full-width-image", tone: 2 },
      { type: "text-block", heading: "OVERVIEW", body: "A brand and interface system for HEARTS DOSAN, built around clarity, restraint, and a strong editorial identity." },
      { type: "two-column-image", tones: [2, 3] },
    ],
  },
  {
    number: "03",
    slug: "fossplus",
    title: "FOSSPLUS",
    category: "UI/UX DESIGN",
    year: "2025",
    client: "FOSSPLUS",
    tone: 3,
    layoutVariant: "image-left-text-right",
    gallery: [3, 4, 5, 1, 2],
    content: [
      { type: "full-width-image", tone: 3 },
      { type: "text-block", heading: "OVERVIEW", body: "FOSSPLUS required a focused product interface that balances dense functionality with a calm, minimal visual language." },
      { type: "two-column-image", tones: [3, 4] },
    ],
  },
  {
    number: "04",
    slug: "carland",
    title: "CARLAND",
    category: "UI/UX DESIGN",
    year: "2024",
    client: "CARLAND",
    tone: 4,
    layoutVariant: "large-centered",
    gallery: [4, 5, 1, 2, 3],
    content: [
      { type: "full-width-image", tone: 4 },
      { type: "text-block", heading: "OVERVIEW", body: "CARLAND explores a large-format visual language for a product-driven platform, prioritizing imagery over interface chrome." },
      { type: "two-column-image", tones: [4, 5] },
    ],
  },
  {
    number: "05",
    slug: "the-venti-voss",
    title: "THE VENTI VOSS",
    category: "UI/UX DESIGN",
    year: "2024",
    client: "THE VENTI VOSS",
    tone: 5,
    layoutVariant: "text-left-image-right",
    gallery: [5, 1, 2, 3, 4],
    content: [
      { type: "full-width-image", tone: 5 },
      { type: "text-block", heading: "OVERVIEW", body: "THE VENTI VOSS is presented through a quiet, image-forward layout that lets the product visuals carry the story." },
      { type: "two-column-image", tones: [5, 1] },
    ],
  },
  {
    number: "06",
    slug: "amcham-korea",
    title: "AMCHAM KOREA",
    category: "UI/UX DESIGN",
    year: "2023",
    client: "AMCHAM KOREA",
    tone: 2,
    layoutVariant: "full-width-bottom-text",
    gallery: [1, 3, 5, 2, 4],
    content: [
      { type: "full-width-image", tone: 2 },
      { type: "text-block", heading: "OVERVIEW", body: "A digital presence for AMCHAM KOREA structured around clarity, hierarchy, and long-form editorial content." },
      { type: "two-column-image", tones: [2, 4] },
    ],
  },
  {
    number: "07",
    slug: "your-birthday",
    title: "YOUR BIRTHDAY",
    category: "UI/UX DESIGN",
    year: "2023",
    client: "YOUR BIRTHDAY",
    tone: 4,
    layoutVariant: "image-left-text-right",
    gallery: [4, 2, 5, 3, 1],
    content: [
      { type: "full-width-image", tone: 4 },
      { type: "text-block", heading: "OVERVIEW", body: "YOUR BIRTHDAY is a playful concept restrained by a strict monochrome and typographic system." },
      { type: "two-column-image", tones: [4, 1] },
    ],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getAdjacentProject(slug: string): Project {
  const index = projects.findIndex((project) => project.slug === slug);
  const nextIndex = (index + 1) % projects.length;
  return projects[nextIndex];
}
