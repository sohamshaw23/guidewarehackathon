import { NextResponse } from 'next/server';
import { mockDB } from '@/lib/mockDB';

export async function GET() {
  // In a real app, we'd verify the JWT. Here we just return the seed user.
  const user = mockDB.tables.users[0];
  return NextResponse.json(user);
}
