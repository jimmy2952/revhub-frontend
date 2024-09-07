import { useEffect } from "react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

export const resourceTypeFormSchema = z.object({
  name: z.string().min(2).max(50),
})

interface ResourceTypeFormProps {
  defaultValues?: z.infer<typeof resourceTypeFormSchema>,
  onSubmit: (_values: z.infer<typeof resourceTypeFormSchema>) => void
}

const initialValues = {
  name: ""
}

export default function ResourceTypeForm({ defaultValues, onSubmit }: ResourceTypeFormProps) {
  const resourceTypeForm = useForm<z.infer<typeof resourceTypeFormSchema>>({
    resolver: zodResolver(resourceTypeFormSchema),
    defaultValues: defaultValues || initialValues,
  })

  useEffect(() => {
    if (defaultValues !== undefined) {
      resourceTypeForm.reset(defaultValues)
    }
  }, [resourceTypeForm, defaultValues])

  return (
    <Form {...resourceTypeForm}>
      <form onSubmit={resourceTypeForm.handleSubmit(onSubmit)} className="w-full space-y-8">
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
  )
}
