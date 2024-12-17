import { createSelectSchema } from "drizzle-zod"
import { z } from "zod"
import { tickets } from "../db/schema.js"

export const ticketSchema = createSelectSchema(tickets)

export type Ticket = z.infer<typeof ticketSchema>
