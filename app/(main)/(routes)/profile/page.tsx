import { getProfile } from '@/lib/profile'

const Profile = async () => {
  const profile = await getProfile()
  console.log(profile, 'profile')

  return (
    <>
      <div>Profile page. user can edit profile info here</div>
    </>
  )
}

export default Profile
