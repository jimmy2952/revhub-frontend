import { useRef, ChangeEvent } from "react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { useQuery } from "@tanstack/react-query"
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import MultipleSelect from "@/components/ui/multiple-select"
import { Textarea } from "@/components/ui/textarea"
import { resourceTags } from "@/app/lib/placeholder-data"
import { ResourceType } from "@/app/lib/types/resourceType"
import { fetchResourceTypes } from "@/app/lib/request"

export const resourceFormSchema = z.object({
  name: z.string().min(2).max(50),
  description: z.string().min(2).max(50),
  resourceUrl: z.string(),
  imageUrl: z.string().optional(),
  resourceTypeId: z.string(),
  tags: z.array(z.object({
    label: z.string(),
    value: z.string(),
  })).optional(),
})

interface ResourceTypeFormProps {
  defaultValues?: z.infer<typeof resourceFormSchema>,
  onSubmit: (_values: z.infer<typeof resourceFormSchema>) => void
}

const initialValues = {
  name: "",
  description: "",
  resourceUrl: "",
  imageUrl: "",
  resourceTypeId: "",
  tags: [],
}

export default function ResourceForm({ defaultValues = initialValues, onSubmit }: ResourceTypeFormProps) {
  const imageInputRef = useRef<HTMLInputElement>(null)

  const { data: resourceTypes = [] } = useQuery({
    queryKey: ["admin", "resource-types"],
    queryFn: fetchResourceTypes
  })

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // resourceForm.setValue("imageUrl", URL.createObjectURL(file))
      console.log(file)
    }
  }
  const resourceForm = useForm<z.infer<typeof resourceFormSchema>>({
    resolver: zodResolver(resourceFormSchema),
    defaultValues: defaultValues
  })

  const formattedDefaultTags = resourceTags.map((tag) => {
    return {
      label: tag.name,
      value: tag.id.toString()
    }
  })

  // const defaultTags = formattedDefaultTags.filter((tag) => defaultValues.tags?.includes(tag.name))

  return (
    <Form {...resourceForm}>
      <form onSubmit={resourceForm.handleSubmit(onSubmit)} className="w-full space-y-8">
        <FormField
          control={resourceForm.control}
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
        <FormField
          control={resourceForm.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="description"
                  className="h-80"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={resourceForm.control}
          name="resourceUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Resource URL</FormLabel>
              <FormControl>
                <Input placeholder="resource url" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={resourceForm.control}
          name="imageUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image URL</FormLabel>
              <FormControl>
                <Input placeholder="image url" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Handle Image Upload */}
        <Button
          type="button"
          onClick={() => imageInputRef.current?.click()}
        >
          Upload Image
        </Button>
        <input
          type="file"
          className="hidden"
          accept="image/*"
          ref={imageInputRef}
          onChange={handleImageChange}
        />

        <FormField
          control={resourceForm.control}
          name="resourceTypeId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Resource Type</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value.toString()}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Resource Type" />
                  </SelectTrigger>
                  <SelectContent>
                    {resourceTypes.map((resourceType: ResourceType) => (
                      <SelectItem
                        value={resourceType.id.toString()}
                        key={resourceType.id}
                      >
                        {resourceType.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={resourceForm.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tags</FormLabel>
              <FormControl>
                <MultipleSelect
                  defaultOptions={formattedDefaultTags}
                  placeholder="Select tags..."
                  emptyIndicator={
                    <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                      no results found.
                    </p>
                  }
                  onChange={field.onChange}
                  value={field.value}
                />
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
