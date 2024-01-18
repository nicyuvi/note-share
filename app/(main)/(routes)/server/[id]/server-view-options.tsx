'use client'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { MoreVertical, UserPlus, XCircle } from 'lucide-react'
import { deleteServer } from '@/actions/delete/delete-server'
import { useSidebarStore } from '@/store/zustand'
import { useRouter } from 'next/navigation'
import { PRISMA_ERRORS } from '@/lib/constants'

const ServerViewOptions = ({ serverId }: { serverId: string }) => {
  const updateServer = useSidebarStore((state) => state.updateServer)
  const router = useRouter()

  async function deleteHandler() {
    const res = await deleteServer(Number(serverId))
    if (res.error) {
      if (res.error === PRISMA_ERRORS.P2003.name) {
        alert(PRISMA_ERRORS.P2003.message)
      } else {
        alert(res.error)
      }
    } else {
      alert(res.success)
      updateServer()
      router.push('/')
    }
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <MoreVertical className="cursor-pointer" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Server Options</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className="mb-2 cursor-pointer">
            <UserPlus className="mr-2 h-4 w-4" />
            <span>Invite Users</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer bg-red-500">
            <XCircle className="mr-2 h-4 w-4" />
            <span onClick={deleteHandler}>Delete Server</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ServerViewOptions