import axios from "axios"
import { CreateResourceTypeInput } from "./types/resourceType"

const host = process.env.NEXT_PUBLIC_API_HOST

export const fetchResourceTypes = () => {
  return axios.get(`${host}/resource-types`)
}

export const createResourceType = (data: CreateResourceTypeInput) => {
  return axios.post(`${host}/resource-types`, data)
}
