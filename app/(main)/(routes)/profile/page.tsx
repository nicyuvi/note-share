import { getProfile } from '@/actions/get/get-profile'
import type { Profile } from '@prisma/client'

const Profile = async () => {
  const response = await getProfile()

  if (response.error) {
    alert(response.error)
    return null
  }

  const profile = response.success

  return (
    <>
      <p>{profile?.name}</p>
      <p>{profile?.bio}</p>
    </>
  )
}

export default Profile
