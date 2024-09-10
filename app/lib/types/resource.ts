export interface Resource {
  id: number
  name: string
  description: string
  resourceUrl: string
  imageUrl?: string
  resourceType: string
  resourceTypeId: string
  tags?: ResourceTag[],
  createdAt: Date
  updatedAt: Date
}

export interface CreateResourceInput {
  name: string
  description: string
  resourceUrl: string
  imageUrl?: string
  resourceTypeId: string
  tags?: ResourceTag[],
}

export interface UpdateResourceInput {
  id: number
  name: string
  description: string
  resourceUrl: string
  imageUrl?: string
  resourceTypeId: string
  tags?: ResourceTag[],
}

export interface ResourceTag {
  id: number
  name: string
}
