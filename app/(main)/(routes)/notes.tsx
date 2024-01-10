import Link from 'next/link'
import type { Note, Profile } from '@prisma/client'
import { deleteNote } from '@/actions/delete/delete-note'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

type NotesType = {
  notes: Note[]
  profile: Profile
}

const Notes = ({ notes, profile }: NotesType) => {
  const { name } = profile

  // move to note/id page
  async function handleDelete(id: number) {
    const response = await deleteNote(id)
    if (response.error) {
      alert(response.error)
    } else {
      alert(response.success)
    }
  }

  // todo: content preview

  return (
    <>
      {notes.length > 0 ? (
        notes.map(({ id, title, content }: Note) => {
          return (
            <div key={id} className="grow cursor-pointer">
              <Link href={`/note/${id}`}>
                <Card className="min-h-full bg-hub-500">
                  <CardHeader>
                    <CardTitle>{title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>{content}</p>
                  </CardContent>
                  <CardFooter>
                    <p>{name}</p>
                  </CardFooter>
                </Card>
              </Link>
            </div>
          )
        })
      ) : (
        <Link href="/note/create">Create New Note</Link>
      )}
    </>
  )
}

export default Notes
