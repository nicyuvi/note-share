import MainNav from '@/components/layout/main-nav'
import Sidebar from '@/components/layout/sidebar'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section className="bg-red-400 h-screen">
      <MainNav />
      <div className="h-screen flex">
        <Sidebar />
        <main>{children}</main>
      </div>
    </section>
  )
}
