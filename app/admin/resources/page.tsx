import PageHeader from "@/components/ui/PageHeader"
import Link from "next/link"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { resources } from "@/app/lib/placeholder-data"
import ResourceTable from "./components/ResourceTable"

export default function Resources() {
  return (
    <div className="flex size-full flex-col items-center justify-center">
      <PageHeader className="flex gap-x-4">
        <h1>Resources</h1>
        <Link href="/admin/resources/new">
          <Button variant="outline" size="icon">
            <Plus />
          </Button>
        </Link>
      </PageHeader>
      <ResourceTable data={resources} />
    </div>
  )
}
