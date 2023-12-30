import Link from 'next/link'
import { getServers } from '@/actions/get/get-servers'
import { Server } from '@prisma/client'
import { notFound } from 'next/navigation'

const Sidebar = async () => {
  const response = await getServers()
  if (response.error) notFound()
  const servers = response.success as Server[]

  return (
    <aside className="bg-slate-500 mb-4">
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/profile">Profile</Link>
        </li>
        <li>
          <Link href="/server/create">New Server</Link>
        </li>
        {servers.map(({ id, name }) => {
          return (
            <li key={id}>
              <Link href={`/server/${id}`}>{name}</Link>
            </li>
          )
        })}
      </ul>
    </aside>
  )
}

export default Sidebar
