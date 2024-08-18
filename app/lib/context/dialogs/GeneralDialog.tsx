import { ReactNode } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"

interface DialogProps {
  isOpen: boolean
  setIsOpen: (_isOpen: boolean) => void
  title: string
  description?: string
  content?: ReactNode
  footer?: ReactNode
}

export default function GeneralDialog({ isOpen, setIsOpen, title, description, content, footer }: DialogProps) {

  return <Dialog open={isOpen} onOpenChange={setIsOpen}>
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
        {description && (
          <DialogDescription>
            {description}
          </DialogDescription>
        )}
        {content}
      </DialogHeader>
      <DialogFooter>
        {footer}
      </DialogFooter>
    </DialogContent>
  </Dialog>
} 
