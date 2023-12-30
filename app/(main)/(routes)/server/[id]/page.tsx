import { getServer } from '@/actions/get/get-server'
import { Note, Server } from '@prisma/client'
import { getNotesServer } from '@/actions/get/get-notes-server'
import { getNotes } from '@/actions/get/get-notes'
import AddNoteToServer from './add-note-server-btn'
import { handlePromiseAllReject } from '@/lib/utils'

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
      <div className="flex justify-between items-center mb-6">
        <h1>{server.name}</h1>
        <AddNoteToServer notes={allNotes} />
      </div>
      <hr />
      {serverNotes.length > 0 ? (
        serverNotes.map(({ id, title, content }: Note) => {
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
