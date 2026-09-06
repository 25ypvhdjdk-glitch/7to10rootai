# ROOT 7¹⁰ v5.2.5 — Vercel Deployment Checklist

## Project
- Framework: Next.js
- Root directory: project root
- Build command: `npm run build`
- Install command: `npm install`
- Node.js: 22+

## Environment Variables
Required for live AI:
- `AI_GATEWAY_API_KEY`

Recommended before production:
- `DATABASE_URL`
- `CLERK_SECRET_KEY`
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`

Never commit real credentials.

## Pre-deployment checks
```bash
npm install
npm run typecheck
npm run build
vercel deploy --dry --format=json
```

The dry run should detect Next.js and should not include secrets, `.env` files, build artifacts, or dependency folders.

## Deploy
After the project is linked to Vercel:
```bash
vercel deploy --prod
```

## Verify
- `/`
- `/api/health`
- `/api/ready`

`/api/ready` returns HTTP 200 only when the minimum AI runtime requirement is configured.

## ROOT safety boundary
AI can plan and coordinate. Consequential actions remain human-authorized. Production tools should be added behind explicit permission classes and approval records.
