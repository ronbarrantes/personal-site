import Link from "next/link";

import { formatShortDate } from "@/utils/time";

export type BlogPostSummary = {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: { name: string; slug: string }[];
};

type BlogPostListProps = {
  posts: BlogPostSummary[];
};

// Compact rows: date · title + description · tags. Used on home and blog lists.
export const BlogPostList = ({ posts }: BlogPostListProps) => {
  return (
    <ul className="posts rows">
      {posts.map((post) => (
        <li key={post.slug}>
          <Link href={`/blog/${post.slug}`}>
            {post.date ? (
              <time dateTime={post.date}>{formatShortDate(post.date)}</time>
            ) : (
              <span />
            )}
            <div>
              <h3>{post.title}</h3>
              {post.description && <p>{post.description}</p>}
            </div>
            <span className="m">
              {post.tags.map((tag) => tag.name).join(", ")}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
};
