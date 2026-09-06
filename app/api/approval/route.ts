import { z } from 'zod';
import { ROOT_VERSION } from '@/lib/version';

const schema = z.object({
  missionId: z.string().min(1),
  taskId: z.string().min(1),
  decision: z.enum(['APPROVE','REJECT']),
  reason: z.string().optional()
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const r = schema.safeParse(body);
    if (!r.success) return Response.json({ error: 'Invalid approval payload', details: r.error.flatten() }, { status: 400 });
    return Response.json({
      ok: true,
      version: ROOT_VERSION,
      approval: { ...r.data, approvedAt: new Date().toISOString() },
      next: r.data.decision === 'APPROVE' ? 'EXECUTE → VERIFY' : 'BLOCK → REVISE'
    });
  } catch {
    return Response.json({ error: 'INVALID_REQUEST' }, { status: 400 });
  }
}
