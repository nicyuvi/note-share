import type { Metadata } from 'next'
import { Inter as FontSans } from 'next/font/google'
import '@/styles/globals.css'
import { cn } from '@/lib/utils'
import { ClerkProvider } from '@clerk/nextjs'

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
})

export const metadata: Metadata = {
  title: 'NoteHub App',
  description: 'A collaborative note taking web app',
}

const COLOR_THEME_100 = '#0F62C1'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider
      appearance={{
        variables: { colorPrimary: `${COLOR_THEME_100}` },
      }}
    >
      <html lang="en">
        <body
          className={cn(
            'min-h-screen bg-background font-sans antialiased',
            fontSans.variable
          )}
        >
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}
