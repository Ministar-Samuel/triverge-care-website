## 2026-03-10 - Missing Server-Side API Authorization
**Vulnerability:** The `src/app/api/users/[id]/route.ts` endpoints (`PATCH`, `DELETE`) were using `createAdminClient` (bypassing RLS) without any authentication or authorization checks, allowing unauthenticated privilege escalation.
**Learning:** Next.js middleware was only configured for UI routes (`/admin/*`) and did not protect the `/api/*` administrative endpoints, leading to a false sense of security.
**Prevention:** Always implement explicit role-based access control (RBAC) checks directly within privileged API route handlers using the authenticated user's session token (`createClient().auth.getUser()`) before using service role clients that bypass Row Level Security.

## 2025-03-11 - Missing Authorization on Admin API Route (Blog Creation)
**Vulnerability:** The `POST` route in `src/app/api/blog` used `createAdminClient` without verifying the user's role or authentication state. This allows unauthenticated users to create blog posts by hitting the API, bypassing Supabase Row Level Security (RLS) entirely since the admin client was used.
**Learning:** Next.js middleware protecting `/admin` UI routes does not automatically secure `/api` endpoints. Each sensitive API route handler must independently authenticate and authorize users (checking for 'admin' or 'super_admin' roles) *before* executing database operations using an admin-level client.
**Prevention:** Always implement and invoke a strict authorization check (like a `verifyAdmin` helper) at the very top of sensitive API route handlers that utilize elevated privileges via the service role key.
