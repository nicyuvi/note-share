import classNames from 'classnames'

type SidebarIconProps = {
  children: React.ReactNode
  classes?: string
  active: boolean
}

const SidebarIcon = ({ children, classes = '', active }: SidebarIconProps) => {
  const iconClass = classNames({
    'rounded-[10px]': active,
    'rounded-[20px]': !active,
  })

  return (
    <div
      className={`${classes} ${iconClass} flex h-[40px] w-[40px] cursor-pointer items-center justify-center bg-hub-100 text-xl text-hub-500 transition-all hover:rounded-[10px]`}
    >
      {children}
    </div>
  )
}

export default SidebarIcon
