import { Hono } from "hono"
import { helpdeskApi } from "../config/api"
import { checkRoles } from "../middlewares/auth.middleware"

export const ticket = new Hono()

ticket
  .get("/", checkRoles(["admin"]), async (c) => {
    const data = await helpdeskApi.get("tickets").json<Record<string, unknown>>()
    return c.json(data)
  })
  .post(checkRoles(["admin", "user"]), async (c) => {
    const body = await c.req.json()
    const data = await helpdeskApi.post("tickets", { json: body }).json<Record<string, unknown>>()
    return c.json(data)
  })

ticket
  .get("/:id", checkRoles(["admin", "user"]), async (c) => {
    const id = c.req.param("id")
    const data = await helpdeskApi.get(`tickets/${id}`).json<Record<string, unknown>>()
    return c.json(data)
  })
  .put(checkRoles(["admin"]), async (c) => {
    const id = c.req.param("id")
    const body = await c.req.json()
    const data = await helpdeskApi.put(`tickets/${id}`, { json: body }).json<Record<string, unknown>>()
    return c.json(data)
  })
  .delete(checkRoles(["admin"]), async (c) => {
    const id = c.req.param("id")
    const data = await helpdeskApi.delete(`tickets/${id}`).json<Record<string, unknown>>()
    return c.json(data)
  })
