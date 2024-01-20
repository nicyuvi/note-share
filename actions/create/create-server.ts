'use server'
import db from '@/lib/db'
import * as z from 'zod'
import { getProfile } from '../get/get-profile'
import { MemberRole } from '@prisma/client'

type FormData = {
  name: string
  imageUrl?: string
}

export async function createServer(formData: FormData) {
  const response = await getProfile()
  if (response.error) {
    return { error: response.error }
  }
  const profile = response.success
  const { name, imageUrl } = formData

  const schema = z.object({
    profileId: z.number().min(1),
    name: z.string().min(1).max(50),
    imageUrl: z.string(),
    members: z.object({
      create: z.object({
        profileId: z.number().min(1),
        role: z.nativeEnum(MemberRole),
      }),
    }),
  })

  // safe parse so we can handle errors when validation fails
  const parse = schema.safeParse({
    profileId: profile?.id,
    name,
    imageUrl,
    members: {
      create: {
        profileId: profile?.id,
        role: MemberRole.ADMIN,
      },
    },
  })

  if (!parse.success) {
    console.log(parse.error)
    return { error: 'Failed to parse server data' }
  }

  const data = parse.data

  try {
    const serverRes = await db.server.create({
      data,
    })
    return { success: `Created server: ${serverRes.name}` }
  } catch (e) {
    return { error: 'Failed to create server' }
  }
}
