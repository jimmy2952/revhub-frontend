"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { z } from "zod"
import { useMutation } from "@tanstack/react-query"
import { createResource } from "@/app/lib/request"
import { CreateResourceInput } from "@/app/lib/types/resource"
import PageHeader from "@/components/ui/PageHeader"
import { Button } from "@/components/ui/button"
import ResourceForm, { resourceFormSchema } from "../components/ResourceForm"

export default function CreateResourcePage() {
  const { mutateAsync: mutateCreateResource } = useMutation({
    mutationFn: (values: CreateResourceInput) => createResource(values)
  })
  const onCreateResource = (values: z.infer<typeof resourceFormSchema>) => {
    const { tags, ...otherFields } = values
    mutateCreateResource(otherFields)
    console.log(tags)
  }

  return (
    <div className="mx-auto flex w-1/2 flex-col items-center justify-center gap-y-3">
      <PageHeader className="mb-6 flex justify-between gap-x-2">
        <h1 className="mx-auto">Create New Resource</h1>
      </PageHeader>
      <Link href="/admin/resources" className="mr-auto">
        <Button variant="outline" size="icon"><ArrowLeft /></Button>
      </Link>
      <ResourceForm onSubmit={onCreateResource} />
    </div>
  )
}
