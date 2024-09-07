import axios from "axios"
import { ResourceType, CreateResourceTypeInput } from "./types/resourceType"

const host = process.env.NEXT_PUBLIC_API_HOST

const axiosInstance = axios.create({
  baseURL: host
})

export const fetchResourceTypes = (): Promise<{ data: ResourceType[] }> => {
  return axiosInstance.get("/admin/resource-types")
}

export const fetchResourceType = ({ id }: { id: string}): Promise<{ data: ResourceType }> => {
  return axiosInstance.get(`/admin/resource-types/${id}`)
}

export const createResourceType = (data: CreateResourceTypeInput) => {
  return axiosInstance.post("/admin/resource-types", data)
}
