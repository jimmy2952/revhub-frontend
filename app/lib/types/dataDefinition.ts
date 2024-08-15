export interface Resource {
  id: number
  name: string
  description: string
  resourceUrl: string
  imageUrl?: string
  resourceType: string
  createdAt: Date
  updatedAt: Date
}

export interface ResourceType {
  id: number
  name: string
  createdAt: Date
  updatedAt: Date
}

