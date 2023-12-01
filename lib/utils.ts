import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { auth } from '@clerk/nextjs'
import db from '@/lib/db'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function getProfile() {
  const { userId } = auth()
  try {
    const profile = await db.profile.findUnique({
      where: {
        userId: userId as string,
      },
    })
    return profile
  } catch (e) {
    console.error(e)
  }
}

export async function getNotes() {
  try {
    const notes = await db.note.findMany()
    return notes
  } catch (e) {
    console.error(e)
    return { error: 'Failed to get notes' }
  }
}
