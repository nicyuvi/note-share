import MainNav from '@/components/layout/main-nav'
import Sidebar from '@/components/layout/sidebar'
import { getServers } from '@/actions/get/get-servers'
import { notFound } from 'next/navigation'
import { Server } from '@prisma/client'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const response = await getServers()
  if (response.error) notFound()
  const servers = response.success as Server[]

  return (
    <section className="flex h-screen flex-col border">
      <MainNav />
      <div className="flex h-full min-h-0">
        <Sidebar servers={servers} />
        <main className="w-full overflow-y-auto border border-red-500 px-4 pt-4">
          {children}
        </main>
      </div>
    </section>
  )
}
