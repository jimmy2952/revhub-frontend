"use client"

import Link from "next/link"
import Image from "next/image"
import { format } from "date-fns"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { ColumnDef, Row } from "@tanstack/react-table"
import { Resource } from "@/app/lib/types/dataDefinition"
import { useDialogContext, DIALOG_TYPE } from "@/app/lib/context/DialogContext"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import ResourceCard from "@/components/ui/ResourceCard"

const ResourceActionCell = ({ row }: { row: Row<Resource> }) => {
  const { openDialog } = useDialogContext()
  const onResourceDelete = (id: number) => {
    console.log(`Resource type id: ${id} will be deleted`)
  }

  const previewResourceCard = () => {
    openDialog({
      dialogProps: {
        title: "Preview Card",
        content: <ResourceCard resource={row.original} />,
      },
    })
  }

  const confirmDelete = () => {
    openDialog({
      type: DIALOG_TYPE.CONFIRM,
      dialogProps: {
        title: "Are you sure?",
        description: `Resource id: ${row.original.id} will be deleted`,
        onConfirm: () => { onResourceDelete(row.original.id) },
      },
    })
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="size-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem>
            <Link href={`/admin/resources/${row.original.id}/edit`} className="block w-full">Edit</Link>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={previewResourceCard}>
            Preview Card
          </DropdownMenuItem>
          <DropdownMenuItem onClick={confirmDelete}>
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}

export const resourceTableColumn: ColumnDef<Resource>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Id
          <ArrowUpDown className="ml-2 size-4" />
        </Button>
      )
    },
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("id")}</div>
    ),
  },
  {
    accessorKey: "imageUrl",
    header: "Image",
    cell: ({ row }) => (
      <div>
        {row.getValue("imageUrl") ? (
          <Image src={row.getValue("imageUrl")} alt="Resource Image" width={50} height={50} />
        ) : null}
      </div>
    ),
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <div>{row.getValue("name")}</div>
    ),
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => (
      <div className="line-clamp-2 max-w-[300px]">{row.getValue("description")}</div>
    ),
  },
  {
    accessorKey: "resourceUrl",
    header: "Resource Url",
    cell: ({ row }) => (
      <a href={row.getValue("resourceUrl")} target="_blank" className="text-blue-500">
        Link
      </a>
    ),
  },
  {
    accessorKey: "resourceType",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Resource Type
          <ArrowUpDown className="ml-2 size-4" />
        </Button>
      )
    },
    cell: ({ row }) => (
      <div>{row.getValue("resourceType")}</div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Created At
          <ArrowUpDown className="ml-2 size-4" />
        </Button>
      )
    },
    cell: ({ row }) => (
      <div>{format(row.getValue("createdAt"), "yyyy-MM-dd hh:mm z")}</div>
    ),
  },
  {
    accessorKey: "updatedAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Updated At
          <ArrowUpDown className="ml-2 size-4" />
        </Button>
      )
    },
    cell: ({ row }) => (
      <div>{format(row.getValue("updatedAt"), "yyyy-MM-dd hh:mm z")}</div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ResourceActionCell,
  },
]
