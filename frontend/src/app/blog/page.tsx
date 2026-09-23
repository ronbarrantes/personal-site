import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { BlogPagination } from "@/components/blog/BlogPagination";
import { BlogPostList } from "@/components/blog/BlogPostList";
import { BlogShell } from "@/components/blog/BlogShell";
import { sections } from "@/data/text";
import { BLOG_POSTS_PER_PAGE, paginateItems } from "@/lib/blog/pagination";
import { getAllBlogTags, getBlogPosts } from "@/lib/blog/posts";

export const metadata: Metadata = {
  title: "Blog | RON/B.CO",
  description: "Writing from Ron Barrantes.",
};

type BlogIndexPageProps = {
  searchParams: Promise<{
    page?: string;
  }>;
};

export default async function BlogIndexPage({
  searchParams,
}: BlogIndexPageProps) {
  const [posts, tags] = await Promise.all([getBlogPosts(), getAllBlogTags()]);
  const { page } = await searchParams;
  const paginatedPosts = paginateItems(posts, {
    page,
    pageSize: BLOG_POSTS_PER_PAGE,
  });

  if (paginatedPosts.isOutOfRange) notFound();

  return (
    <BlogShell>
      <section className="sheet" aria-labelledby="blog-h">
        <div className="cell c-3 label">
          <span className="n">Blog</span>
          <h1 id="blog-h">{sections.writing.title}</h1>
          <p>{sections.writing.sub}</p>
          {tags.length > 0 && (
            <nav aria-label="Topics" className="tag-list">
              {tags.map((tag) => (
                <Link
                  key={tag.slug}
                  href={`/blog/tags/${tag.slug}`}
                  className="chip"
                >
                  {tag.name}
                  <span aria-hidden="true">· {tag.count}</span>
                  <span className="sr-only">
                    ({tag.count} post{tag.count === 1 ? "" : "s"})
                  </span>
                </Link>
              ))}
            </nav>
          )}
        </div>
        <div className="cell c-9">
          {posts.length === 0 ? (
            <p>No posts yet.</p>
          ) : (
            <>
              <BlogPostList posts={paginatedPosts.pageItems} />
              {paginatedPosts.showPagination && (
                <BlogPagination
                  currentPage={paginatedPosts.currentPage}
                  totalPages={paginatedPosts.totalPages}
                  makeHref={(nextPage) =>
                    nextPage === 1 ? "/blog" : `/blog?page=${nextPage}`
                  }
                />
              )}
            </>
          )}
        </div>
      </section>
    </BlogShell>
  );
}
