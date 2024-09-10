import axios from "axios"
import { ResourceType, CreateResourceTypeInput, UpdateResourceTypeInput } from "./types/resourceType"
import { Resource, CreateResourceInput, UpdateResourceInput } from "./types/resource"

const host = process.env.NEXT_PUBLIC_API_HOST

const axiosInstance = axios.create({
  baseURL: host
})

// resource-types
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

// resources
export const fetchResources = (): Promise<Resource[]> => {
  return axiosInstance.get("/admin/resources").then((res) => res.data)
}

export const fetchResource = ({ id }: { id: string }): Promise<Resource> => {
  return axiosInstance.get(`/admin/resources/${id}`).then((res) => res.data)
}

export const createResource = (data: CreateResourceInput): Promise<Resource> => {
  return axiosInstance.post("/admin/resources", data).then((res) => res.data)
}

export const updateResource = (id: string, data: UpdateResourceInput): Promise<Resource> => {
  return axiosInstance.put(`/admin/resources/${id}`, data).then((res) => res.data)
}

export const DeleteResource = ({ id }: { id: string }): Promise<Resource> => {
  return axiosInstance.delete(`/admin/resources/${id}`).then((res) => res.data)
}
