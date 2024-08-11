import { ReactNode } from "react"
import { cn } from "@/lib/utils"

export default function PageHeader({ className, children }: {className?: string, children: ReactNode}) {
  return (
    <div className={cn("mb-6 text-2xl font-bold", className)}>{children}</div>
  )
}
