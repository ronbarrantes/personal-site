import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { BlogPagination } from "@/components/blog/BlogPagination";
import { BlogShell } from "@/components/blog/BlogShell";
import { getAllBlogTags, getBlogPosts } from "@/lib/blog/posts";

const POSTS_PER_PAGE = 10;

export const metadata: Metadata = {
  title: "Blog | RON/B.CO",
  description: "Writing from Ron Barrantes.",
};

type BlogIndexPageProps = {
  searchParams: Promise<{
    page?: string;
  }>;
};

function getPageNumber(value?: string) {
  const page = Number.parseInt(value ?? "1", 10);
  return Number.isNaN(page) || page < 1 ? 1 : page;
}

export default async function BlogIndexPage({
  searchParams,
}: BlogIndexPageProps) {
  const [posts, tags] = await Promise.all([getBlogPosts(), getAllBlogTags()]);
  const { page } = await searchParams;
  const currentPage = getPageNumber(page);
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);
  const pagePosts = posts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  if (totalPages > 0 && currentPage > totalPages) notFound();

  const showPagination = posts.length > POSTS_PER_PAGE;

  return (
    <BlogShell>
      <section className="mx-auto max-w-5xl px-4 py-10 md:px-8">
        <div className="mb-4 flex gap-6">
          <div>
            <span className="tag">WRITING</span>
            <div className="flex">
              <h1 className="mt-4 text-6xl md:text-8xl">
                BLOG<span style={{ color: "var(--accent)" }}>{"///"}</span>
              </h1>
            </div>
          </div>
          {tags.length > 0 && (
            <div className="mb-8">
              <div className="mb-1 text-sm font-bold uppercase">Topics</div>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <Link
                    key={tag.slug}
                    href={`/blog/tags/${tag.slug}`}
                    className="tag"
                  >
                    #{tag.name} [{tag.count}]
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {posts.length === 0 ? (
          <div className="box p-6">
            <p className="text-sm font-bold uppercase">
              No posts found in content/blog.
            </p>
          </div>
        ) : (
          <>
            <div className="space-y-5">
              {pagePosts.map((post) => (
                <article key={post.slug} className="box p-5">
                  <div className="mb-3 flex flex-wrap items-center gap-2">
                    {post.date && <span className="tag">{post.date}</span>}
                    <span className="tag">{post.slug}</span>
                    {post.isDraft && <span className="tag">DRAFT</span>}
                    {post.tags.map((tag) => (
                      <Link
                        key={tag.slug}
                        href={`/blog/tags/${tag.slug}`}
                        className="tag"
                      >
                        #{tag.name}
                      </Link>
                    ))}
                  </div>
                  <h2 className="mb-3 text-4xl">{post.title}</h2>
                  {post.description && (
                    <p className="mb-5 max-w-3xl text-sm leading-relaxed">
                      {post.description}
                    </p>
                  )}
                  <Link href={`/blog/${post.slug}`} className="btn text-xs">
                    READ
                  </Link>
                </article>
              ))}
            </div>

            {showPagination && (
              <BlogPagination
                currentPage={currentPage}
                totalPages={totalPages}
                makeHref={(nextPage) =>
                  nextPage === 1 ? "/blog" : `/blog?page=${nextPage}`
                }
              />
            )}
          </>
        )}
      </section>
    </BlogShell>
  );
}
