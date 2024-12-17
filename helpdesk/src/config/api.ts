import ky from "ky"
import { env } from "./env.js"

export const crmApi = ky.create({
  prefixUrl: env.CRM_API_URL,
  headers: {
    Authorization: `Bearer ${env.CRM_API_KEY}`,
  },
})

export const imsApi = ky.create({
  prefixUrl: env.IMS_API_URL,
  headers: {
    Authorization: `Bearer ${env.IMS_API_KEY}`,
  },
})

export const idpApi = ky.create({
  prefixUrl: env.IDP_API_URL,
  headers: {
    Authorization: `Bearer ${env.IDP_API_KEY}`,
  },
})
