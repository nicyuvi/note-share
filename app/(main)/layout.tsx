import MainNav from '@/components/main-nav'
import Sidebar from '@/components/sidebar'

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
