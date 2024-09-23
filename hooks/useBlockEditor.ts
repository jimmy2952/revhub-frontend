import { useEditor, useEditorState } from "@tiptap/react"
import deepEqual from "fast-deep-equal"
import type { AnyExtension, Editor } from "@tiptap/core"

import { ExtensionKit } from "@/components/BlockEditor/extensions/extension-kit"
import type { EditorUser } from "@/components/BlockEditor/types"

declare global {
  // eslint-disable-next-line no-unused-vars
  interface Window {
    editor: Editor | null
  }
}

interface UseBlockEditorProps {
  onChange: (_value: string) => void
}

export const useBlockEditor = ({ onChange }: UseBlockEditorProps) => {
  const editor = useEditor(
    {
      immediatelyRender: false,
      shouldRerenderOnTransaction: false,
      autofocus: true,
      onCreate: ctx => {
        if (ctx.editor.isEmpty) {
          ctx.editor.commands.focus("start", { scrollIntoView: true })
        }
      },
      onUpdate: ({ editor: localEditor }) => {
        if (localEditor.isEmpty) {
          onChange("")
        } else {
          onChange(localEditor.getHTML())
        }
      },
      extensions: [...ExtensionKit()].filter((e): e is AnyExtension => e !== undefined),
      editorProps: {
        attributes: {
          autocomplete: "off",
          autocorrect: "off",
          autocapitalize: "off",
          class: "px-3 py-2 focus:outline-none min-h-72",
        },
      },
    },
    [],
  )
  const users = useEditorState({
    editor,
    selector: (ctx): (EditorUser & { initials: string })[] => {
      if (!ctx.editor?.storage.collaborationCursor?.users) {
        return []
      }

      return ctx.editor.storage.collaborationCursor.users.map((user: EditorUser) => {
        const names = user.name?.split(" ")
        const firstName = names?.[0]
        const lastName = names?.[names.length - 1]
        const initials = `${firstName?.[0] || "?"}${lastName?.[0] || "?"}`

        return { ...user, initials: initials.length ? initials : "?" }
      })
    },
    equalityFn: deepEqual,
  })

  window.editor = editor

  return { editor, users }
}
