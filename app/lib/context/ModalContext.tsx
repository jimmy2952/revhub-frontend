import { createContext, useState, useContext, ReactNode } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"

export const ModalContext = createContext({
  openModal: ({ modalProps: _modalProps }: { modalProps: ModalProps }): void => {},
})

export const useModalContext = () => useContext(ModalContext)

interface ModalContextProviderProps {
  children: ReactNode
}

interface ModalProps {
  title: string
  description?: string
  content?: ReactNode
  footer?: ReactNode
}

export const ModalContextProvider = ({ children }: ModalContextProviderProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [contextModalProps, setContextModalProps] = useState<ModalProps>({ title: "", description: "", footer: null })

  const openModal = ({ modalProps }: { modalProps: ModalProps }) => {
    setContextModalProps(modalProps)
    setIsOpen(true)
  }

  return (
    <ModalContext.Provider value={{ openModal }}>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{contextModalProps.title}</DialogTitle>
            {contextModalProps.description && (
              <DialogDescription>
                {contextModalProps.description}
              </DialogDescription>
            )}
            {contextModalProps.content}
          </DialogHeader>
          <DialogFooter>
            {contextModalProps.footer}
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {children}
    </ModalContext.Provider>
  )
}