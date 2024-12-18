import { Hono } from "hono"
import { imsApi } from "../config/api"
import { checkRoles } from "../middlewares/auth.middleware"

export const stock = new Hono()

stock.use(checkRoles(["admin"]))

stock
  .get("/", async (c) => {
    const data = await imsApi.get("hardware").json<Record<string, unknown>>()
    return c.json(data)
  })
  .post(async (c) => {
    const body = await c.req.json()
    const data = await imsApi.post("hardware", { json: body }).json<Record<string, unknown>>()
    return c.json(data)
  })

stock
  .get("/:id", async (c) => {
    const id = c.req.param("id")
    const data = await imsApi.post(`hardware/${id}`).json<Record<string, unknown>>()
    return c.json(data)
  })
  .patch("/:id", async (c) => {
    const id = c.req.param("id")
    const body = await c.res.json()
    const data = await imsApi.post(`hardware/${id}`, { json: body }).json<Record<string, unknown>>()
    return c.json(data)
  })
  .delete("/:id", async (c) => {
    const id = c.req.param("id")
    const data = await imsApi.post(`hardware/${id}`).json<Record<string, unknown>>()
    return c.json(data)
  })
