import { ReactElement, ReactNode } from "react"

interface BubbleMenuItemProps {
  Icon: ReactElement
}

function BubbleMenuItem({ Icon, ...props}: BubbleMenuItemProps) {

  return (
    <button
      className="shrink-0 rounded p-1 text-primary hover:bg-accent"
      {...props}
    >
      <Icon size={20} />
    </button>
  )
}

export { BubbleMenuItem }
