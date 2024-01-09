import Link from 'next/link'
import { getServers } from '@/actions/get/get-servers'
import { Server } from '@prisma/client'
import { notFound } from 'next/navigation'
import { Separator } from '@/components/ui/separator'
import CustomTooltip from './custom-tooltip'
import SidebarIcon from './sidebar-icon'
import { UserRound, Plus } from 'lucide-react'

const Sidebar = async () => {
  const response = await getServers()
  if (response.error) notFound()
  const servers = response.success as Server[]

  return (
    <nav className="bg-hub-500 px-2 py-4">
      <div className="flex h-full flex-col justify-between">
        <ul className="flex flex-col items-center overflow-y-auto">
          <li>
            <Link href="/">
              <CustomTooltip content="Collection">
                <SidebarIcon classes="mb-2">
                  <p>C</p>
                </SidebarIcon>
              </CustomTooltip>
            </Link>
          </li>
          <Separator className="mb-2 bg-hub-600" />
          <li>
            <Link href="/server/create">
              <CustomTooltip content="Create Server">
                <SidebarIcon classes="mb-2">
                  <Plus />
                </SidebarIcon>
              </CustomTooltip>
            </Link>
          </li>
          {servers.map(({ id, name }) => {
            return (
              <li key={id}>
                <Link href={`/server/${id}`}>
                  <CustomTooltip content={name}>
                    <SidebarIcon classes="mb-4">
                      <p>{name.split('')[0].toUpperCase()}</p>
                    </SidebarIcon>
                  </CustomTooltip>
                </Link>
              </li>
            )
          })}
        </ul>
        <Separator className="my-2 h-[1.5px] bg-hub-600" />
        <Link href="/profile" className="flex justify-evenly">
          <SidebarIcon>
            <UserRound color="#fff" />
          </SidebarIcon>
        </Link>
      </div>
    </nav>
  )
}

export default Sidebar
