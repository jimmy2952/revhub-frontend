"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { z } from "zod"
import { useToast } from "@/hooks/use-toast"
import { useMutation } from "@tanstack/react-query"
import { createResourceType } from "@/app/lib/request"
import PageHeader from "@/components/ui/PageHeader"
import { Button } from "@/components/ui/button"
import ResourceTypeForm, { resourceTypeFormSchema } from "../ResourceTypeForm"

export default function NewResourceTypePage() {
  const { toast } = useToast()
  const router = useRouter()

  const { mutateAsync: mutateCreateResourceType, isPending } = useMutation({
    mutationFn: (values: z.infer<typeof resourceTypeFormSchema>) => createResourceType(values)
  })

  const onCreateResourceType = async (values: z.infer<typeof resourceTypeFormSchema>) => {
    const { id, name } = await mutateCreateResourceType(values)
    router.push("/admin/resource_types")
    toast({
      title: "Resource type was created successfully",
      description: `id: ${id}, name: ${name}`,
    })
  }

  return (
    <div className="mx-auto flex w-96 flex-col items-center justify-center gap-y-3">
      <PageHeader className="mb-6 flex justify-between gap-x-2">
        <h1 className="mx-auto">Create New Resource Type</h1>
      </PageHeader>
      <Link href="/admin/resource_types" className="mr-auto">
        <Button variant="outline" size="icon"><ArrowLeft /></Button>
      </Link>
      <ResourceTypeForm onSubmit={onCreateResourceType} isSubmitting={isPending} />
    </div>
  )
}
