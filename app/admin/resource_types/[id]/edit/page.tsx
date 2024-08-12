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
    <div className="flex h-screen flex-col items-center justify-center">
      <PageHeader className="mb-6 flex justify-between gap-x-2">
        <Link href="/admin/resource_types">
          <Button variant="outline" size="icon"><ArrowLeft /></Button>
        </Link>
        <h1>Edit Resource Type</h1>
      </PageHeader>
      <ResourceTypeForm defaultValues={defaultValues} onSubmit={onEditResourceType} />
    </div>
  )
}
