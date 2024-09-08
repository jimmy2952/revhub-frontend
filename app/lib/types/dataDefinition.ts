export interface Resource {
  id: number
  name: string
  description: string
  resourceUrl: string
  imageUrl?: string
  resourceType: string
  resourceTypeId: number
  tags?: ResourceTag[],
  createdAt: Date
  updatedAt: Date
}

export interface ResourceTag {
  id: number
  name: string
}

