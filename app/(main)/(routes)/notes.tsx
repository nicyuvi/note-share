import Link from 'next/link'
import type { Note } from '@prisma/client'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'

// TODO: content preview

const Notes = ({ notes }: { notes: Note[] }) => {
  return (
    <>
      {notes.length > 0 ? (
        notes.map(({ id, title, content, authorName }: Note) => {
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
                    <p>{authorName}</p>
                  </CardFooter>
                </Card>
              </Link>
            </div>
          )
        })
      ) : (
        <Link href="/note/create">
          <p>
            No notes. <Button variant="hub">Create one</Button>
          </p>
        </Link>
      )}
    </>
  )
}

export default Notes
