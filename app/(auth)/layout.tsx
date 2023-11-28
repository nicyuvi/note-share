export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section className="bg-blue-500">{children}</section>;
}
