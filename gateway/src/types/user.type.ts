import { z } from "zod"

export const selectUserSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1).trim(),
  email: z.string().email().min(1).trim(),
  passwordHash: z.string(),
  role: z.enum(["admin", "user"]),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export const insertUserSchema = selectUserSchema
  .omit({
    id: true,
    passwordHash: true,
    role: true,
    createdAt: true,
    updatedAt: true,
  })
  .extend({
    password: z.string(),
  })

export type User = z.infer<typeof selectUserSchema>
