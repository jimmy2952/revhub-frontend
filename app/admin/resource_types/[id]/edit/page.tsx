"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { z } from "zod"
import { useToast } from "@/hooks/use-toast"
import { useMutation, useQuery } from "@tanstack/react-query"
import { fetchResourceType, updateResourceType } from "@/app/lib/request"
import PageHeader from "@/components/ui/PageHeader"
import { Button } from "@/components/ui/button"
import ResourceTypeForm, { resourceTypeFormSchema } from "../../ResourceTypeForm"

export default function EditResourceTypePage({ params: { id } }: { params: { id: string } }) {
  const { toast } = useToast()
  const router = useRouter()

  const { data: defaultValues } = useQuery({
    queryKey: ["admin", "resource-type", id],
    queryFn: () => fetchResourceType({ id })
  })
  const { mutateAsync: mutateUpdateResourceType } = useMutation({
    mutationFn: (data: z.infer<typeof resourceTypeFormSchema>) => updateResourceType(id, data)
  })

  const onEditResourceType = async (values: z.infer<typeof resourceTypeFormSchema>) => {
    const { name } = await mutateUpdateResourceType(values)
    router.push("/admin/resource_types")
    toast({
      title: "Resource type was updated successfully",
      description: `id: ${id}, name: ${name}`,
    })
  }

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
