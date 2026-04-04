import { NextResponse } from 'next/server';
import { mockDB } from '@/lib/mockDB';

export async function POST(request: Request) {
  const body = await request.json();
  const { phone, password } = body;

  const user = mockDB.tables.users.find((u: any) => u.phone === phone);

  if (!user || (password !== 'password123' && password !== 'rahul123')) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  // Generic demo token
  return NextResponse.json({ 
    token: 'demo-token-123',
    user: { id: user.id, name: user.name, phone: user.phone }
  });
}
