import { eq } from "drizzle-orm"
import { FastifyInstance } from "fastify"
import { crmApi, imsApi } from "../config/api.js"
import { db } from "../db/index.js"
import { tickets } from "../db/schema.js"
import { Ticket, ticketSchema } from "../types/ticket.js"

async function validateTicket(ticket: Omit<Ticket, "id" | "createdAt" | "updatedAt">) {
  const customerResponse = await crmApi.get(`/legacy/Api/V8/module/Accounts/${ticket.createdBy}`)
  if (!customerResponse.ok) {
    return new Error("Customer does not exist")
  }

  if (ticket.orderId) {
    const orderResponse = await crmApi.get(`/legacy/Api/V8/module/Quotes/${ticket.orderId}`)
    if (!orderResponse.ok) {
      return new Error("Order does not exist")
    }
    ticket.issueType = "order"
  } else if (ticket.productId) {
    const productResponse = await imsApi.get(`/hardware/${ticket.productId}`)
    if (!productResponse.ok) {
      return new Error("Product does not exist")
    }
    ticket.issueType = "product"
  }

  return null
}

export async function ticketRoutes(fastify: FastifyInstance) {
  fastify.get("/", async () => await db.query.tickets.findMany())

  fastify.post("/", async (request, response) => {
    try {
      const ticket = ticketSchema.omit({ id: true, createdAt: true, updatedAt: true }).parse(request.body)
      const ticketError = await validateTicket(ticket)
      if (ticketError) {
        return response.notFound(ticketError.message)
      }

      return (await db.insert(tickets).values(ticket).returning())[0]
    } catch (error) {
      return response.internalServerError(error instanceof Error ? error.message : "Invalid ticket data")
    }
  })

  fastify.get("/:id", async (request, response) => {
    const { id } = request.params as { id: string }

    try {
      const ticket = await db.query.tickets.findFirst({
        where: (tickets, { eq }) => eq(tickets.id, id),
      })

      if (!ticket) {
        return response.notFound("Ticket does not exist")
      }

      return ticket
    } catch (error) {
      return response.internalServerError(error instanceof Error ? error.message : "Invalid ticket data")
    }
  })

  fastify.put("/:id", async (request, response) => {
    const { id } = request.params as { id: string }

    try {
      const updateData = ticketSchema.partial().parse(request.body)
      const updatedTicket = await db.update(tickets).set(updateData).where(eq(tickets.id, id)).returning()
      if (updatedTicket.length === 0) {
        return response.notFound("Ticket does not exist")
      }

      return updatedTicket[0]
    } catch (error) {
      return response.internalServerError(error instanceof Error ? error.message : "Invalid ticket data")
    }
  })

  fastify.delete("/:id", async (request, response) => {
    const { id } = request.params as { id: string }

    try {
      const deletedTicket = await db.delete(tickets).where(eq(tickets.id, id)).returning()
      if (deletedTicket.length === 0) {
        return response.notFound("Ticket does not exist")
      }

      return { message: "Ticket deleted successfully" }
    } catch (error) {
      return response.internalServerError(error instanceof Error ? error.message : "Invalid ticket data")
    }
  })
}
