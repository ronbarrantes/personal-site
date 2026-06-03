import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { BlogShell } from "@/components/blog/BlogShell";
import { getBlogPosts, getBlogPostsByTag, getBlogTag } from "@/lib/blog/posts";

type BlogTagPageProps = {
  params: Promise<{
    tag: string;
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

export default async function BlogTagPage({ params }: BlogTagPageProps) {
  const { tag } = await params;
  const posts = await getBlogPostsByTag(tag);
  const blogTag = await getBlogTag(tag);

  if (!blogTag || posts.length === 0) notFound();

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

        <div className="space-y-5">
          {posts.map((post) => (
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
      </section>
    </BlogShell>
  );
}
