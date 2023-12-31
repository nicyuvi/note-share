'use client'
import { Button } from '@/components/ui/button'
import { updateNoteInServer } from '@/actions/update/update-note-server'

const REMOVE_NOTE_ID = null

const RemoveNoteBtn = ({ noteId }: { noteId: number }) => {
  async function handleClick(): Promise<void> {
    const response = await updateNoteInServer(noteId, {
      serverId: REMOVE_NOTE_ID,
    })
    if (response.error) {
      throw new Error(response.error)
    } else {
      alert(response.success) // replace alert with toast
    }
  }
  return (
    <Button onClick={handleClick} variant="destructive" size="sm">
      remove
    </Button>
  )
}

export default RemoveNoteBtn
