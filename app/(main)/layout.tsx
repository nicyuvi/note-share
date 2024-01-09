import MainNav from '@/components/layout/main-nav'
import Sidebar from '@/components/layout/sidebar'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section className="flex h-screen flex-col border">
      <MainNav />
      <div className="flex h-full min-h-0">
        <Sidebar />
        <main className="overflow-y-auto">{children}</main>
      </div>
    </section>
  )
}
