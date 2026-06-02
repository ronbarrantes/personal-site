import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { BlogShell } from "@/components/blog/BlogShell";
import { markdownToHtml } from "@/lib/blog/markdown";
import { getBlogPost, getBlogPosts } from "@/lib/blog/posts";

type BlogPostPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  const posts = await getBlogPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    return {
      title: "Post Not Found | RON/B.CO",
    };
  }

  return {
    title: `${post.title} | RON/B.CO`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
    },
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) notFound();

  const html = await markdownToHtml(post.content);

  return (
    <BlogShell>
      <article className="mx-auto max-w-4xl px-4 py-10 md:px-8">
        <Link href="/blog" className="btn btn-alt mb-8 text-xs">
          BACK TO BLOG
        </Link>

        <header className="mb-8 border-b-4 pb-8" style={{ borderColor: "var(--ink)" }}>
          <div className="mb-4 flex flex-wrap items-center gap-2">
            {post.date && <span className="tag">{post.date}</span>}
            <span className="tag">{post.slug}</span>
          </div>
          <h1 className="text-5xl md:text-7xl">{post.title}</h1>
          {post.description && (
            <p className="mt-5 max-w-3xl text-base font-bold leading-relaxed md:text-lg">
              {post.description}
            </p>
          )}
        </header>

        <div
          className="blog-prose"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </article>
    </BlogShell>
  );
}
