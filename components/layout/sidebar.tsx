'use client'
import Link from 'next/link'
import { useState } from 'react'
import { Server } from '@prisma/client'
import { Separator } from '@/components/ui/separator'
import CustomTooltip from './custom-tooltip'
import SidebarIcon from './sidebar-icon'
import { UserRound, Plus } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { notFound } from 'next/navigation'
import { getServers } from '@/actions/get/get-servers'
import { useEffect } from 'react'

const ROUTE = {
  home: '/',
  serverCreate: '/server/create',
  server: '/server',
  profile: '/profile',
}

const Sidebar = () => {
  const pathname = usePathname()
  const [servers, setServers] = useState<Server[]>()
  useEffect(() => {
    const getServersHandler = async () => {
      const response = await getServers()
      if (response.error) notFound()
      const servers = response.success as Server[]
      setServers(servers)
    }
    getServersHandler()
  }, [])

  return (
    <nav className="bg-hub-500 px-2 py-4">
      <div className="flex h-full flex-col justify-between">
        <ul className="flex flex-col items-center overflow-y-auto">
          <li>
            <Link href={ROUTE.home}>
              <CustomTooltip content="Collection">
                <SidebarIcon classes="mb-2" active={pathname === ROUTE.home}>
                  <p>C</p>
                </SidebarIcon>
              </CustomTooltip>
            </Link>
          </li>
          <Separator className="mb-2 bg-hub-600" />
          <li>
            <Link href={ROUTE.serverCreate}>
              <CustomTooltip content="Create Server">
                <SidebarIcon
                  classes="mb-2"
                  active={pathname === ROUTE.serverCreate}
                >
                  <Plus />
                </SidebarIcon>
              </CustomTooltip>
            </Link>
          </li>
          {servers?.map(({ id, name }) => {
            return (
              <li key={id}>
                <Link href={`${ROUTE.server}/${id}`}>
                  <CustomTooltip content={name}>
                    <SidebarIcon
                      classes="mb-2"
                      active={pathname === `${ROUTE.server}/${id}`}
                    >
                      <p>{name.split('')[0].toUpperCase()}</p>
                    </SidebarIcon>
                  </CustomTooltip>
                </Link>
              </li>
            )
          })}
        </ul>
        <div>
          <Separator className="my-2 h-[1.5px] bg-hub-600" />
          <Link href={ROUTE.profile} className="flex justify-evenly">
            <SidebarIcon active={pathname === ROUTE.profile}>
              <UserRound color="#fff" />
            </SidebarIcon>
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Sidebar
