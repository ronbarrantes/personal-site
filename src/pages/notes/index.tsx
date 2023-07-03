// app/page.tsx
import Image from 'next/image'
import Link from 'next/link'

import { allNotes, Note } from 'contentlayer/generated'
import { compareDesc, format, parseISO } from 'date-fns'

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
      <time dateTime={note.date} className="mb-2 block text-xs text-gray-600">
        {format(parseISO(note.date), 'LLLL d, yyyy')}
      </time>
      {note.image && (
        <Image src={note.image} alt={note.title ?? ''} className="mb-2 block" />
      )}
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
        className="note text-sm [&>*:last-child]:mb-0 [&>*]:mb-3"
        dangerouslySetInnerHTML={{ __html: note.body.html }}
      /> */}
    </div>
  )
}

export default function Home() {
  console.log('ALL POSTS ======>>', allNotes)
  const notes = allNotes.sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date))
  )

  return (
    <div className="mx-auto max-w-xl py-8">
      <h1 className="mb-8 text-center text-2xl font-black">
        Next.js + Contentlayer Example
      </h1>
      {notes.map((note, idx) => (
        <NoteCard key={idx} {...note} />
      ))}
    </div>
  )
}
