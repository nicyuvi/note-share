import { getNote } from '@/actions/get/get-note'
import type { Note } from '@prisma/client'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

type ViewNoteProps = {
  params: { id: string }
}

const ViewNote = async ({ params }: ViewNoteProps) => {
  const noteId = params.id
  const response = await getNote(Number(noteId))
  if (response.error) {
    alert(response.error)
  }
  const { title, content, authorId } = response.note as Note

  return (
    <>
      <div>{title}</div>
      <div>{content}</div>
      <div>{authorId}</div>
      <Link href={`/note/${noteId}/edit`}>
        <Button variant="outline" className="mb-4">
          Edit
        </Button>
      </Link>
    </>
  )
}

export default ViewNote
