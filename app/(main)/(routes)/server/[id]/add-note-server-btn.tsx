'use client'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { useState, useEffect } from 'react'
import { Note } from '@prisma/client'

// opens modal with list of notes from my collection
// modal -> useBoolean()
// components/providers onMount check

// select one or multiple notes
// add btn --> update notes to relate to current server

// pass notes as props
const AddNoteToServer = ({ notes }: { notes: Note[] }) => {
  const [isMounted, setIsMounted] = useState<boolean>(false)
  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Add note</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add note to this server</DialogTitle>
        </DialogHeader>
        <div className="max-h-48 overflow-y-scroll">
          {notes.map(({ id, title }) => {
            return (
              <div key={id} className="border border-current p-4 mb-4">
                <p>{title}</p>
              </div>
            )
          })}
        </div>
        <DialogFooter>
          <Button>Add note</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default AddNoteToServer
