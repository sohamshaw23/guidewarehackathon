import { NextResponse } from 'next/server';
import { mockDB } from '@/lib/mockDB';

export async function POST(request: Request) {
  const body = await request.json();
  const { plan_id } = body;

  const plan = mockDB.tables.plans.find((p: any) => p.id === parseInt(plan_id));
  if (!plan) return NextResponse.json({ error: 'Plan not found' }, { status: 404 });

  // Deactivate old policies
  mockDB.tables.policies = mockDB.tables.policies.filter((p: any) => p.user_id !== 1);

  const newPolicy = {
    id: mockDB.tables.policies.length + 1,
    user_id: 1,
    plan_id: plan.id,
    status: 'active',
    current_premium: plan.premium_base,
    start_date: new Date(),
    end_date: new Date(Date.now() + 7 * 86400000)
  };

  mockDB.tables.policies.push(newPolicy);

  return NextResponse.json(newPolicy);
}
