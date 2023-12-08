import { notFound } from 'next/navigation'
import { getServer } from '@/actions/get/get-server'
import { Note, Server } from '@prisma/client'
import { getNotesServer } from '@/actions/get/get-notes-server'

// TODO: add note from collection button

const ServerView = async ({ params }: { params: { id: string } }) => {
  let res = await Promise.all([
    getServer(Number(params.id)),
    getNotesServer(Number(params.id as any)),
  ])

  for (let i = 0; i < res.length; i++) {
    if (res[i].error) {
      return notFound()
    }
  }

  const server = res[0].success as Server
  const notes = res[1].success as Note[]

  return (
    <>
      <h1 className="mb-4">{server.name}</h1>
      <hr />
      {notes.length > 0 ? (
        notes.map(({ id, title, content }: Note) => {
          return (
            <div key={id} className="bg-blue-100 mb-4">
              <div>
                <p>{title}</p>
                <p>{content}</p>
              </div>
            </div>
          )
        })
      ) : (
        <p>No notes in this server</p>
      )}
    </>
  )
}

export default ServerView
