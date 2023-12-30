'use client'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

type EditNoteBtnProps = {
  noteId: string
}

const EditNoteBtn = ({ noteId }: EditNoteBtnProps) => {
  const { push } = useRouter()

  return (
    <Button
      onClick={() => push(`/note/${noteId}/edit`)}
      variant="secondary"
      className="mr-4"
    >
      edit
    </Button>
  )
}

export default EditNoteBtn
