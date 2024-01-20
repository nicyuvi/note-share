'use server'
import db from '@/lib/db'
import * as z from 'zod'
import { getProfile } from '@/actions/get/get-profile'
import { MemberRole, Profile } from '@prisma/client'
import { getServerByInvite } from '@/actions/get/get-server-invite'
import { handlePromiseAllReject } from '@/lib/utils'
import { Server } from '@prisma/client'

type FormData = {
  inviteCode: string
}

export async function createMember(formData: FormData) {
  let res = await Promise.all([
    getProfile(),
    getServerByInvite(formData.inviteCode),
  ])
  handlePromiseAllReject(res)
  const profile = res[0].success as Profile
  const server = res[1].success as Server

  const schema = z.object({
    role: z.nativeEnum(MemberRole),
    serverId: z.number().min(1),
    profileId: z.number().min(1),
  })

  // safe parse so we can handle errors when validation fails
  const parse = schema.safeParse({
    role: MemberRole.GUEST,
    serverId: server.id,
    profileId: profile.id,
  })

  if (!parse.success) {
    console.log(parse.error)
    return { error: 'Failed to parse server data' }
  }

  const data = parse.data

  try {
    const memberRes = await db.member.create({
      data,
    })
    return { success: `Joined server: ${memberRes.serverId}` }
  } catch (e) {
    return { error: 'Failed to create member' }
  }
}
