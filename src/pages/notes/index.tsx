// app/page.tsx
import Image from 'next/image'
import Link from 'next/link'

import { allNotes, Note } from 'contentlayer/generated'

import { reverseSanitizedTag, sanitizeTag } from '@/client-data/utils/tags'

function NoteCard(note: Note) {
  return (
    <div className="mb-8 border border-red-500">
      <h2 className="mb-1 text-xl">
        <Link
          href={note.url}
          className="text-blue-700 hover:text-blue-900 dark:text-blue-400"
        >
          {note.title}
        </Link>
      </h2>
      {/* <time dateTime={note.date} className="block mb-2 text-xs text-gray-600">
        {format(parseISO(note.date), 'LLLL d, yyyy')}
      </time> */}
      {/* {note.image && (
        <img
          src={note.image}
          alt={note.title ?? ''}
          className="block object-cover mb-2"
        />
      )} */}
      {note.tags && !!note.tags.length && (
        <ul className="mb-4 flex flex-wrap">
          {note.tags.map((tag, idx) => (
            <li key={idx} className="mr-2 text-xs text-gray-600">
              {tag}
            </li>
          ))}
        </ul>
      )}
      {/* <div
        className="content text-sm [&>*:last-child]:mb-0 [&>*]:mb-3"
        dangerouslySetInnerHTML={{ __html: note.body.html }}
      /> */}
    </div>
  )
}

const TagCard = ({ tag }: { tag?: string }) => {
  return (
    <div className="mb-8 border border-red-500">
      <h2 className="mb-1 text-xl">
        <Link
          href={`/notes/${tag?.toLocaleLowerCase()}`}
          className="text-blue-700 hover:text-blue-900 dark:text-blue-400"
        >
          {reverseSanitizedTag(tag)}
        </Link>
      </h2>
    </div>
  )
}

export default function Home() {
  const tags = new Set(
    allNotes
      .map((note) => {
        return sanitizeTag(note.tags)
      })
      .flat()
  )

  if (!tags.size) {
    return (
      <div className="mx-auto max-w-xl py-8">
        <h1 className="mb-8 text-center text-2xl font-black">Topics</h1>
        <p className="text-center">No topics found</p>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-xl py-8">
      <h1 className="mb-8 text-center text-2xl font-black">Topics</h1>

      {[...tags].map((tag, idx) => (
        <TagCard key={idx} tag={tag} />
      ))}
      {/* {notes.map((note, idx) => (
        <NoteCard key={idx} {...note} />
      ))} */}
    </div>
  )
}
