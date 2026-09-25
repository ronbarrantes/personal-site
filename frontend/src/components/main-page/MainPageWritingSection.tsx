import Link from "next/link";

import {
  BlogPostList,
  type BlogPostSummary,
} from "@/components/blog/BlogPostList";
import { sections } from "@/data/text";

type MainPageWritingSectionProps = {
  posts: BlogPostSummary[];
};

export const MainPageWritingSection = ({
  posts,
}: MainPageWritingSectionProps) => {
  return (
    <section className="sheet" id="writing" aria-labelledby="writing-h">
      <div className="cell c-3 label">
        <h2 id="writing-h">{sections.writing.title}</h2>
        <p>{sections.writing.sub}</p>
      </div>
      <div className="cell c-9">
        {posts.length > 0 ? (
          <BlogPostList posts={posts} />
        ) : (
          <p>No posts yet.</p>
        )}
        <Link className="all" href="/blog">
          All posts →
        </Link>
      </div>
    </section>
  );
};
