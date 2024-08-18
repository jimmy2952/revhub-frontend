import { ReactNode } from "react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface DialogProps {
  isOpen: boolean
  setIsOpen: (_isOpen: boolean) => void
  title: string
  description?: string
  content?: ReactNode
  onCancel?: () => void
  onConfirm?: () => void
}

export default function ConfirmDialog({ isOpen, setIsOpen, title, description, content, onCancel, onConfirm }: DialogProps) {

  return <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
    <AlertDialogContent className="sm:max-w-[425px]">
      <AlertDialogHeader>
        <AlertDialogTitle>{title}</AlertDialogTitle>
        {description && (
          <AlertDialogDescription>
            {description}
          </AlertDialogDescription>
        )}
        {content}
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel onClick={onCancel}>Cancel</AlertDialogCancel>
        <AlertDialogAction onClick={onConfirm}>Confirm</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
} 
