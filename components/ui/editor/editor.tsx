"use client"

import { useEditor, EditorContent, BubbleMenu } from "@tiptap/react"
import { RiBold, RiItalic, RiStrikethrough } from "@remixicon/react"
import { Bold, Italic, Strikethrough } from "lucide-react"
// import BubbleMenu from "@tiptap/extension-bubble-menu"
import StarterKit from "@tiptap/starter-kit"
import { cn } from "@/lib/utils"
import { BubbleMenuItem } from "./bubble-menu-item"

// define your extension array
const extensions = [
  StarterKit,
  // BubbleMenu.configure({
  //   element: document.querySelector("#description-editor") as HTMLElement
  // })
]

const bubbleMenuItems = [
  { id: "bold", icon: Bold },
  { id: "italic", icon: Italic },
  { id: "strike", icon: Strikethrough },
]

interface TipTapProps {
  className?: string
  content: string
  onChange: (_value: string) => void
}

const Tiptap = ({ className = "", content, onChange }: TipTapProps) => {
  // console.log(document.querySelector("#description-editor"))
  const editor = useEditor({
    editorProps: {
      attributes: {
        class: "px-3 py-2 focus:outline-none min-h-72",
      },
      transformPastedText(text) {
        return text.toUpperCase()
      },
    },
    extensions,
    content,
    onUpdate: ({ editor: e }) => {
      onChange(e.getHTML())
    }
  })

  console.log(editor)


  return (
    <div
      className={cn(
        "flex h-auto w-full flex-col rounded-md border border-input shadow-sm focus-within:border-primary group",
        className,
      )}
    >
      <EditorContent editor={editor} />
      {/* <FloatingMenu editor={editor}>This is the floating menu</FloatingMenu> */}
      {editor && (
        <BubbleMenu editor={editor} className="-bottom-5">
          <div className="flex rounded-lg border bg-white p-1 shadow">
            {bubbleMenuItems.map((i) => (
              <BubbleMenuItem key={i.id} Icon={i.icon} className="text-primary" />
            ))}
            {/* <button
              onClick={() => editor.chain().focus().toggleBold().run()}
              className={editor.isActive("bold") ? "is-active" : ""}
            >
              <RiBold />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleItalic().run()}
              className={editor.isActive("italic") ? "is-active" : ""}
            >
              <RiItalic />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleStrike().run()}
              className={editor.isActive("strike") ? "is-active" : ""}
            >
              <RiStrikethrough />
            </button> */}
          </div>
        </BubbleMenu>
      )}
    </div>
  )
}

export default Tiptap
