import { Users, columns } from "@/components/users_table/columns"
import { DataTable } from "@/components/users_table/data-table"
import { getUsers } from "@/lib/queries/getUsers"

async function getData(): Promise<Users[]> {
  // Fetch data from your API here.
  const users = await getUsers()
  return users.map((user) => ({
    name: `${user.fname} ${user.lname}`,
    ...user
  }))
}

export default async function Page() {
  const data = await getData()

  return (
    <div className="container md:max-w-[80%] mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  )
}
