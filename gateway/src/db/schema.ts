import { index, integer, sqliteTable, text } from "drizzle-orm/sqlite-core"
import { v4 as uuidv4 } from "uuid"

export const users = sqliteTable(
  "users",
  {
    id: text("id")
      .primaryKey()
      .$default(() => uuidv4()),
    name: text("name").notNull(),
    email: text("email").notNull().unique(),
    passwordHash: text("password_hash").notNull(),
    role: text("role", { enum: ["admin", "user"] })
      .default("user")
      .notNull(),
    createdAt: integer("created_at", { mode: "timestamp" }).default(new Date()).notNull(),
    updatedAt: integer("updated_at", { mode: "timestamp" }).$onUpdate(() => new Date()),
  },
  (t) => [index("email_idx").on(t.email)],
)
