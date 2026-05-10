-- Grant admin role to Derek's user from the pool-rental project, if that
-- user happens to exist in this DB (it won't on a fresh founders-click
-- project — admin will be granted manually post-signup via the UI / SQL).
INSERT INTO public.user_roles (user_id, role)
SELECT '1c83b29a-9757-49cf-944a-c2e5db131e06'::uuid, 'admin'
WHERE EXISTS (SELECT 1 FROM auth.users WHERE id = '1c83b29a-9757-49cf-944a-c2e5db131e06'::uuid)
ON CONFLICT (user_id, role) DO NOTHING;
