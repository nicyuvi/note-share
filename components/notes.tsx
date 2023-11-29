import Link from 'next/link'

const Notes = ({ notes }: any) => {
  console.log(notes)
  return (
    <>
      {notes.length > 0 ? (
        notes.map((note: any) => {
          return <div key={note.id}>{note.body}</div>
        })
      ) : (
        <Link href="/create-note">Create New Note</Link>
      )}
    </>
  )
}

export default Notes
