"use client"

import Link from "next/link"
import { format } from "date-fns"
import { Plus } from "lucide-react"
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
import ConfirmDialog from "@/components/ui/ConfirmDialog"
import { resourceTypes } from "@/app/lib/placeholder-data"

export default function ResourceTypesIndex() {

  const onResourceTypeDelete = (id: number) => {
    console.log(`Resource type id: ${id} will be deleted`)
  }

  return (
    <div className="mx-auto flex h-screen max-w-screen-xl flex-col items-center justify-center">
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
                <Button>Edit</Button>
                <ConfirmDialog
                  title="Are you sure?"
                  description={`Resource type id: ${resourceType.id} will be deleted`}
                  onConfirm={() => { onResourceTypeDelete(resourceType.id) }}
                >
                  <Button variant="destructive">Delete</Button>
                </ConfirmDialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}