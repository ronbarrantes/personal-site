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
};

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  date: string;
  isDraft: boolean;
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
    content,
  };
}

function formatDate(date: Date | string) {
  if (date instanceof Date) {
    return date.toISOString().slice(0, 10);
  }

  return date;
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
