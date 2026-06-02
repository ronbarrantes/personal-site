import matter from "gray-matter";
import fs from "node:fs/promises";
import path from "node:path";

import { slugify } from "@/lib/blog/slugify";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

type BlogFrontmatter = {
  title?: string;
  description?: string;
  date?: Date | string;
};

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  date: string;
  content: string;
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
    content,
  };
}

function formatDate(date: Date | string) {
  if (date instanceof Date) {
    return date.toISOString().slice(0, 10);
  }

  return date;
}

export async function getBlogPosts() {
  const filenames = await getPostFilenames();
  const posts = await Promise.all(filenames.map(readPost));

  return posts.sort((a, b) => b.date.localeCompare(a.date));
}

export async function getBlogPost(slug: string) {
  const posts = await getBlogPosts();

  return posts.find((post) => post.slug === slug);
}
