import { z } from 'zod';
const schema=z.object({AI_GATEWAY_API_KEY:z.string().min(1).optional(),DATABASE_URL:z.string().url().optional(),CLERK_SECRET_KEY:z.string().min(1).optional(),NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY:z.string().min(1).optional()});
export const env=schema.parse({AI_GATEWAY_API_KEY:process.env.AI_GATEWAY_API_KEY,DATABASE_URL:process.env.DATABASE_URL,CLERK_SECRET_KEY:process.env.CLERK_SECRET_KEY,NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY:process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY});
export const hasDatabase=Boolean(env.DATABASE_URL); export const hasAuth=Boolean(env.CLERK_SECRET_KEY&&env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY); export const hasGateway=Boolean(env.AI_GATEWAY_API_KEY);
