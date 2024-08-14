import { cn } from "@/lib/utils"

export default function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("text-2xl font-medium", className)}>RevHub</div>
  )
}
