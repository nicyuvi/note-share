import { getProfile } from '@/lib/profile'
import type { Profile } from '@prisma/client'

const Profile = async () => {
  const profile = await getProfile()
  const { name, bio } = profile as Profile

  return (
    <>
      <p>{name}</p>
      <p>{bio}</p>
    </>
  )
}

export default Profile
