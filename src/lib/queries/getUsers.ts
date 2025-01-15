import { db } from "@/db"
import { users } from "@/db/schema"

export async function getUsers() {
  const user = await db.select().from(users)

  return user
}