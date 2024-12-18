import { z } from "zod"

export const selectTicketSchema = z.object({
  id: z.string().cuid2(),
  title: z.string().min(1).max(60),
  salesId: z.string().uuid(),
  productId: z.number(),
  issueType: z.enum(["sales", "product", "other"]).default("other"),
  description: z.string(),
  status: z.enum(["open", "in-progress", "resolved", "closed"]).default("open"),
  priority: z.enum(["low", "medium", "high", "critical"]).nullable().default(null),
  createdBy: z.string().uuid(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export const insertTicketSchema = selectTicketSchema.partial({
  id: true,
  salesId: true,
  productId: true,
  issueType: true,
  description: true,
  status: true,
  priority: true,
  createdAt: true,
  updatedAt: true,
})

export type Ticket = z.infer<typeof selectTicketSchema>
