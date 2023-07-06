import { InferGetServerSidePropsType } from 'next'
import Link from 'next/link'

import { allNotes } from 'contentlayer/generated'
import { format, parseISO } from 'date-fns'

import { reverseSanitizedTag } from '@/client-data/utils/tags'

type TagPageProps = InferGetServerSidePropsType<typeof getServerSideProps>

const TagPage = ({ tag, notesFilteredByTag }: TagPageProps) => {
  // console.log({ notesFilteredByTag })

  return (
    // <article className="max-w-xl py-8 mx-auto">
    //   <div className="flex flex-col">
    //     <h1 className="text-3xl font-bold">{note.title}</h1>
    //     <time dateTime={note.date} className="mb-1 text-xs text-gray-600">
    //       {format(parseISO(note.date), 'LLLL d, yyyy')}
    //     </time>
    //   </div>
    //   <div
    //     className="note [&>*:last-child]:mb-0 [&>*]:mb-3"
    //     dangerouslySetInnerHTML={{ __html: note.body.html }}
    //   />
    // </article>

    <>
      <div>{reverseSanitizedTag(tag)} Notes</div>

      <div className="flex flex-col">
        {notesFilteredByTag.map((note) => (
          <Link
            href={`/notes/${tag.toLowerCase()}/${note.slug}`}
            key={note.slug}
          >
            {note.title}
          </Link>
        ))}
      </div>
    </>
  )
}

export default TagPage

export const generateStaticParams = async () => {
  return allNotes.map((note) => ({ tag: note._raw.flattenedPath }))
}

export const getServerSideProps = ({ params }: { params: { tag: string } }) => {
  const notesFilteredByTag = allNotes.filter((note) => {
    const filtered = note.tags?.find((tag) => {
      return (
        tag.toLowerCase() ===
        reverseSanitizedTag(params.tag)?.toLocaleLowerCase()
      )
    })

    return filtered ? note : null
  })

  if (!notesFilteredByTag)
    throw new Error(`Notes not found for tag: ${params.tag}`)
  return {
    props: {
      tag: params.tag,
      notesFilteredByTag,
    },
  }
}
