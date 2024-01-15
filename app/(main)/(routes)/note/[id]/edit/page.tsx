import { getNote } from '@/actions/get/get-note'
import EditNoteForm from './edit-note-form'
import { redirect } from 'next/navigation'

const EditNote = async ({ params }: { params: { id: string } }) => {
  const noteId = params.id
  const response = await getNote(Number(noteId))
  if (response.error) {
    alert(response.error)
    redirect('/')
  }

  const note = response.success

  return note && <EditNoteForm note={note} noteId={noteId} />
}

export default EditNote
