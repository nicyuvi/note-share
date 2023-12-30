import { getNote } from '@/actions/get/get-note'
import type { Note } from '@prisma/client'
import EditNoteBtn from '@/components/edit_note_btn'

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
      <EditNoteBtn noteId={noteId} />
    </>
  )
}

export default ViewNote
