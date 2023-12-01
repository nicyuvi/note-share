import { UserButton } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import Notes from '@/components/notes'
import { getProfile } from '@/lib/utils'
import { getNotes } from '@/lib/utils'

const Home = async () => {
  const profile = await getProfile()
  const notes = await getNotes()
  if (!profile) {
    redirect('/create-profile')
  }

  return (
    <>
      <Notes profile={profile} notes={notes} />
      <UserButton afterSignOutUrl="/" />
    </>
  )
}

export default Home
