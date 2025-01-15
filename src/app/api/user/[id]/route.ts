import { NextResponse } from 'next/server';
import { getUser, updateUser, deleteUser } from '@/lib/queries/userQueries';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = await params; // Extract `id` from the URL params

  // Find the user by ID
  const user = await getUser(Number(id));
  console.log(user);

  if (user) {
    return NextResponse.json(user); // Return the user as a JSON response
  } else {
    return NextResponse.json({ error: 'User not found' }, { status: 404 }); // Handle user not found
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const { id } = await params; // Extract `id` from the URL params
  const data = await request.json(); // Get the data from the request body

  // Update the user by ID
  const updatedUser = await updateUser(Number(id), data);

  if (updatedUser) {
    return NextResponse.json(updatedUser); // Return the updated user as a JSON response
  } else {
    return NextResponse.json({ error: 'User not found or update failed' }, { status: 404 }); // Handle user not found or update failed
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const { id } = await params; // Extract `id` from the URL params

  // Delete the user by ID
  const deleted = await deleteUser(Number(id));

  if (deleted) {
    return NextResponse.json({ message: 'User deleted successfully' }); // Return success message
  } else {
    return NextResponse.json({ error: 'User not found or delete failed' }, { status: 404 }); // Handle user not found or delete failed
  }
}
