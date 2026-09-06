import { hasAuth, hasDatabase, hasGateway } from '@/lib/config';
import { storageStatus } from '@/lib/storage';
import { ROOT_VERSION, ROOT_ARCHITECTURE } from '@/lib/version';

export async function GET() {
  return Response.json({
    ok: true,
    version: ROOT_VERSION,
    architecture: ROOT_ARCHITECTURE,
    runtime: 'nextjs',
    aiGateway: hasGateway,
    auth: hasAuth,
    database: hasDatabase,
    storage: storageStatus(),
    humanAuthority: true,
    timestamp: new Date().toISOString()
  });
}
