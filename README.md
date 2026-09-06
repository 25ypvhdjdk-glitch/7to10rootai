# ROOT 7¹⁰ AI Operating Environment v5.2.5

Production-oriented foundation for ROOT OS. v5.2.5 adds explicit deployment boundaries, environment validation, persistent-data schema, approval endpoint, risk classification, health checks, and a cleaner Vercel deployment surface.

## What v5.2.5 adds
- Next.js App Router foundation
- AI Gateway-ready environment contract
- Tool/agent architecture inherited from v5.1
- Postgres schema for missions, tasks, approvals, verification, memory, and events
- Human-approval API boundary
- Risk classification
- `/api/health` readiness endpoint
- `.vercelignore` and clean source deployment boundary
- Mobile-first command interface

## Important
This package is a production foundation, not a claim of production readiness by itself. Real AI credentials, database provisioning, authentication, rate limiting, observability, and security review must be configured in the Vercel project.

## Vercel path
1. Create/link a Vercel project to this folder.
2. Configure `AI_GATEWAY_API_KEY` in Vercel for the appropriate environments.
3. Optional: provision Postgres and set `DATABASE_URL`.
4. Optional: install Clerk from Vercel Marketplace and configure auth variables.
5. Run `vercel deploy --dry --format=json` before deployment.
6. Deploy with `vercel --prod` or `vercel deploy --prod`.
7. Verify `/api/health` and the mission/approval routes.

Never commit secrets. `.env.example` contains names only.

## v5.2.5 corrections
- Centralized ROOT version reporting across mission, health, readiness, and approval APIs.
- Mission plans now include a unique mission ID so the approval control is functional.
- Mission planning is explicitly marked planning-only and requires approval before execution.
- Risk classification still determines when heightened human authority is mandatory.

## Recovery
The v5.2.5 source was recovered from the preserved ROOT AI archive and restored to the repository root for deployment.

Deployment verification trigger: source is now at repository root.
