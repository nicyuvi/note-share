import Link from 'next/link'
import { getServers } from '@/actions/get/get-servers'
import { Server } from '@prisma/client'
import { notFound } from 'next/navigation'

const Sidebar = async () => {
  const response = await getServers()
  if (response.error) notFound()
  const servers = response.success as Server[]

  return (
    <nav className="bg-hub-500">
      <div className="flex h-full flex-col justify-between">
        <ul className="flex flex-col items-center">
          <li>
            <Link href="/">
              <div className="mb-2 flex h-11 w-11 cursor-pointer items-center justify-center rounded-lg bg-hub-100 text-xl text-hub-500">
                H
              </div>
            </Link>
          </li>
          <li>
            <Link href="/server/create">
              <div className="mb-2 flex h-11 w-11 cursor-pointer items-center justify-center rounded-lg bg-hub-100 text-xl text-hub-500">
                N
              </div>
            </Link>
          </li>
          {servers.map(({ id, name }) => {
            return (
              <li key={id}>
                <Link href={`/server/${id}`}>{name}</Link>
              </li>
            )
          })}
        </ul>
        <Link href="/profile" className="flex justify-evenly">
          <div className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-lg bg-hub-100 text-xl text-hub-500">
            P
          </div>
        </Link>
      </div>
    </nav>
  )
}

export default Sidebar
