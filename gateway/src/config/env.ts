import { z } from "zod"

const envSchema = z.object({
  CRM_API_URL: z.string().url(),
  CRM_API_KEY: z.string(),
  IMS_API_URL: z.string().url(),
  IMS_API_KEY: z.string(),
  HELPDESK_API_URL: z.string().url(),
  JWT_SECRET: z.string(),
})

export const env = envSchema.parse(process.env)
