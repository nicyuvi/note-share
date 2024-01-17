'use client'
import { getNote } from '@/actions/get/get-note'
import type { Note } from '@prisma/client'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { deleteNote } from '@/actions/delete/delete-note'
import { useEffect, useState } from 'react'
import { PRISMA_ERRORS } from '@/lib/constants'

type ViewNoteProps = {
  params: { id: string }
}

const ViewNote = ({ params }: ViewNoteProps) => {
  const noteId = params.id
  const [note, setNote] = useState<Note>()
  useEffect(() => {
    async function getNoteHandler() {
      const res = await getNote(Number(noteId))
      // todo: function to handle prisma or local error messages
      if (res.error) {
        if (res.error === PRISMA_ERRORS.P2025.name) {
          alert(PRISMA_ERRORS.P2025.message)
        } else {
          alert(res.error)
        }
      }
      setNote(res.success)
    }

    getNoteHandler()
  }, [noteId])

  async function handleDelete() {
    const response = await deleteNote(Number(noteId))
    if (response.error) {
      alert(response.error)
    } else {
      alert(response.success)
    }
  }

  if (!note) {
    return <div>Loading...</div>
  }

  return (
    <>
      <h1 className="text-hub-h1 mb-6">{note.title}</h1>
      <div className="mb-6">{note.content}</div>
      <div className="mb-6">{note.authorName}</div>
      <Link href={`/note/${noteId}/edit`}>
        <Button variant="outline" size="sm" className="mr-4">
          Edit
        </Button>
      </Link>
      <Button variant="destructive" size="sm" onClick={handleDelete}>
        Delete
      </Button>
    </>
  )
}

export default ViewNote
