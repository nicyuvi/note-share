'use server'
import db from '@/lib/db'
import { auth } from '@clerk/nextjs'
import * as z from 'zod'

export async function createProfile(formData: any) {
  const { userId } = auth()
  const { name, bio, imageUrl } = formData
  const schema = z.object({
    userId: z.string(),
    name: z.string().min(1).max(50),
    bio: z
      .string()
      .min(10, {
        message: 'Bio must be at least 10 characters.',
      })
      .max(160, {
        message: 'Bio must not be longer than 30 characters.',
      }),
    imageUrl: z.string(),
  })
  // safe parse so we can handle errors when validation fails
  const parse = schema.safeParse({
    userId,
    name,
    bio,
    imageUrl,
  })

  if (!parse.success) {
    return { message: 'Failed to create profile' }
  }

  const data = parse.data
  console.log(data, 'server')

  try {
    await db.profile.create({
      data,
    })
    return { success: `Created profile ${data.name}` }
  } catch (e) {
    console.error(e)
    return { error: 'Failed to create profile' }
  }
}
