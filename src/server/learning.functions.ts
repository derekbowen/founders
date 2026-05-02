import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

const SlugInput = z.object({ course_slug: z.string().min(1).max(120) });

export type LearnerCourseStatus = {
  course_slug: string;
  is_enrolled: boolean;
  is_completed: boolean;
  certificate_uid: string | null;
  completed_at: string | null;
};

export const getMyCourseStatus = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => SlugInput.parse(input))
  .handler(async ({ data, context }): Promise<LearnerCourseStatus> => {
    const { supabase, userId } = context as { supabase: any; userId: string };

    const [enrollRes, completeRes] = await Promise.all([
      supabase
        .from("course_enrollments")
        .select("id")
        .eq("user_id", userId)
        .eq("course_slug", data.course_slug)
        .maybeSingle(),
      supabase
        .from("course_completions")
        .select("certificate_uid, completed_at, revoked_at")
        .eq("user_id", userId)
        .eq("course_slug", data.course_slug)
        .maybeSingle(),
    ]);

    const completion = completeRes.data && !completeRes.data.revoked_at ? completeRes.data : null;

    return {
      course_slug: data.course_slug,
      is_enrolled: !!enrollRes.data || !!completion,
      is_completed: !!completion,
      certificate_uid: completion?.certificate_uid ?? null,
      completed_at: completion?.completed_at ?? null,
    };
  });

export const enrollInCourse = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => SlugInput.parse(input))
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context as { supabase: any; userId: string };
    const { error } = await supabase
      .from("course_enrollments")
      .upsert(
        { user_id: userId, course_slug: data.course_slug },
        { onConflict: "user_id,course_slug", ignoreDuplicates: true },
      );
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const markCourseComplete = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => SlugInput.parse(input))
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context as { supabase: any; userId: string };

    // Already completed?
    const { data: existing } = await supabase
      .from("course_completions")
      .select("certificate_uid, revoked_at")
      .eq("user_id", userId)
      .eq("course_slug", data.course_slug)
      .maybeSingle();

    if (existing && !existing.revoked_at) {
      return { ok: true, certificate_uid: existing.certificate_uid as string, already: true };
    }

    // Look up authoritative course title (admin client; courses are public but we
    // want to ensure the slug is real).
    const { data: course, error: courseErr } = await supabaseAdmin
      .from("courses")
      .select("slug, title, is_published")
      .eq("slug", data.course_slug)
      .maybeSingle();
    if (courseErr) throw new Error(courseErr.message);
    if (!course || !course.is_published) {
      throw new Error("Course not found or not published");
    }

    // Look up learner display name from profile (fallback to claims/email).
    const { data: profile } = await supabase
      .from("profiles")
      .select("full_name, display_name")
      .eq("user_id", userId)
      .maybeSingle();

    const claims = (context as { claims: Record<string, unknown> }).claims;
    const learnerName =
      (profile?.full_name as string | undefined) ||
      (profile?.display_name as string | undefined) ||
      (claims?.["email"] as string | undefined)?.split("@")[0] ||
      "Learner";

    // Auto-enroll if not yet enrolled.
    await supabase
      .from("course_enrollments")
      .upsert(
        { user_id: userId, course_slug: data.course_slug },
        { onConflict: "user_id,course_slug", ignoreDuplicates: true },
      );

    const { data: inserted, error: insertErr } = await supabase
      .from("course_completions")
      .insert({
        user_id: userId,
        course_slug: data.course_slug,
        course_title: course.title,
        learner_name: learnerName,
      })
      .select("certificate_uid")
      .single();

    if (insertErr) throw new Error(insertErr.message);

    return { ok: true, certificate_uid: inserted.certificate_uid as string, already: false };
  });

export type MyLearningRow = {
  course_slug: string;
  course_title: string | null;
  enrolled_at: string | null;
  completed_at: string | null;
  certificate_uid: string | null;
};

export const listMyLearning = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<{ rows: MyLearningRow[] }> => {
    const { supabase, userId } = context as { supabase: any; userId: string };

    const [enrollRes, completionsRes] = await Promise.all([
      supabase
        .from("course_enrollments")
        .select("course_slug, enrolled_at")
        .eq("user_id", userId)
        .order("enrolled_at", { ascending: false }),
      supabase
        .from("course_completions")
        .select("course_slug, course_title, completed_at, certificate_uid, revoked_at")
        .eq("user_id", userId)
        .is("revoked_at", null)
        .order("completed_at", { ascending: false }),
    ]);

    const slugs = new Set<string>();
    (enrollRes.data ?? []).forEach((r: { course_slug: string }) => slugs.add(r.course_slug));
    (completionsRes.data ?? []).forEach((r: { course_slug: string }) => slugs.add(r.course_slug));

    // Pull titles for enrollments that don't have a completion record.
    const slugList = Array.from(slugs);
    const { data: courses } = slugList.length
      ? await supabaseAdmin.from("courses").select("slug, title").in("slug", slugList)
      : { data: [] as Array<{ slug: string; title: string }> };
    const titleMap = new Map<string, string>();
    for (const c of courses ?? []) titleMap.set(c.slug, c.title);

    const enrollMap = new Map<string, string>();
    for (const e of enrollRes.data ?? []) enrollMap.set(e.course_slug, e.enrolled_at as string);

    const completionMap = new Map<
      string,
      { course_title: string; completed_at: string; certificate_uid: string }
    >();
    for (const c of completionsRes.data ?? []) {
      completionMap.set(c.course_slug, {
        course_title: c.course_title as string,
        completed_at: c.completed_at as string,
        certificate_uid: c.certificate_uid as string,
      });
    }

    const rows: MyLearningRow[] = slugList.map((slug) => {
      const completion = completionMap.get(slug);
      return {
        course_slug: slug,
        course_title: completion?.course_title ?? titleMap.get(slug) ?? null,
        enrolled_at: enrollMap.get(slug) ?? null,
        completed_at: completion?.completed_at ?? null,
        certificate_uid: completion?.certificate_uid ?? null,
      };
    });

    // Sort: completed first by completed_at desc, then enrolled by enrolled_at desc
    rows.sort((a, b) => {
      const ad = a.completed_at ?? a.enrolled_at ?? "";
      const bd = b.completed_at ?? b.enrolled_at ?? "";
      return bd.localeCompare(ad);
    });

    return { rows };
  });

// Public verification: anyone can resolve a UID to a redacted summary.
export const verifyCertificate = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) =>
    z.object({ certificate_uid: z.string().min(4).max(40) }).parse(input),
  )
  .handler(async ({ data }) => {
    const { data: row, error } = await supabaseAdmin
      .from("course_completions")
      .select("certificate_uid, course_slug, course_title, learner_name, completed_at, revoked_at, revoke_reason")
      .eq("certificate_uid", data.certificate_uid)
      .maybeSingle();
    if (error) throw new Error(error.message);
    if (!row) return { found: false as const };
    return {
      found: true as const,
      certificate_uid: row.certificate_uid as string,
      course_slug: row.course_slug as string,
      course_title: row.course_title as string,
      learner_name: row.learner_name as string,
      completed_at: row.completed_at as string,
      revoked_at: (row.revoked_at as string | null) ?? null,
      revoke_reason: (row.revoke_reason as string | null) ?? null,
    };
  });
