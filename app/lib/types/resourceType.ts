export interface ResourceType {
  id: number
  name: string
  createdAt: Date
  updatedAt: Date
}

export interface CreateResourceTypeInput {
  name: string
}
