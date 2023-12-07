'use server'
import db from '@/lib/db'
import * as z from 'zod'
import { getProfile } from '../get/get-profile'
import { MemberRole } from '@prisma/client'
import { revalidatePath } from 'next/cache'

type FormData = {
  name: string
  imageUrl?: string
}

const MEMBER_ROLE = ['ADMIN', 'GUEST'] as const

export async function createServer(formData: FormData) {
  const profile = await getProfile()
  const { name, imageUrl } = formData

  const schema = z.object({
    profileId: z.number().min(1),
    name: z.string().min(1).max(50),
    imageUrl: z.string(),
    members: z.object({
      create: z.object({
        profileId: z.number().min(1),
        role: z.enum(MEMBER_ROLE),
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
    // TODO: i need to log parse.error somewhere
    return { error: 'Failed to parse server data' }
  }

  const data = parse.data

  try {
    await db.server.create({
      data,
    })
    revalidatePath('/')
    return { success: `Created server: ${data.name}` }
  } catch (e) {
    console.error(e)
    return { error: 'Failed to create server' }
  }
}
