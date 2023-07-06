import { InferGetServerSidePropsType } from 'next'
import Link from 'next/link'

import { allNotes } from 'contentlayer/generated'
import { format, parseISO } from 'date-fns'

import { reverseSanitizedTag } from '@/client-data/utils/tags'

type TagPageProps = InferGetServerSidePropsType<typeof getServerSideProps>

const TagPage = ({ tag, notesFilteredByTag }: TagPageProps) => {
  return (
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
