## 2026-03-10 - Missing Server-Side API Authorization
**Vulnerability:** The `src/app/api/users/[id]/route.ts` endpoints (`PATCH`, `DELETE`) were using `createAdminClient` (bypassing RLS) without any authentication or authorization checks, allowing unauthenticated privilege escalation.
**Learning:** Next.js middleware was only configured for UI routes (`/admin/*`) and did not protect the `/api/*` administrative endpoints, leading to a false sense of security.
**Prevention:** Always implement explicit role-based access control (RBAC) checks directly within privileged API route handlers using the authenticated user's session token (`createClient().auth.getUser()`) before using service role clients that bypass Row Level Security.
