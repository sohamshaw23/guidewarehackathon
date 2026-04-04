import { NextResponse } from 'next/server';
import { mockDB } from '@/lib/mockDB';

export async function GET() {
  return NextResponse.json(mockDB.tables.payouts);
}
