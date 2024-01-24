'use client'
import { Button } from '@/components/ui/button'
import { removeNoteInServer } from '@/actions/update/remove-note-server'

type RemoveNoteInServerBtnProps = {
  noteId: number
  serverId: number
}

const RemoveNoteInServerBtn = ({
  noteId,
  serverId,
}: RemoveNoteInServerBtnProps) => {
  async function handleClick(): Promise<void> {
    const res = await removeNoteInServer(noteId, serverId)
    if (res.error) {
      alert(res.error)
    } else {
      alert(res.success)
    }
  }

  return (
    <>
      <Button onClick={handleClick} variant="destructive" size="sm">
        remove
      </Button>
    </>
  )
}

export default RemoveNoteInServerBtn
