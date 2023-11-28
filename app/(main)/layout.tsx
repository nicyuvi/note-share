import MainNav from "@/components/main-nav";
import Sidebar from "@/components/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="bg-red-500">
      <MainNav />
      <Sidebar />
      {children}
    </section>
  );
}
