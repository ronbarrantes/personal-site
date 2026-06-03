import matter from "gray-matter";
import fs from "node:fs/promises";
import path from "node:path";

import { slugify } from "@/lib/blog/slugify";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

type BlogFrontmatter = {
  title?: string;
  description?: string;
  date?: Date | string;
  draft?: boolean;
  tag?: string | string[];
  tags?: string | string[];
};

export type BlogTag = {
  name: string;
  slug: string;
};

export type BlogTagSummary = BlogTag & {
  count: number;
};

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  date: string;
  isDraft: boolean;
  tags: BlogTag[];
  content: string;
};

type GetBlogPostsOptions = {
  includeDrafts?: boolean;
};

async function getPostFilenames() {
  const entries = await fs.readdir(BLOG_DIR, { withFileTypes: true });

  return entries
    .filter((entry) => entry.isFile() && entry.name.endsWith(".md"))
    .map((entry) => entry.name);
}

async function readPost(filename: string) {
  const raw = await fs.readFile(path.join(BLOG_DIR, filename), "utf8");
  const { data, content } = matter(raw);
  const frontmatter = data as BlogFrontmatter;
  const slug = filename.replace(/\.md$/, "");
  const title = frontmatter.title || slugify(slug).replace(/-/g, " ");

  return {
    slug,
    title,
    description: frontmatter.description || "",
    date: frontmatter.date ? formatDate(frontmatter.date) : "",
    isDraft: frontmatter.draft === true,
    tags: normalizeTags(frontmatter.tags ?? frontmatter.tag),
    content,
  };
}

function formatDate(date: Date | string) {
  if (date instanceof Date) {
    return date.toISOString().slice(0, 10);
  }

  return date;
}

function normalizeTags(tags?: string | string[]) {
  if (!tags) return [];

  const tagValues = Array.isArray(tags) ? tags : [tags];
  if (!tagValues.length) return [];

  const uniqueTags = new Map<string, BlogTag>();

  for (const tag of tagValues) {
    const name = tag.trim();
    if (!name) continue;

    const slug = slugify(name);
    if (!slug || uniqueTags.has(slug)) continue;

    uniqueTags.set(slug, { name, slug });
  }

  return [...uniqueTags.values()];
}

export async function getBlogPosts(options: GetBlogPostsOptions = {}) {
  const filenames = await getPostFilenames();
  const posts = await Promise.all(filenames.map(readPost));
  const visiblePosts = options.includeDrafts
    ? posts
    : posts.filter((post) => !post.isDraft);

  return visiblePosts.sort((a, b) => b.date.localeCompare(a.date));
}

export async function getBlogPost(
  slug: string,
  options: GetBlogPostsOptions = {}
) {
  const posts = await getBlogPosts(options);

  return posts.find((post) => post.slug === slug);
}

export async function getBlogTag(slug: string, options: GetBlogPostsOptions = {}) {
  const posts = await getBlogPosts(options);

  for (const post of posts) {
    const tag = post.tags.find((entry) => entry.slug === slug);
    if (tag) return tag;
  }

  return undefined;
}

export async function getAllBlogTags(options: GetBlogPostsOptions = {}) {
  const posts = await getBlogPosts(options);
  const tags = new Map<string, BlogTagSummary>();

  for (const post of posts) {
    for (const tag of post.tags) {
      const current = tags.get(tag.slug);

      if (current) {
        current.count += 1;
        continue;
      }

      tags.set(tag.slug, {
        ...tag,
        count: 1,
      });
    }
  }

  return [...tags.values()].sort((a, b) => a.name.localeCompare(b.name));
}

export async function getBlogPostsByTag(
  tagSlug: string,
  options: GetBlogPostsOptions = {}
) {
  const posts = await getBlogPosts(options);

  return posts.filter((post) => post.tags.some((tag) => tag.slug === tagSlug));
}
