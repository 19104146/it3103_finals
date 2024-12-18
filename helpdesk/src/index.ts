import { Hono } from "hono"
import { logger } from "hono/logger"
import { trimTrailingSlash } from "hono/trailing-slash"
import { ticket } from "./routes/ticket.route"

const app = new Hono()

app.use(logger())
app.use(trimTrailingSlash())

app.route("/tickets", ticket)

export default app
