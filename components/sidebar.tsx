import Link from 'next/link'

const Sidebar = () => {
  return (
    <aside className="bg-slate-500 mb-4">
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/profile">Profile</Link>
        </li>
        <li>
          <Link href="/note/create">New Note</Link>
        </li>
      </ul>
    </aside>
  )
}

export default Sidebar
