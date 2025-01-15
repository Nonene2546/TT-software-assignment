import { Users, columns } from "./columns"
import { DataTable } from "./data-table"
import { getUsers } from "@/lib/queries/getUsers"

async function getData(): Promise<Users[]> {
  // Fetch data from your API here.
  const users = await getUsers()
  return users.map((user) => ({
    name: `${user.fname} ${user.lname}`,
    ...user
  }))
}

export default async function DemoPage() {
  const data = await getData()

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  )
}
