import { Hono } from "hono"
import { jwt } from "hono/jwt"
import { logger } from "hono/logger"
import { trimTrailingSlash } from "hono/trailing-slash"
import { env } from "./config/env"
import { auth } from "./routes/auth.route"
import { ticket } from "./routes/ticket.route"

const app = new Hono()

app.use(logger())
app.use(trimTrailingSlash())
app.use("*", (c, next) => {
  const path = c.req.path
  if (path === "/register" || path === "/login") return next()
  return jwt({ secret: env.JWT_SECRET! })(c, next)
})

app.route("/", auth)
// app.route("/customers", customer)
// app.route("/sales", sale)
// app.route("/stocks", stock)
app.route("/tickets", ticket)

export default {
  port: 8000,
  fetch: app.fetch,
}
