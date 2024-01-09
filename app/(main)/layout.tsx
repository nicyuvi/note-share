import MainNav from '@/components/layout/main-nav'
import Sidebar from '@/components/layout/sidebar'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section className="min-h-screen bg-hub-400">
      <div className="flex flex-col">
        <MainNav />
        <div className="flex h-full">
          <Sidebar />
          <main>{children}</main>
        </div>
      </div>
    </section>
  )
}
