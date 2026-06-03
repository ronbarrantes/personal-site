import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { BlogPagination } from "@/components/blog/BlogPagination";
import { BlogShell } from "@/components/blog/BlogShell";
import { paginateItems } from "@/lib/blog/pagination";
import {
  getAllBlogTags,
  getBlogPosts,
  getBlogPostsByTag,
  getBlogTag,
} from "@/lib/blog/posts";

const POSTS_PER_PAGE = 15;

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
    pageSize: POSTS_PER_PAGE,
  });

  if (!blogTag || posts.length === 0) notFound();
  if (paginatedPosts.isOutOfRange) notFound();

  return (
    <BlogShell>
      <section className="mx-auto max-w-5xl px-4 py-10 md:px-8">
        <Link href="/blog" className="btn btn-alt mb-8 text-xs">
          BACK TO BLOG
        </Link>

        <div className="mb-8">
          <span className="tag">TAG</span>
          <h1 className="mt-4 text-5xl md:text-7xl">
            #{blogTag.name}
          </h1>
          <p className="mt-4 text-sm font-bold uppercase">
            {posts.length} post{posts.length === 1 ? "" : "s"}
          </p>
        </div>

        {tags.length > 0 && (
          <div className="box mb-8 p-5">
            <div className="mb-3 text-sm font-bold uppercase">All Tags</div>
            <div className="flex flex-wrap gap-2">
              {tags.map((entry) => (
                <Link
                  key={entry.slug}
                  href={`/blog/tags/${entry.slug}`}
                  className="tag"
                  style={
                    entry.slug === blogTag.slug
                      ? {
                          background: "var(--accent)",
                          color: "var(--ink)",
                        }
                      : undefined
                  }
                >
                  #{entry.name} [{entry.count}]
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="space-y-5">
          {paginatedPosts.pageItems.map((post) => (
            <article key={post.slug} className="box p-5">
              <div className="mb-3 flex flex-wrap items-center gap-2">
                {post.date && <span className="tag">{post.date}</span>}
                <span className="tag">{post.slug}</span>
                {post.isDraft && <span className="tag">DRAFT</span>}
                {post.tags.map((entry) => (
                  <Link
                    key={entry.slug}
                    href={`/blog/tags/${entry.slug}`}
                    className="tag"
                  >
                    #{entry.name}
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
      </section>
    </BlogShell>
  );
}
