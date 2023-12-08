'use client'
import { Button } from './ui/button'

// update getNotes to filter notes from current user
// opens modal with list of notes from my collection
// select one or multiple notes
// add btn --> update notes to relate to current server

const AddNoteToServer = () => {
  return (
    <Button
      size="sm"
      onClick={() => {
        console.log('open modal')
      }}
    >
      Add note from collection
    </Button>
  )
}

export default AddNoteToServer
