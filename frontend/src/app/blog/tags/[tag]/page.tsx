import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { BlogPagination } from "@/components/blog/BlogPagination";
import { BlogPostList } from "@/components/blog/BlogPostList";
import { BlogShell } from "@/components/blog/BlogShell";
import { BLOG_POSTS_PER_PAGE, paginateItems } from "@/lib/blog/pagination";
import {
  getAllBlogTags,
  getBlogPosts,
  getBlogPostsByTag,
  getBlogTag,
} from "@/lib/blog/posts";

type BlogTagPageProps = {
  params: Promise<{
    tag: string;
  }>;
  searchParams: Promise<{
    page?: string;
  }>;
};

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  const tags = new Set(posts.flatMap((post) => post.tags.map((tag) => tag.slug)));

  return [...tags].map((tag) => ({ tag }));
}

export async function generateMetadata({
  params,
}: BlogTagPageProps): Promise<Metadata> {
  const { tag } = await params;
  const blogTag = await getBlogTag(tag);

  if (!blogTag) {
    return {
      title: "Tag Not Found | RON/B.CO",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  return {
    title: `${blogTag.name} | Blog Tag | RON/B.CO`,
    description: `Posts tagged ${blogTag.name}.`,
    alternates: {
      canonical: `/blog/tags/${blogTag.slug}`,
    },
  };
}

export default async function BlogTagPage({
  params,
  searchParams,
}: BlogTagPageProps) {
  const { tag } = await params;
  const [posts, blogTag, tags] = await Promise.all([
    getBlogPostsByTag(tag),
    getBlogTag(tag),
    getAllBlogTags(),
  ]);
  const { page } = await searchParams;
  const paginatedPosts = paginateItems(posts, {
    page,
    pageSize: BLOG_POSTS_PER_PAGE,
  });

  if (!blogTag || posts.length === 0) notFound();
  if (paginatedPosts.isOutOfRange) notFound();

  return (
    <BlogShell>
      <section className="sheet" aria-labelledby="tag-h">
        <div className="cell c-3 label">
          <Link className="back" href="/blog">
            ← All posts
          </Link>
          <span className="n">Topic</span>
          <h1 id="tag-h">{blogTag.name}</h1>
          <p>
            {posts.length} post{posts.length === 1 ? "" : "s"}
          </p>
          {tags.length > 0 && (
            <nav aria-label="Topics" className="tag-list">
              {tags.map((entry) => (
                <Link
                  key={entry.slug}
                  href={`/blog/tags/${entry.slug}`}
                  className="chip"
                  aria-current={entry.slug === blogTag.slug ? "page" : undefined}
                >
                  {entry.name}
                  <span aria-hidden="true">· {entry.count}</span>
                  <span className="sr-only">
                    ({entry.count} post{entry.count === 1 ? "" : "s"})
                  </span>
                </Link>
              ))}
            </nav>
          )}
        </div>
        <div className="cell c-9">
          <BlogPostList posts={paginatedPosts.pageItems} />
          {paginatedPosts.showPagination && (
            <BlogPagination
              currentPage={paginatedPosts.currentPage}
              totalPages={paginatedPosts.totalPages}
              makeHref={(nextPage) =>
                nextPage === 1
                  ? `/blog/tags/${blogTag.slug}`
                  : `/blog/tags/${blogTag.slug}?page=${nextPage}`
              }
            />
          )}
        </div>
      </section>
    </BlogShell>
  );
}
