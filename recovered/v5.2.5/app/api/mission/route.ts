import { NextResponse } from 'next/server';
import { missionPlan } from '@/lib/root';

export async function POST(req: Request) {
  try {
    const { mission } = await req.json();
    if (typeof mission !== 'string' || !mission.trim()) {
      return NextResponse.json({ error: 'MISSION_REQUIRED' }, { status: 400 });
    }
    return NextResponse.json(missionPlan(mission.trim()));
  } catch {
    return NextResponse.json({ error: 'INVALID_REQUEST' }, { status: 400 });
  }
}
