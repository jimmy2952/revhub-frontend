"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { z } from "zod"
import PageHeader from "@/components/ui/PageHeader"
import { Button } from "@/components/ui/button"
import ResourceTypeForm, { resourceTypeFormSchema } from "../ResourceTypeForm"

export default function NewResourceTypePage() {
  const onCreateResourceType = (values: z.infer<typeof resourceTypeFormSchema>) => {
    console.log(values)
  }

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <PageHeader className="mb-6 flex justify-between gap-x-2">
        <Link href="/admin/resource_types">
          <Button variant="outline" size="icon"><ArrowLeft /></Button>
        </Link>
        <h1>Create New Resource Type</h1>
      </PageHeader>
      <ResourceTypeForm onSubmit={onCreateResourceType} />
    </div>
  )
}
