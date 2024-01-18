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

const ServerViewOptions = () => {
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
            <span>Delete Server</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ServerViewOptions
