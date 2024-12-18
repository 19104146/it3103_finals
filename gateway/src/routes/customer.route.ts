import { Hono } from "hono"
import { crmApi } from "../config/api"
import { checkRoles } from "../middlewares/auth.middleware"

export const customer = new Hono()

customer.use(checkRoles(["admin"]))

customer
  .get("/", async (c) => {
    const data = await crmApi.get("legacy/Api/V8/module/Accounts").json<Record<string, unknown>>()
    return c.json(data)
  })
  .post(async (c) => {
    const body = {
      data: {
        type: "Accounts",
        attributes: await c.req.json(),
      },
    }

    const data = await crmApi.post("legacy/Api/V8/module", { json: body }).json<Record<string, unknown>>()
    return c.json(data)
  })

customer
  .get("/:id", async (c) => {
    const id = c.req.param("id")
    const data = await crmApi.get(`legacy/Api/V8/module/Accounts/${id}`).json<Record<string, unknown>>()
    return c.json(data)
  })
  .patch(async (c) => {
    const id = c.req.param("id")
    const body = {
      data: {
        type: "Accounts",
        id,
        attributes: await c.req.json(),
      },
    }

    const data = await crmApi.patch("legacy/Api/V8/module", { json: body }).json<Record<string, unknown>>()
    return c.json(data)
  })
  .delete(async (c) => {
    const id = c.req.param("id")
    const data = await crmApi.delete(`legacy/Api/V8/module/Accounts/${id}`).json<Record<string, unknown>>()
    return c.json(data)
  })
