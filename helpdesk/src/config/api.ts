import ky from "ky"
import { env } from "./env"

export const crmApi = ky.create({
  prefixUrl: env.CRM_API_URL,
  headers: {
    Authorization: `Bearer ${env.CRM_API_KEY}`,
  },
  retry: {
    limit: 0,
  },
})

export const imsApi = ky.create({
  prefixUrl: env.IMS_API_URL,
  headers: {
    Authorization: `Bearer ${env.IMS_API_KEY}`,
  },
  retry: {
    limit: 0,
  },
})
