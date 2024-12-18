import { compare, hash } from "bcryptjs"
import { Hono } from "hono"
import { sign } from "hono/jwt"
import { env } from "../config/env"
import { db } from "../db"
import { users } from "../db/schema"
import { insertUserSchema } from "../types/user.type"

export const auth = new Hono()

auth.post("/register", async (c) => {
  try {
    const body = await c.req.json()
    const { name, email, password } = insertUserSchema.parse(body)
    const existingEmail = await db.query.users.findFirst({
      where: (users, { eq }) => eq(users.email, email),
    })

    if (existingEmail) return c.json({ message: "Email already taken" }, 409)

    const passwordHash = await hash(password, 10)
    const rows = await db
      .insert(users)
      .values({
        name,
        email,
        passwordHash,
      })
      .returning()

    if (rows.length === 0) return c.json({ message: "Failed to insert new user" }, 500)

    return c.json({ message: "User registered sucessfully" }, 201)
  } catch (error) {
    return c.json({ message: error instanceof Error ? error.message : "Something went wrong" }, 500)
  }
})

auth.post("/login", async (c) => {
  const body = await c.req.json()
  const { email, password } = insertUserSchema.omit({ name: true }).parse(body)
  const existingUser = await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.email, email),
  })

  if (!existingUser) return c.json({ message: "Invalid credentials" }, 401)

  const isPasswordValid = compare(password, existingUser.passwordHash)
  if (!isPasswordValid) return c.json({ message: "Invalid credentials" }, 401)

  const token = await sign(
    {
      id: existingUser.id,
      name: existingUser.name,
      email: existingUser.email,
      role: existingUser.role,
    },
    env.JWT_SECRET,
  )

  return c.json({ message: "User logged in sucessfully", token })
})
