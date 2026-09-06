import { z } from 'zod';

const optionalText = z.preprocess(
  (value) => (typeof value === 'string' && value.trim() === '' ? undefined : value),
  z.string().min(1).optional(),
);

const optionalUrl = z.preprocess(
  (value) => (typeof value === 'string' && value.trim() === '' ? undefined : value),
  z.string().url().optional(),
);

const schema = z.object({
  AI_GATEWAY_API_KEY: optionalText,
  DATABASE_URL: optionalUrl,
  CLERK_SECRET_KEY: optionalText,
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: optionalText,
});

export const env = schema.parse({
  AI_GATEWAY_API_KEY: process.env.AI_GATEWAY_API_KEY,
  DATABASE_URL: process.env.DATABASE_URL,
  CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
});

export const hasDatabase = Boolean(env.DATABASE_URL);
export const hasAuth = Boolean(env.CLERK_SECRET_KEY && env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);
export const hasGateway = Boolean(env.AI_GATEWAY_API_KEY);
