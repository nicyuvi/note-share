import { UserButton } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import Notes from '@/components/notes'
import { getProfile } from '@/lib/profile'
import { getNotes } from '@/lib/note'

const Home = async () => {
  const profile = await getProfile()
  const notes = await getNotes()
  if (!profile) {
    redirect('/create-profile')
  }

  return (
    <>
      <Notes notes={notes} />
      <UserButton afterSignOutUrl="/" />
    </>
  )
}

export default Home
