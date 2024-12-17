import z from "zod"

const envSchema = z.object({
  CRM_API_URL: z.string().url(),
  CRM_API_KEY: z.string(),
  IMS_API_URL: z.string().url(),
  IMS_API_KEY: z.string(),
  IDP_API_URL: z.string().url(),
  IDP_API_KEY: z.string(),
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
})

export const env = envSchema.parse(process.env)
