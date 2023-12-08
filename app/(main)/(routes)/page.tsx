import { UserButton } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import Notes from '@/components/notes'
import { getProfile } from '@/actions/get/get-profile'
import { getNotes } from '@/actions/get/get-notes'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Note, Profile } from '@prisma/client'

// TODO: add note to server button

const Home = async () => {
  const responseProfile = await getProfile()
  const responseNotes = await getNotes()
  if (responseNotes.error) {
    alert(responseProfile.error)
  }
  if (responseProfile.error) {
    alert(responseProfile.error)
    redirect('/profile/create')
  }

  const notes = responseNotes.success as Note[]
  const profile = responseProfile.success as Profile

  return (
    <>
      <Link href="/note/create">
        <Button variant="outline" className="mb-4">
          Create Note
        </Button>
      </Link>
      <Notes profile={profile} notes={notes} />
      <UserButton afterSignOutUrl="/" />
    </>
  )
}

export default Home
