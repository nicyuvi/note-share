import Link from 'next/link'

// TODO: add servers to sidebar

const Sidebar = () => {
  // get servers
  // loop and render server

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
          <Link href="/server/create">New Server</Link>
        </li>
      </ul>
    </aside>
  )
}

export default Sidebar
