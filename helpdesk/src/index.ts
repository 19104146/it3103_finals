import sensible from "@fastify/sensible"
import fastify from "fastify"
import { env } from "./config/env.js"
import { ticketRoutes } from "./routes/tickets.js"

const server = fastify({ logger: true })

server.register(sensible)
server.register(ticketRoutes, { prefix: "/tickets" })

server.listen(
  {
    port: 3000,
    host: env.NODE_ENV === "production" ? "0.0.0.0" : "localhost",
  },
  (error, address) => {
    if (error) {
      console.error(error)
      process.exit(1)
    }

    console.log(`Server listening at ${address}`)
  },
)
