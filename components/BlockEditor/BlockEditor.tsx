import { EditorContent } from "@tiptap/react"
import React, { useRef } from "react"

import { useBlockEditor } from "@/hooks/useBlockEditor"

import ImageBlockMenu from "@/components/BlockEditor/extensions/ImageBlock/components/ImageBlockMenu"
import { ColumnsMenu } from "@/components/BlockEditor/extensions/MultiColumn/menus"
import { TableColumnMenu, TableRowMenu } from "@/components/BlockEditor/extensions/Table/menus"
import { TextMenu } from "@/components/BlockEditor/menus/TextMenu"
import { LinkMenu } from "@/components/BlockEditor/menus"

import "@/components/BlockEditor/styles/index.css"

interface BlockEditorProps {
  onChange: (_value: string) => void
}

export const BlockEditor = ({ onChange }: BlockEditorProps) => {
  const menuContainerRef = useRef(null)

  const { editor } = useBlockEditor({ onChange })

  if (!editor) {
    return null
  }

  return (
    <div className="flex h-full" ref={menuContainerRef}>
      <div className="group relative flex h-auto w-full flex-col rounded-md border border-input shadow-sm focus-within:border-primary">
        <EditorContent editor={editor} className="flex-1 overflow-y-auto" />
        <LinkMenu editor={editor} appendTo={menuContainerRef} />
        <TextMenu editor={editor} />
        <ColumnsMenu editor={editor} appendTo={menuContainerRef} />
        <TableRowMenu editor={editor} appendTo={menuContainerRef} />
        <TableColumnMenu editor={editor} appendTo={menuContainerRef} />
        <ImageBlockMenu editor={editor} appendTo={menuContainerRef} />
      </div>
    </div>
  )
}

export default BlockEditor
