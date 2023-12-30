import { getServer } from '@/actions/get/get-server'
import { Note, Server } from '@prisma/client'
import { getNotesServer } from '@/actions/get/get-notes-server'
import AddNoteToServer from '@/components/add-note-server'
import { handlePromiseAllReject } from '@/lib/utils'

// TODO: add note from collection button

const ServerView = async ({ params }: { params: { id: string } }) => {
  let res = await Promise.all([
    getServer(Number(params.id)),
    getNotesServer(Number(params.id)),
  ])
  handlePromiseAllReject(res)

  const server = res[0].success as Server
  const notes = res[1].success as Note[]

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1>{server.name}</h1>
        <AddNoteToServer />
      </div>
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
