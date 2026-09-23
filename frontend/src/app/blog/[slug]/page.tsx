import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { BlogShell } from "@/components/blog/BlogShell";
import { isServerAuthenticated } from "@/lib/auth/server";
import { renderSafeBlogMarkdown } from "@/lib/blog/markdown";
import { getBlogPost, getBlogPosts } from "@/lib/blog/posts";
import { formatShortDate } from "@/utils/time";

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
  const post = await getBlogPost(slug, { includeDrafts: true });

  if (!post || (post.isDraft && !(await isServerAuthenticated()))) {
    return {
      title: "Post Not Found | RON/B.CO",
      robots: {
        index: false,
        follow: false,
      },
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
    robots: post.isDraft
      ? {
          index: false,
          follow: false,
        }
      : undefined,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getBlogPost(slug, { includeDrafts: true });

  if (!post) notFound();
  if (post.isDraft && !(await isServerAuthenticated())) notFound();

  const html = await renderSafeBlogMarkdown(post.content);

  return (
    <BlogShell>
      <article aria-labelledby="post-h">
        <header className="sheet">
          <div className="cell c-3 label lav">
            <Link className="back" href="/blog">
              ← All posts
            </Link>
            <div className="post-head">
              <div className="meta">
                {post.date && (
                  <time dateTime={post.date}>{formatShortDate(post.date)}</time>
                )}
                {post.isDraft && <span className="chip">Draft</span>}
              </div>
              {post.tags.length > 0 && (
                <nav aria-label="Post topics" className="tag-list">
                  {post.tags.map((tag) => (
                    <Link
                      key={tag.slug}
                      href={`/blog/tags/${tag.slug}`}
                      className="chip"
                    >
                      {tag.name}
                    </Link>
                  ))}
                </nav>
              )}
            </div>
          </div>
          <div className="cell c-9 post-head">
            <h1 id="post-h">{post.title}</h1>
            {post.description && <p className="desc">{post.description}</p>}
          </div>
        </header>
        <div className="sheet">
          <div className="cell c-3 post-aside" aria-hidden="true" />
          <div className="cell c-9 prose-cell">
            <div
              className="blog-prose"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          </div>
        </div>
      </article>
    </BlogShell>
  );
}
