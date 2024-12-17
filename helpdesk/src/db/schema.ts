import { createId } from "@paralleldrive/cuid2"
import { index, integer, sqliteTable, text } from "drizzle-orm/sqlite-core"

export const tickets = sqliteTable(
  "tickets",
  {
    id: text("id")
      .primaryKey()
      .$default(() => createId()),
    title: text("title", { length: 60 }).notNull(),
    orderId: text("order_id"),
    productId: text("product_id"),
    issueType: text("issue_type", {
      enum: ["order", "product", "other"],
    }).notNull(),
    description: text("description"),
    status: text("status", { enum: ["open", "in-progress", "resolved", "closed"] })
      .default("open")
      .notNull(),
    priority: text("priority", { enum: ["low", "medium", "high", "critical"] })
      .default("medium")
      .notNull(),
    assignedTo: text("assigned_to").notNull(),
    createdBy: text("created_by").notNull(),
    createdAt: integer("created_at", { mode: "timestamp" }).default(new Date()).notNull(),
    updatedAt: integer("updated_at", { mode: "timestamp" }).$onUpdate(() => new Date()),
  },
  (t) => [
    index("issue_type_idx").on(t.status),
    index("status_idx").on(t.status),
    index("priority_idx").on(t.priority),
    index("assigned_to_idx").on(t.assignedTo),
    index("created_by_idx").on(t.createdBy),
    index("created_at_idx").on(t.createdAt),
    index("updated_at_idx").on(t.updatedAt),
  ],
)
