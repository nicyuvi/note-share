import { redirect } from 'next/navigation'
import Notes from './notes'
import { getProfile } from '@/actions/get/get-profile'
import { getNotes } from '@/actions/get/get-notes'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Note, Profile } from '@prisma/client'
import { handlePromiseAllReject } from '@/lib/utils'
import { PRISMA_ERRORS } from '@/lib/constants'

const Home = async () => {
  let res = await Promise.all([getProfile(), getNotes()])
  if (res[0].error === PRISMA_ERRORS.P2025.name) redirect('/profile/create')
  handlePromiseAllReject(res)

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
      <div className="grid grid-cols-4 gap-4">
        <Notes notes={notes} />
      </div>
    </>
  )
}

export default Home
