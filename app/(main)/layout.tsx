import MainNav from '@/components/layout/main-nav'
import Sidebar from '@/components/layout/sidebar'
import { getProfile } from '@/actions/get/get-profile'
import { redirect } from 'next/navigation'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section className="flex h-screen flex-col border">
      <MainNav />
      <div className="flex h-full min-h-0">
        <Sidebar />
        <main className="w-full overflow-y-auto p-4">{children}</main>
      </div>
    </section>
  )
}
