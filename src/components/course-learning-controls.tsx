import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import {
  enrollInCourse,
  getMyCourseStatus,
  markCourseComplete,
  type LearnerCourseStatus,
} from "@/server/learning.functions";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

type Props = {
  courseSlug: string;
  courseTitle: string;
};

export function CourseLearningControls({ courseSlug, courseTitle }: Props) {
  const [signedIn, setSignedIn] = useState<boolean | null>(null);
  const [status, setStatus] = useState<LearnerCourseStatus | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    let active = true;
    void supabase.auth.getUser().then(async ({ data }) => {
      if (!active) return;
      const isIn = !!data.user;
      setSignedIn(isIn);
      if (isIn) {
        try {
          const s = await getMyCourseStatus({ data: { course_slug: courseSlug } });
          if (active) setStatus(s);
        } catch (e) {
          console.error(e);
        }
      }
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      setSignedIn(!!session?.user);
    });
    return () => {
      active = false;
      sub.subscription.unsubscribe();
    };
  }, [courseSlug]);

  async function onEnroll() {
    setBusy(true);
    try {
      await enrollInCourse({ data: { course_slug: courseSlug } });
      const s = await getMyCourseStatus({ data: { course_slug: courseSlug } });
      setStatus(s);
      toast.success("You're enrolled. Watch the course, then mark it complete.");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to enroll.");
    } finally {
      setBusy(false);
    }
  }

  async function onComplete() {
    setBusy(true);
    try {
      const res = await markCourseComplete({ data: { course_slug: courseSlug } });
      const s = await getMyCourseStatus({ data: { course_slug: courseSlug } });
      setStatus(s);
      toast.success(
        res.already
          ? "Already completed — your certificate is ready."
          : "Course complete! Your certificate is ready.",
      );
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to record completion.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="mt-6 flex flex-wrap items-center gap-3 rounded-2xl border border-border bg-card p-4 shadow-sm">
      <div className="flex-1">
        <h3 className="text-sm font-semibold text-foreground">Track your progress</h3>
        <p className="text-xs text-muted-foreground">
          Earn a verifiable certificate for {courseTitle}.
        </p>
      </div>

      {signedIn === null ? (
        <Button disabled variant="outline">
          Loading…
        </Button>
      ) : !signedIn ? (
        <Button asChild>
          <Link
            to="/auth"
            search={{
              mode: "signup",
              redirect: typeof window !== "undefined" ? window.location.pathname : "/academy",
            }}
          >
            Sign up to track progress
          </Link>
        </Button>
      ) : status?.is_completed && status.certificate_uid ? (
        <div className="flex flex-wrap gap-2">
          <Button asChild variant="outline">
            <a href={`/api/certificates/${status.certificate_uid}.pdf`} target="_blank" rel="noreferrer">
              Download certificate
            </a>
          </Button>
          <Button asChild variant="ghost">
            <Link to="/verify/$uid" params={{ uid: status.certificate_uid }}>
              Verify
            </Link>
          </Button>
        </div>
      ) : status?.is_enrolled ? (
        <Button onClick={onComplete} disabled={busy}>
          {busy ? "Saving…" : "Mark course complete"}
        </Button>
      ) : (
        <Button onClick={onEnroll} disabled={busy}>
          {busy ? "Enrolling…" : "Enroll in this course"}
        </Button>
      )}
    </div>
  );
}
