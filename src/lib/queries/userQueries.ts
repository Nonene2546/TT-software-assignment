import { db } from "@/db"
import { users } from "@/db/schema"
import { eq } from "drizzle-orm"


export async function getUser(id: number) {
  const user = await db.select()
    .from(users)
    .where(eq(users.id, id))

  return user[0]
}

export async function updateUser(id: number, data: Partial<typeof users>) {
  const { hn, ...updateData } = data;

  const result = await db.update(users)
    .set(updateData)
    .where(eq(users.id, id));

  return result.rowCount > 0 ? await getUser(id) : null;
}


export async function deleteUser(id: number) {
  const result = await db.delete(users)
    .where(eq(users.id, id))

  return result.rowCount > 0
}

export async function addUser(data: { fname: string; lname: string; phone: string; email: string }) {
  const result = await db.insert(users)
    .values(data)
    .returning()

  return result[0]
}