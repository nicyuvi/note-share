// get note here and pass props to client form
import { getNote } from '@/actions/get-note'
import EditNoteForm from './edit-note-form'
import { Note } from '@prisma/client'
import { redirect } from 'next/navigation'

const EditNote = async ({ params }: { params: { id: string } }) => {
  const response = await getNote(Number(params.id))
  if (response.error) {
    alert(response.error)
    redirect('/')
  }

  const note = response.note as Note

  return <EditNoteForm note={note} />
}

export default EditNote
