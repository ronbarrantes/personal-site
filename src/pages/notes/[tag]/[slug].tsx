import { InferGetServerSidePropsType } from 'next'

import { allNotes } from 'contentlayer/generated'
import { format, parseISO } from 'date-fns'

type NoteLayoutProps = InferGetServerSidePropsType<typeof getServerSideProps>

const NoteLayout = ({ note }: NoteLayoutProps) => {
  return (
    <article className="max-w-xl py-8 mx-auto">
      <div className="flex flex-col">
        <h1 className="text-3xl font-bold">{note.title}</h1>
        <time dateTime={note.date} className="mb-1 text-xs text-gray-600">
          {format(parseISO(note.date), 'LLLL d, yyyy')}
        </time>
      </div>
      <div
        className="note [&>*:last-child]:mb-0 [&>*]:mb-3"
        dangerouslySetInnerHTML={{ __html: note.body.html }}
      />
    </article>
  )
}

export default NoteLayout

export const generateStaticParams = async () => {
  return allNotes.map((note) => ({ tag: note._raw.flattenedPath }))
}

export const getServerSideProps = ({
  params,
}: {
  params: { slug: string }
}) => {
  const note = allNotes.find((note) => note.slug === params.slug)

  if (!note) throw new Error(`Note not found for slug: ${params.slug}`)
  return {
    props: {
      hello: 'world',
      note,
    },
  }
}
