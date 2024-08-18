import { createContext, useState, useContext, ReactNode } from "react"
import ConfirmDialog from "./dialogs/ConfirmDialog"
import GeneralDialog from "./dialogs/GeneralDialog"

export const DialogContext = createContext({
  openDialog: ({ type: _type, dialogProps: _dialogProps }: OpenDialogInput): void => {},
})

export const useDialogContext = () => useContext(DialogContext)

interface DialogContextProviderProps {
  children: ReactNode
}

interface DialogProps {
  title: string
  description: string
  content?: ReactNode
  footer?: ReactNode
  onClose?: () => void
  onConfirm?: () => void
}

interface OpenDialogInput {
  type?: DIALOG_TYPE
  dialogProps: DialogProps
}

export enum DIALOG_TYPE {
  // eslint-disable-next-line no-unused-vars
  CONFIRM = "confirm",
  // eslint-disable-next-line no-unused-vars
  GENERAL = "general",
}

const DIALOG_TYPE_MAPPING = {
  [DIALOG_TYPE.CONFIRM]: ConfirmDialog,
  [DIALOG_TYPE.GENERAL]: GeneralDialog,
}

export const DialogContextProvider = ({ children }: DialogContextProviderProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [type, setType] = useState<DIALOG_TYPE>(DIALOG_TYPE.GENERAL)
  const [contextDialogProps, setContextDialogProps] = useState<DialogProps>({ title: "", description: "", footer: null })

  const openDialog = ({ type, dialogProps }: OpenDialogInput) => {
    if (type) setType(type)
    setContextDialogProps(dialogProps)
    setIsOpen(true)
  }

  const DialogComponent = DIALOG_TYPE_MAPPING[type]

  return (
    <DialogContext.Provider value={{ openDialog }}>
      <DialogComponent
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        {...contextDialogProps}
      />
      {children}
    </DialogContext.Provider>
  )
}