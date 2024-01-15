/* eslint-disable react/display-name */
'use client'
import { useState, useEffect } from 'react'

// ? FIXES Error: Hydration failed because the initial UI does not match what was rendered on the server.
export const withHydrationError = (WrappedComponent: any) => (props: any) => {
  const [isMounted, setIsMounted] = useState<boolean>(false)
  useEffect(() => {
    setIsMounted(true)
  }, [])
  if (!isMounted) {
    return null
  }
  return <WrappedComponent {...props} />
}
