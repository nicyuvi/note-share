export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section className="bg-hub-400 h-screen flex justify-around items-center">
      <div className="flex flex-col items-center">
        <div className="text-center">
          <h1 className="text-5xl font-bold mb-4">
            Note<span className="text-hub-200">Hub</span>
          </h1>
          <p className="text-2xl text-hub-600 mb-4">
            Share the Spark, Ignite the Notesphere!
          </p>
        </div>
        {children}
      </div>
    </section>
  )
}
