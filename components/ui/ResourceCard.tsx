import { Resource } from "@/app/lib/types/dataDefinition"
import Image from "next/image"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface ResourceCardProps {
  resource: Resource
  className?: string
}

export default function ResourceCard({ resource, className }: ResourceCardProps){
  return (
    <Card className={className}>
      <a href={resource.resourceUrl} target="_blank">
        <CardHeader>
          <CardTitle>{resource.name}</CardTitle>
          <CardDescription className="line-clamp-3">
            {resource.description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {resource.imageUrl ? (
            <Image
              src={resource.imageUrl}
              alt={resource.name}
              width={350}
              height={350}
            />
          ) : (
            <Skeleton className="h-[125px] w-full rounded-xl" />
          )}
        </CardContent>
      </a>
    </Card>
  )
}
