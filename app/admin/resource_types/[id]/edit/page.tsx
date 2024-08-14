"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { z } from "zod"
import PageHeader from "@/components/ui/PageHeader"
import { Button } from "@/components/ui/button"
import { resourceTypes } from "@/app/lib/placeholder-data"
import ResourceTypeForm, { resourceTypeFormSchema } from "../../ResourceTypeForm"

export default function EditResourceTypePage({ params }: { params: { id: string } }) {
  const onEditResourceType = (values: z.infer<typeof resourceTypeFormSchema>) => {
    console.log(values)
  }

  const defaultValues = resourceTypes.find(resourceType => resourceType.id === parseInt(params.id))

  return (
    <div className="mx-auto flex w-96 flex-col items-center justify-center gap-y-3">
      <PageHeader className="mb-6 flex justify-between gap-x-2">
        <h1 className="mx-auto">Edit Resource Type</h1>
      </PageHeader>
      <Link href="/admin/resource_types" className="mr-auto">
        <Button variant="outline" size="icon"><ArrowLeft /></Button>
      </Link>
      <ResourceTypeForm defaultValues={defaultValues} onSubmit={onEditResourceType}  />
    </div>
  )
}
