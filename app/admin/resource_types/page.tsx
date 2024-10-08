"use client"

import Link from "next/link"
import { format } from "date-fns"
import { Plus } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { useDialogContext, DIALOG_TYPE } from "@/app/lib/context/DialogContext"
import { DeleteResourceType, fetchResourceTypes } from "@/app/lib/request"
import { ResourceType } from "@/app/lib/types/resourceType"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import PageHeader from "@/components/ui/PageHeader"
import { Button } from "@/components/ui/button"
// import { resourceTypes } from "@/app/lib/placeholder-data"

export default function ResourceTypesIndex() {
  const { openDialog } = useDialogContext()
  const { toast } = useToast()
  const queryClient = useQueryClient()

  const { data: resourceTypes = [] } = useQuery({
    queryKey: ["admin", "resource-types"],
    queryFn: fetchResourceTypes
  })

  const { mutateAsync } = useMutation({
    mutationFn: (id: string) => DeleteResourceType({ id })
  })

  const onResourceTypeDelete = async (id: number) => {
    await mutateAsync(String(id))
    queryClient.setQueryData(["admin", "resource-types"], (prev: ResourceType[]) => prev.filter((p) => p.id !== id))
    toast({
      title: "Resource type was deleted successfully",
      description: `id: ${id}`,
    })
  }

  const confirmDelete = (id: number) => {
    openDialog({
      type: DIALOG_TYPE.CONFIRM,
      dialogProps: {
        title: "Are you sure?",
        description: `Resource id: ${id} will be deleted`,
        onConfirm: () => { onResourceTypeDelete(id) },
      },
    })
  }

  return (
    <div className="flex size-full flex-col items-center justify-center">
      <PageHeader className="flex gap-x-4">
        <h1>Resource Types</h1>
        <Link href="/admin/resource_types/new">
          <Button variant="outline" size="icon">
            <Plus />
          </Button>
        </Link>
      </PageHeader>
      <Table>
        <TableCaption>Resource Types</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>id</TableHead>
            <TableHead>Name</TableHead>
            <TableHead className="text-center">Created At</TableHead>
            <TableHead className="text-center">Updated At</TableHead>
            <TableHead className="text-center">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {resourceTypes.map((resourceType) => (
            <TableRow key={resourceType.id}>
              <TableCell>{resourceType.id}</TableCell>
              <TableCell>{resourceType.name}</TableCell>
              <TableCell className="text-center">
                {format(resourceType.createdAt, "yyyy-MM-dd hh:mm z")}
              </TableCell>
              <TableCell className="text-center">
                {format(resourceType.updatedAt, "yyyy-MM-dd hh:mm z")}
              </TableCell>
              <TableCell className="flex justify-center gap-x-2">
                <Link href={`/admin/resource_types/${resourceType.id}/edit`}>
                  <Button>Edit</Button>
                </Link>
                <Button onClick={() => { confirmDelete(resourceType.id)}} variant="destructive">Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}