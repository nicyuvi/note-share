'use server'
import db from '@/lib/db'
import * as z from 'zod'
import { getProfile } from '@/actions/get/get-profile'
import { Member, MemberRole } from '@prisma/client'
import { getServerByInvite } from '@/actions/get/get-server-invite'
import { handlePromiseAllReject } from '@/lib/utils'

// TODO edge case:
//   server admin can remove all notes
//   note owner can add and remove notes

const MEMBER_EXISTS = 'Already a member of this server.'

type FormData = {
  inviteCode: string
}

export async function createMember(formData: FormData) {
  let res = await Promise.all([
    getProfile(),
    getServerByInvite(formData.inviteCode),
  ])
  handlePromiseAllReject(res)
  const profile = res[0].success
  const server = res[1].success
  const members = server?.members as Member[]

  try {
    for (let i = 0; i < members?.length; i++) {
      const memberProfileId = members[i].profileId
      const currProfileId = profile?.id
      if (memberProfileId === currProfileId) {
        throw new Error(MEMBER_EXISTS)
      }
    }

    const schema = z.object({
      role: z.nativeEnum(MemberRole),
      serverId: z.number().min(1),
      profileId: z.number().min(1),
    })

    // safe parse so we can handle errors when validation fails
    const parse = schema.safeParse({
      role: MemberRole.GUEST,
      serverId: server?.id,
      profileId: profile?.id,
    })

    if (!parse.success) {
      console.log(parse.error)
      return { error: 'Failed to parse server data' }
    }

    const data = parse.data

    const memberRes = await db.member.create({
      data,
    })
    return { success: `Joined server: ${memberRes.serverId}` }
  } catch (e) {
    console.log(e as Error)
    return { error: (e as Error).message }
  }
}
