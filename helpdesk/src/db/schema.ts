import { createId } from "@paralleldrive/cuid2"
import { sql } from "drizzle-orm"
import { index, integer, sqliteTable, text } from "drizzle-orm/sqlite-core"

export const tickets = sqliteTable(
  "tickets",
  {
    id: text("id")
      .primaryKey()
      .$default(() => createId()),
    title: text("title", { length: 60 }).notNull(),
    salesId: text("order_id"),
    productId: integer("product_id"),
    issueType: text("issue_type", {
      enum: ["sales", "product", "other"],
    })
      .default("other")
      .notNull(),
    description: text("description"),
    status: text("status", { enum: ["open", "in-progress", "resolved", "closed"] })
      .notNull()
      .default("open"),
    priority: text("priority", { enum: ["low", "medium", "high", "critical"] }).default(sql`NULL`),
    createdBy: text("created_by").notNull(),
    createdAt: integer("created_at", { mode: "timestamp" }).default(new Date()).notNull(),
    updatedAt: integer("updated_at", { mode: "timestamp" }).$onUpdate(() => new Date()),
  },
  (t) => [
    index("issue_type_idx").on(t.status),
    index("status_idx").on(t.status),
    index("priority_idx").on(t.priority),
    index("created_by_idx").on(t.createdBy),
  ],
)
