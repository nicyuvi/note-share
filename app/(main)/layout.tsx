import MainNav from '@/components/layout/main-nav'
import Sidebar from '@/components/layout/sidebar'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section className="bg-slate-400 min-h-screen">
      <MainNav />
      <Sidebar />
      {children}
    </section>
  )
}
