"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { z } from "zod"
import PageHeader from "@/components/ui/PageHeader"
import { Button } from "@/components/ui/button"
import { resources } from "@/app/lib/placeholder-data"
import { Resource } from "@/app/lib/types/resource"
import ResourceForm, { resourceFormSchema } from "../../components/ResourceForm"

const formatToFormData = (resource: Resource | undefined) => {
  if (!resource) return undefined
  return {
    ...resource,
    resourceTypeId: resource.resourceTypeId.toString(),
    tags: resource.tags?.map(tag => ({ value: tag.id.toString(), label: tag.name }))
  }
}

export default function EditResourcePage({ params }: { params: { id: string } }) {
  const onEditResource = (values: z.infer<typeof resourceFormSchema>) => {
    console.log(values)
  }

  const resource = resources.find(resource => resource.id === parseInt(params.id))

  return (
    <div className="mx-auto flex w-1/2 flex-col items-center justify-center gap-y-3">
      <PageHeader className="mb-6 flex justify-between gap-x-2">
        <h1 className="mx-auto">Edit Resource</h1>
      </PageHeader>
      <Link href="/admin/resources" className="mr-auto">
        <Button variant="outline" size="icon"><ArrowLeft /></Button>
      </Link>
      <ResourceForm
        defaultValues={formatToFormData(resource)}
        onSubmit={onEditResource}
      />
    </div>
  )
}
