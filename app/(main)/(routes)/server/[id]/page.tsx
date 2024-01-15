import { getServer } from '@/actions/get/get-server'
import { Note, Server } from '@prisma/client'
import { getNotesServer } from '@/actions/get/get-notes-server'
import { getNotes } from '@/actions/get/get-notes'
import AddNoteToServerModal from './add-note-server-btn'
import { handlePromiseAllReject } from '@/lib/utils'
import RemoveNoteBtn from './remove-note-server-btn'

const ServerView = async ({ params }: { params: { id: string } }) => {
  let res = await Promise.all([
    getServer(Number(params.id)),
    getNotesServer(Number(params.id)),
    getNotes(),
  ])
  handlePromiseAllReject(res)

  const server = res[0].success as Server
  const serverNotes = res[1].success as Note[]
  const allNotes = res[2].success as Note[]

  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-hub-600">{server.name}</h1>
        <AddNoteToServerModal serverId={server.id} notes={allNotes} />
      </div>
      <hr />
      {serverNotes.length > 0 ? (
        serverNotes.map(({ id, title, content, authorName }: Note) => {
          return (
            <div
              key={id}
              className="mb-4 flex items-center justify-between bg-blue-100"
            >
              <div>
                <p>{title}</p>
                <p>{content}</p>
                <p>{authorName}</p>
              </div>
              <RemoveNoteBtn noteId={id} />
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
