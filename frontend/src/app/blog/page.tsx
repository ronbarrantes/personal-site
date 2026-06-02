import type { Metadata } from "next";
import Link from "next/link";

import { BlogShell } from "@/components/blog/BlogShell";
import { getBlogPosts } from "@/lib/blog/posts";

export const metadata: Metadata = {
  title: "Blog | RON/B.CO",
  description: "Writing from Ron Barrantes.",
};

export default async function BlogIndexPage() {
  const posts = await getBlogPosts();

  return (
    <BlogShell>
      <section className="mx-auto max-w-5xl px-4 py-10 md:px-8">
        <div className="mb-8">
          <span className="tag">WRITING</span>
          <h1 className="mt-4 text-6xl md:text-8xl">
            BLOG<span style={{ color: "var(--accent)" }}>{"///"}</span>
          </h1>
        </div>

        {posts.length === 0 ? (
          <div className="box p-6">
            <p className="text-sm font-bold uppercase">
              No posts found in content/blog.
            </p>
          </div>
        ) : (
          <div className="space-y-5">
            {posts.map((post) => (
              <article key={post.slug} className="box p-5">
                <div className="mb-3 flex flex-wrap items-center gap-2">
                  {post.date && <span className="tag">{post.date}</span>}
                  <span className="tag">{post.slug}</span>
                  {post.isDraft && <span className="tag">DRAFT</span>}
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
        )}
      </section>
    </BlogShell>
  );
}
