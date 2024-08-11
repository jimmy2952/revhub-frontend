"use client"

import Link from "next/link"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import PageHeader from "@/components/ui/PageHeader"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

const formSchema = z.object({
  name: z.string().min(2).max(50),
})

export default function NewResourceType() {
  const resourceTypeForm = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    }
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
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
      <Form {...resourceTypeForm}>
        <form onSubmit={resourceTypeForm.handleSubmit(onSubmit)} className="w-96 space-y-8">
          <FormField
            control={resourceTypeForm.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  )
}