import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    subtitle: z.string(),
    category: z.enum(['ML/CV', 'WEB', 'ALL']),
    desc: z.string(),
    tech: z.array(z.string()),
    link: z.object({ repo: z.string().url().optional(), demo: z.string().url().optional() }),
    cover: z.string().optional(),
    payload: z.string(),
  }),
});

const research = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/research' }),
  schema: z.object({
    title: z.string(),
    authors: z.string(),
    journal: z.string(),
    journalUrl: z.string().url().optional(),
    articleUrl: z.string().url().optional(),
    year: z.number(),
    category: z.string(),
    status: z.enum(['published', 'draft']),
    abstract: z.string().optional(),
    repo: z.string().url().optional(),
    dataset_tags: z.array(z.string()).default([]),
  }),
});

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    date: z.string(),
    tags: z.array(z.string()).default([]),
    excerpt: z.string(),
  }),
});

export const collections = { projects, research, blog };
