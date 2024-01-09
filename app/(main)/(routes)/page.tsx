import { redirect } from 'next/navigation'
import Notes from './notes'
import { getProfile } from '@/actions/get/get-profile'
import { getNotes } from '@/actions/get/get-notes'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Note, Profile } from '@prisma/client'
import { handlePromiseAllReject } from '@/lib/utils'

// TODO: add note to server button

const Home = async () => {
  let res = await Promise.all([getProfile(), getNotes()])
  if (res[0].error) redirect('/profile/create')
  handlePromiseAllReject(res)

  const profile = res[0].success as Profile
  const notes = res[1].success as Note[]

  return (
    <>
      <Link href="/note/create">
        <Button variant="outline" className="mb-4">
          Create Note
        </Button>
      </Link>
      <Notes profile={profile} notes={notes} />
    </>
  )
}

export default Home
