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

// opens modal with list of notes from my collection
// modal -> useBoolean()
// components/providers onMount check

// select one or multiple notes
// add btn --> update notes to relate to current server

const AddNoteToServer = () => {
  return (
    <Dialog>
      <DialogTrigger className="border border-sky-500">
        <Button>Add note</Button>
      </DialogTrigger>
      <DialogContent className="border border-sky-500">
        <DialogHeader className="border border-sky-500">
          <DialogTitle>Are you sure absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
        <div>list notes from collection</div>
        <DialogFooter>
          <Button>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default AddNoteToServer
