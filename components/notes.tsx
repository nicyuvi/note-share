'use client'
import Link from 'next/link'
import type { Note } from '@prisma/client'
import { Button } from '@/components/ui/button'
import { deleteNote } from '@/actions/delete-note'
import { editNote } from '@/actions/edit-note'

// TODO: server mutations -- edit

const Notes = ({ notes, profile }: any) => {
  const { name } = profile
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
              <p>{title}</p>
              <p>{content}</p>
              <p>{name}</p>
              <Button
                onClick={() => {
                  editNote(id)
                }}
                variant="secondary"
                className="mr-4"
              >
                edit
              </Button>
              <Button
                onClick={() => {
                  handleDelete(id)
                }}
                variant="destructive"
              >
                delete
              </Button>
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
