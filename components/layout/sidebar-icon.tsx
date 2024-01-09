const SidebarIcon = ({
  children,
  classes = '',
}: {
  children: React.ReactNode
  classes?: string
}) => {
  return (
    <div
      className={`${classes} flex h-11 w-11 cursor-pointer items-center justify-center rounded-lg bg-hub-100 text-xl text-hub-500`}
    >
      {children}
    </div>
  )
}

export default SidebarIcon
