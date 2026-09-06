import { hasAuth, hasDatabase, hasGateway } from '@/lib/config';
import { ROOT_VERSION, ROOT_ARCHITECTURE } from '@/lib/version';

export async function GET() {
  const checks = {
    app: true,
    aiGateway: hasGateway,
    database: hasDatabase,
    auth: hasAuth,
    humanAuthority: true,
  };
  const ready = checks.app && checks.aiGateway;
  return Response.json({
    ready,
    version: ROOT_VERSION,
    architecture: ROOT_ARCHITECTURE,
    checks,
    requiredForAI: ['AI_GATEWAY_API_KEY'],
    recommendedForProduction: ['DATABASE_URL', 'CLERK_SECRET_KEY', 'NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY'],
    timestamp: new Date().toISOString(),
  }, { status: ready ? 200 : 503 });
}
