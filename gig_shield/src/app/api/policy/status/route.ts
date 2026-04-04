import { NextResponse } from 'next/server';
import { mockDB } from '@/lib/mockDB';

export async function GET() {
  const policy = mockDB.tables.policies.find((p: any) => p.user_id === 1 && p.status === 'active');
  
  if (!policy) {
    return NextResponse.json({ status: 'none' });
  }

  const plan = mockDB.tables.plans.find((pl: any) => pl.id === policy.plan_id);
  return NextResponse.json({
    ...policy,
    plan_name: plan?.name,
    coverage_limit: plan?.coverage_limit
  });
}
