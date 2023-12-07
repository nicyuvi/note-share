import { notFound } from 'next/navigation'
import { getServer } from '@/actions/get/get-server'
import { Server } from '@prisma/client'

const ServerView = async ({ params }: { params: { id: string } }) => {
  const response = await getServer(Number(params.id))
  // if no server id return notFound()
  if (response.error) {
    alert(response.error)
    return notFound()
  }
  const server = response.success as Server
  console.log('server', server)
  return <div>{server.name}</div>
}

export default ServerView
