# PLAN: Direct Vercel Deployment (Non-GitHub)

This plan outlines the steps to deploy the **RhinoRoam** platform directly from the local machine to Vercel via the CLI, bypassing the need for a GitHub commit/push.

## Phase 1: Preparation & Setup
1. **CLI Installation**: Verify `vercel` CLI is available.
2. **Authentication**: Ensure user is logged into the correct Vercel account.
3. **Project Linking**: Link the local directory to the existing `rhinoroam` Vercel project.
   - Command: `vercel link`

## Phase 2: Environment Configuration
Vercel needs the credentials recently updated in `.env.local`.
1. **Pull Remotes**: `vercel env pull .env.vercel` (to check existing).
2. **Push Locals**: Use the Vercel Dashboard to ensure all `NEXT_PUBLIC_FIREBASE_*`, `DATABASE_URL`, and `NEXTAUTH_SECRET` are set.
   - *Recommendation: Use the Vercel Dashboard for UI-based bulk editing if needed.*

## Phase 3: Deployment Execution
1. **Manual Deploy**: Run the build and deployment locally.
   - **Preview**: `vercel`
   - **Production**: `vercel --prod`
2. **Build Monitoring**: Watch the Vercel build logs for any CSS resolution or Prisma generation errors.

## Phase 4: Post-Deployment Verification
1. **Domain Check**: Verify accessibility at `rhinoroam.vercel.app`.
2. **Firebase Auth**: Check if the Vercel URL is added to the Authorized Domains in Firebase Console.
3. **Database Connectivity**: Verify the site can fetch POIs/Experiences from the production PostgreSQL.

## Verification Checklist
- [ ] Vercel CLI Login confirmed?
- [ ] Project Linked to `rhinoroam`?
- [ ] Environment variables present in Vercel Dashboard?
- [ ] Production build successful?
- [ ] Site live at production URL?
