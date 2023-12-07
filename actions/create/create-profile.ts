'use server'
import db from '@/lib/db'
import { auth } from '@clerk/nextjs'
import * as z from 'zod'

type FormData = {
  name: string
  bio: string
  imageUrl?: string
}

export async function createProfile(formData: FormData) {
  const { userId } = auth()
  const { name, bio, imageUrl } = formData
  const schema = z.object({
    userId: z.string(),
    name: z.string().min(1).max(50),
    bio: z.string().min(1).max(160),
    imageUrl: z.string(),
  })

  let tag = Math.floor(1000 + Math.random() * 9000)
  // safe parse so we can handle errors when validation fails
  const parse = schema.safeParse({
    userId,
    name: `${name}#${tag}`,
    bio,
    imageUrl,
  })

  if (!parse.success) {
    return { error: 'Failed to parse profile data' }
  }

  const data = parse.data

  try {
    await db.profile.create({
      data,
    })
    return { success: `Created profile ${data.name}` }
  } catch (e) {
    return { error: 'Failed to create profile' }
  }
}
