import { Copy } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const InviteUsersModal = ({ inviteCode }: { inviteCode: string }) => {
  return (
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>Invite Code</DialogTitle>
      </DialogHeader>
      <div className="flex items-center space-x-2">
        <Input defaultValue={inviteCode} readOnly />
        <DialogClose asChild>
          <Button
            onClick={() => {
              navigator.clipboard.writeText(inviteCode)
            }}
            type="submit"
            size="sm"
            className="px-3"
          >
            <span className="sr-only">Copy</span>
            <Copy className="h-4 w-4" />
          </Button>
        </DialogClose>
      </div>
    </DialogContent>
  )
}

export default InviteUsersModal
