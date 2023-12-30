'use client'
import { Button } from './ui/button'

// opens modal with list of notes from my collection
// modal -> useBoolean()
// components/providers onMount check

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
