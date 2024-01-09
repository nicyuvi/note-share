import { getProfile } from '@/actions/get/get-profile'
import type { Profile } from '@prisma/client'
import { notFound } from 'next/navigation'
import { UserButton } from '@clerk/nextjs'

const Profile = async () => {
  const response = await getProfile()
  if (response.error) notFound()
  const profile = response.success as Profile

  return (
    <>
      <p>{profile.name}</p>
      <p>{profile.bio}</p>
      <UserButton afterSignOutUrl="/" />
    </>
  )
}

export default Profile
