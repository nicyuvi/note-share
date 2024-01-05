export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section className="bg-hub-400 h-screen flex justify-around items-center">
      {children}
    </section>
  )
}
