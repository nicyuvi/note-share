import { getNote } from '@/actions/get-note'
import type { Note } from '@prisma/client'

const ViewNote = async ({ params }: { params: { id: string } }) => {
  console.log('params id', typeof params.id)
  const response = await getNote(Number(params.id))
  if (response.error) {
    alert(response.error)
  }
  const { title, content, authorId } = response.note as Note

  return (
    <>
      <div>{title}</div>
      <div>{content}</div>
      <div>{authorId}</div>
    </>
  )
}

export default ViewNote
