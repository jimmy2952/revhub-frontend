import axios from "axios"
import { ResourceType, CreateResourceTypeInput, UpdateResourceTypeInput } from "./types/resourceType"

const host = process.env.NEXT_PUBLIC_API_HOST

const axiosInstance = axios.create({
  baseURL: host
})

export const fetchResourceTypes = (): Promise<ResourceType[]> => {
  return axiosInstance.get("/admin/resource-types").then((res) => res.data)
}

export const fetchResourceType = ({ id }: { id: string }): Promise<ResourceType> => {
  return axiosInstance.get(`/admin/resource-types/${id}`).then((res) => res.data)
}

export const createResourceType = (data: CreateResourceTypeInput): Promise<ResourceType> => {
  return axiosInstance.post("/admin/resource-types", data).then((res) => res.data)
}

export const updateResourceType = (id: string, data: UpdateResourceTypeInput): Promise<ResourceType> => {
  return axiosInstance.put(`/admin/resource-types/${id}`, data).then((res) => res.data)
}

export const DeleteResourceType = ({ id }: { id: string }): Promise<ResourceType> => {
  return axiosInstance.delete(`/admin/resource-types/${id}`).then((res) => res.data)
}
