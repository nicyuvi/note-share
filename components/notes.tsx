'use client'
import Link from 'next/link'
import type { Note } from '@prisma/client'
import { Button } from '@/components/ui/button'
import { deleteNote } from '@/actions/delete-note'
import { editNote } from '@/actions/edit-note'
import { useRouter } from 'next/navigation'

// TODO: server mutations -- edit

const Notes = ({ notes, profile }: any) => {
  const { name } = profile
  const { push } = useRouter()

  async function handleDelete(id: number) {
    const response = await deleteNote(id)
    if (response.error) {
      alert(response.error)
    } else {
      alert(response.success)
    }
  }

  return (
    <>
      {notes.length > 0 ? (
        notes.map(({ id, title, content }: Note) => {
          return (
            <div key={id} className="bg-blue-100 mb-4">
              <div onClick={() => push(`/note/${id}`)}>
                <p>{title}</p>
                <p>{content}</p>
                <p>{name}</p>
              </div>
              <Button
                onClick={() => push(`/note/${id}/edit`)}
                variant="secondary"
                className="mr-4"
              >
                edit
              </Button>
              <Button onClick={() => handleDelete(id)} variant="destructive">
                delete
              </Button>
            </div>
          )
        })
      ) : (
        <Link href="/note/create">Create New Note</Link>
      )}
    </>
  )
}

export default Notes
