// app/page.tsx
import Link from 'next/link'

import { allPosts, Post } from 'contentlayer/generated'
import { compareDesc, format, parseISO } from 'date-fns'

function PostCard(post: Post) {
  return (
    <div className="mb-8 border border-red-500">
      <h2 className="mb-1 text-xl">
        <Link
          href={post.url}
          className="text-blue-700 hover:text-blue-900 dark:text-blue-400"
        >
          {post.title}
        </Link>
      </h2>
      <time dateTime={post.date} className="block mb-2 text-xs text-gray-600">
        {format(parseISO(post.date), 'LLLL d, yyyy')}
      </time>
      {post.image && (
        <img src={post.image} alt={post.title ?? ''} className="block mb-2" />
      )}
      {post.tags && !!post.tags.length && (
        <ul className="flex flex-wrap mb-4">
          {post.tags.map((tag, idx) => (
            <li key={idx} className="mr-2 text-xs text-gray-600">
              {tag}
            </li>
          ))}
        </ul>
      )}
      {/* <div
        className="post text-sm [&>*:last-child]:mb-0 [&>*]:mb-3"
        dangerouslySetInnerHTML={{ __html: post.body.html }}
      /> */}
    </div>
  )
}

export default function Home() {
  const posts = allPosts.sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date))
  )

  return (
    <div className="max-w-xl py-8 mx-auto">
      <h1 className="mb-8 text-2xl font-black text-center">
        Next.js + Contentlayer Example
      </h1>
      {posts.map((post, idx) => (
        <PostCard key={idx} {...post} />
      ))}
    </div>
  )
}
