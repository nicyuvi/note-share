import { getProfile } from '@/actions/get/get-profile'
import type { Profile } from '@prisma/client'
import { notFound } from 'next/navigation'
import { UserButton } from '@clerk/nextjs'
import { Separator } from '@/components/ui/separator'

const Profile = async () => {
  const response = await getProfile()
  if (response.error) notFound()
  const profile = response.success as Profile

  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-hub-600">{profile.name}</h1>
        <UserButton afterSignOutUrl="/" />
      </div>
      <Separator className="mb-6 bg-hub-600" />
      <p>{profile.bio}</p>
    </>
  )
}

export default Profile
