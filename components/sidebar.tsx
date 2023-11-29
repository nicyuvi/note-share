import Link from 'next/link'

const Sidebar = () => {
  return (
    <aside>
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/profile">Profile</Link>
        </li>
        <li>
          <Link href="/create-note">New Note</Link>
        </li>
      </ul>
    </aside>
  )
}

export default Sidebar
