// app/posts/[slug]/page.tsx
import { InferGetServerSidePropsType } from 'next'

import { allPosts } from 'contentlayer/generated'
import { format, parseISO } from 'date-fns'

type PostLayoutProps = InferGetServerSidePropsType<typeof getServerSideProps>

const PostLayout = ({ post }: PostLayoutProps) => {
  console.log('PROPS --- ===>>>', post)
  // const post = allPosts.find((post) => post._raw.flattenedPath === params.slug)
  // if (!post) throw new Error(`Post not found for slug: ${params.slug}`)

  return (
    <article className="mx-auto max-w-xl py-8">
      <div className="mb-8 text-center">
        <time dateTime={post.date} className="mb-1 text-xs text-gray-600">
          {format(parseISO(post.date), 'LLLL d, yyyy')}
        </time>
        <h1 className="text-3xl font-bold">{post.title}</h1>
      </div>
      <div
        className="[&>*:last-child]:mb-0 [&>*]:mb-3"
        dangerouslySetInnerHTML={{ __html: post.body.html }}
      />
      Hello World
    </article>
  )
}

export default PostLayout

export const generateStaticParams = async () => {
  return allPosts.map((post) => ({ slug: post._raw.flattenedPath }))
}

export const getServerSideProps = ({
  params,
}: {
  params: { slug: string }
}) => {
  const post = allPosts.find((post) => post._raw.flattenedPath === params.slug)

  if (!post) throw new Error(`Post not found for slug: ${params.slug}`)
  return { props: { post } }
}
