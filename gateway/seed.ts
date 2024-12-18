import { hash } from "bcryptjs"
import { db } from "./src/db"
import { users } from "./src/db/schema"

async function seed() {
  await db.insert(users).values([
    {
      name: "admin",
      email: "admin@example.com",
      passwordHash: await hash("admin", 10),
      role: "admin",
    },
  ])
}

seed()

console.log("Seeding complete")
