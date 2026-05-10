-- Add workspace_id to blog_posts so each workspace has its own blog.
-- Existing PRNM posts are assigned to the PRNM internal workspace.

ALTER TABLE public.blog_posts
  ADD COLUMN IF NOT EXISTS workspace_id uuid REFERENCES public.workspaces(id) ON DELETE CASCADE;

-- Backfill: assign all existing rows to the PRNM internal workspace.
UPDATE public.blog_posts
SET workspace_id = (SELECT id FROM public.workspaces WHERE is_internal = true LIMIT 1)
WHERE workspace_id IS NULL;

-- Make the column required now that all rows are backfilled.
ALTER TABLE public.blog_posts
  ALTER COLUMN workspace_id SET NOT NULL;

CREATE INDEX IF NOT EXISTS idx_blog_posts_workspace ON public.blog_posts(workspace_id);

-- RLS: workspace members can read/write only their own blog posts.
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
