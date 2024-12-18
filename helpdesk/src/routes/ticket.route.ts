import { eq } from "drizzle-orm"
import { Hono } from "hono"
import { crmApi, imsApi } from "../config/api"
import { db } from "../db"
import { tickets } from "../db/schema"
import { insertTicketSchema } from "../types/ticket.type"

export const ticket = new Hono()

ticket
  .get("/", async (c) => c.json(await db.query.tickets.findMany()))
  .post("/", async (c) => {
    try {
      const body = await c.req.json()
      const data = insertTicketSchema.parse(body)

      await crmApi.get(`legacy/Api/V8/module/Accounts/${data.createdBy}`).json()

      if (data.salesId) {
        await crmApi.get(`legacy/Api/V8/module/Quotes/${data.salesId}`).json()
        data.issueType = "sales"
      } else if (data.productId) {
        await imsApi.get(`hardware/${data.productId}`).json()
        data.issueType = "product"
      }

      return c.json((await db.insert(tickets).values(data).returning())[0], { status: 201 })
    } catch (error) {
      return c.json({ message: error instanceof Error ? error.message : "Something went wrong" }, { status: 500 })
    }
  })

ticket
  .get("/:id", async (c) => {
    const id = c.req.param("id")

    try {
      const ticket = await db.query.tickets.findFirst({
        where: (tickets, { eq }) => eq(tickets.id, id),
      })

      if (!ticket) return c.json({ message: "Ticket not found" }, { status: 404 })
      return c.json(ticket)
    } catch (error) {
      return c.json({ message: error instanceof Error ? error.message : "Something went wrong" }, { status: 500 })
    }
  })
  .put(async (c) => {
    const id = c.req.param("id")

    try {
      const data = insertTicketSchema.partial().parse(c.body)
      const updatedTicket = await db.update(tickets).set(data).where(eq(tickets.id, id)).returning()
      if (updatedTicket.length === 0) return c.json({ message: "Ticket not found" }, { status: 404 })
      return c.json(updatedTicket[0])
    } catch (error) {
      return c.json({ message: error instanceof Error ? error.message : "Something went wrong" }, { status: 500 })
    }
  })
  .delete(async (c) => {
    const id = c.req.param("id")

    try {
      const deletedTicket = await db.delete(tickets).where(eq(tickets.id, id)).returning()
      if (deletedTicket.length === 0) return c.json({ message: "Ticket does not exist" }, { status: 404 })
      return c.json({ message: "Ticket deleted successfully" }, { status: 204 })
    } catch (error) {
      return c.json({ message: error instanceof Error ? error.message : "Something went wrong" }, { status: 500 })
    }
  })
