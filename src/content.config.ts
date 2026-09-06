import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  // Load Markdown and MDX files in the `src/content/blog/` directory.
  loader: glob({ base: "./src/content/blog", pattern: "**/*.{md,mdx}" }),
  // Type-check frontmatter using a schema
  schema: z.object({
    title: z.string(),
    description: z.string(),
    // Transform string to Date object
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: z.string().optional(),
    tags: z.array(z.string()).optional(),
    // Explicit draft flag instead of hiding files behind a fake extension —
    // draft posts are excluded from listings, tag pages, RSS, and the
    // production build itself (see getStaticPaths in [...slug].astro).
    draft: z.boolean().optional().default(false),
  }),
});

export const collections = { blog };
