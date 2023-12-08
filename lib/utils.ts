import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { notFound } from 'next/navigation'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function handlePromiseAllReject(res: Array<any>) {
  for (let i = 0; i < res.length; i++) {
    if (res[i].success === null || res[i].error) {
      return notFound()
    }
  }
}
