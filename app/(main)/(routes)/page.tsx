import { redirect } from 'next/navigation'
import Notes from './notes'
import { getProfile } from '@/actions/get/get-profile'
import { getNotes } from '@/actions/get/get-notes'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Note, Profile } from '@prisma/client'
import { handlePromiseAllReject } from '@/lib/utils'

const Home = async () => {
  let res = await Promise.all([getProfile(), getNotes()])
  if (res[0].error) redirect('/profile/create')
  handlePromiseAllReject(res)

  const profile = res[0].success as Profile
  const notes = res[1].success as Note[]

  return (
    <>
      <div className="flex justify-end">
        <Link href="/note/create">
          <Button variant="hub" className="mb-4">
            Create Note
          </Button>
        </Link>
      </div>
      <div className="mb-4 grid grid-cols-4 gap-4">
        <Notes profile={profile} notes={notes} />
      </div>
    </>
  )
}

export default Home
