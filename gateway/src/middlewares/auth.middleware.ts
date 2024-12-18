import type { Context, Next } from "hono"

export const checkRoles = (requiredRoles: string[]) => {
  return async (c: Context, next: Next) => {
    const payload = c.get("jwtPayload")
    const userRole = payload.role

    if (!requiredRoles.includes(userRole)) {
      return c.json({ message: "Forbidden" }, 403)
    }

    await next()
  }
}
