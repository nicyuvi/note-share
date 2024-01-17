import { getServer } from '@/actions/get/get-server'
import { Note, Server } from '@prisma/client'
import { getNotesServer } from '@/actions/get/get-notes-server'
import { getNotes } from '@/actions/get/get-notes'
import AddNoteToServerModal from './add-note-server-btn'
import { handlePromiseAllReject } from '@/lib/utils'
import RemoveNoteBtn from './remove-note-server-btn'
import { Separator } from '@/components/ui/separator'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

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
      <Separator className="mb-6 bg-hub-600" />
      <div className="grid grid-cols-4 gap-4">
        {serverNotes.length > 0 ? (
          serverNotes.map(({ id, title, content, authorName }: Note) => {
            return (
              <Card key={id} className="min-h-full min-w-full bg-hub-500">
                <CardHeader>
                  <CardTitle>{title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{content}</p>
                </CardContent>
                <CardFooter className="block">
                  <p className="mb-2">{authorName}</p>
                  <RemoveNoteBtn noteId={id} />
                </CardFooter>
              </Card>
            )
          })
        ) : (
          <p className="text-hub-600">No notes in this server</p>
        )}
      </div>
    </>
  )
}

export default ServerView
