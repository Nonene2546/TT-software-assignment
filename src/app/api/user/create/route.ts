import { NextResponse } from 'next/server';
import { addUser } from '@/lib/queries/userQueries';

export async function POST(request) {
  const data = await request.json(); // Get the data from the request body

  // Add the new user
  const newUser = await addUser(data);

  if (newUser) {
    return NextResponse.json(newUser); // Return the new user as a JSON response
  } else {
    return NextResponse.json({ error: 'User creation failed' }, { status: 400 }); // Handle user creation failed
  }
}