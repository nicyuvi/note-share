import Link from 'next/link'
import type { Note } from '@prisma/client'

const Notes = ({ notes, profile }: any) => {
  const { name } = profile
  return (
    <>
      {notes.length > 0 ? (
        notes.map(({ id, title, content }: Note) => {
          return (
            <div key={id} className="bg-blue-100 mb-4">
              <p>{title}</p>
              <p>{content}</p>
              <p>{name}</p>
            </div>
          )
        })
      ) : (
        <Link href="/create-note">Create New Note</Link>
      )}
    </>
  )
}

export default Notes
