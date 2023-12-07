import { UserButton } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import Notes from '@/components/notes'
import { getProfile } from '@/actions/get/get-profile'
import { getNotes } from '@/actions/get/get-notes'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const Home = async () => {
  const profile = await getProfile()
  const notes = await getNotes()
  if (!profile) {
    redirect('/profile/create')
  }

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
