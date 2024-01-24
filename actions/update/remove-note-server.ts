'use server'
import db from '@/lib/db'
import { MemberRole, Prisma } from '@prisma/client'
import { revalidatePath } from 'next/cache'
import { getCurrentMemberInServer } from '../get/member/get-current-member-server'
import { getNote } from '@/actions/get/get-note'

const ERROR_MESSAGE_PERMISSION =
  'You do not have permission to delete someone elses post'
const ERROR_MESSAGE = 'Failed to remove note'

export async function removeNoteInServer(noteId: number, serverId: number) {
  try {
    const memberRes = await getCurrentMemberInServer(serverId)
    if (memberRes.error) throw new Error(memberRes.error)
    const role = memberRes?.success?.role

    if (role === MemberRole.GUEST) {
      const noteRes = await getNote(noteId)
      const authorId = noteRes.success?.authorId
      const profileId = memberRes.success?.profileId
      if (authorId !== profileId) {
        throw new Error(ERROR_MESSAGE_PERMISSION)
      }
    }

    const data = { serverId: null }
    const removedNote = await db.note.update({
      where: {
        id: noteId,
      },
      data,
    })
    revalidatePath(`/server/${serverId}`)
    return { success: `Successfully removed note ${removedNote.title}` }
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      console.log(e.code)
    }
    if (e instanceof Error) {
      console.log(e.message)
      return { error: e.message }
    }
    return { error: ERROR_MESSAGE }
  }
}
