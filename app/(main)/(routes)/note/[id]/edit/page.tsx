import { getNote } from '@/actions/get-note'
import EditNoteForm from './edit-note-form'
import { redirect } from 'next/navigation'

const EditNote = async ({ params }: { params: { id: string } }) => {
  const response = await getNote(Number(params.id))
  if (response.error) {
    alert(response.error)
    redirect('/')
  }

  const note = response.note

  return note && <EditNoteForm note={note} noteId={params.id} />
}

export default EditNote
