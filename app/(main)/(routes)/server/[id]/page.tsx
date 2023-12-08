import { notFound } from 'next/navigation'
import { getServer } from '@/actions/get/get-server'
import { Note, Server } from '@prisma/client'
import { getNotesServer } from '@/actions/get/get-notes-server'

// TODO: add note from collection button

// ? refactor with promise.all
const ServerView = async ({ params }: { params: { id: string } }) => {
  const response = await getServer(Number(params.id))
  const notesResponse = await getNotesServer(Number(params.id))

  if (notesResponse.error) {
    alert(notesResponse.error)
    return notFound()
  } else if (response.error) {
    alert(response.error)
    return notFound()
  }

  const server = response.success as Server
  const notes = notesResponse.success as Note[]

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
