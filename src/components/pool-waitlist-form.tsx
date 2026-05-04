import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { joinPoolWaitlist } from "@/server/waitlist.functions";

interface Props {
  nearestMiles: number | null;
  city: string | null;
  region: string | null;
}

export function PoolWaitlistForm({ nearestMiles, city, region }: Props) {
  const join = useServerFn(joinPoolWaitlist);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  const where = city ? `${city}${region ? `, ${region}` : ""}` : "your area";
  const milesLabel =
    nearestMiles !== null ? `${Math.round(nearestMiles).toLocaleString()} miles` : "500+ miles";

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "loading") return;
    setError(null);
    const trimmed = email.trim();
    if (!trimmed || !/^\S+@\S+\.\S+$/.test(trimmed) || trimmed.length > 255) {
      setError("Please enter a valid email address.");
      return;
    }
    setStatus("loading");
    try {
      await join({ data: { email: trimmed, nearestMiles, city, region } });
      setStatus("success");
    } catch (err) {
      console.error(err);
      setStatus("error");
      setError("Something went wrong. Please try again.");
    }
  }

  return (
    <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="rounded-3xl border border-border bg-gradient-to-br from-primary/10 via-card to-card p-8 shadow-sm sm:p-10">
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
            <span aria-hidden>📍</span> No pools near {where} yet
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Be first when a pool opens near you
          </h2>
          <p className="mt-3 text-base text-muted-foreground">
            The closest pool we have is about <strong>{milesLabel}</strong> from you. Drop your email and
            we'll let you know the moment a host lists a pool within driving distance.
          </p>
        </div>

        {status === "success" ? (
          <div className="mt-8 rounded-2xl border border-primary/30 bg-primary/5 p-6 text-center">
            <p className="text-lg font-semibold text-foreground">You're on the list! 🎉</p>
            <p className="mt-2 text-sm text-muted-foreground">
              We'll email you as soon as a pool is available near {where}.
            </p>
          </div>
        ) : (
          <form
            onSubmit={onSubmit}
            className="mt-8 flex flex-col gap-3 sm:flex-row"
            noValidate
          >
            <label htmlFor="waitlist-email" className="sr-only">
              Email address
            </label>
            <input
              id="waitlist-email"
              type="email"
              required
              autoComplete="email"
              maxLength={255}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full flex-1 rounded-full border border-border bg-background px-5 py-3 text-base text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
              disabled={status === "loading"}
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-base font-semibold text-primary-foreground shadow-lg transition-transform hover:scale-105 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === "loading" ? "Adding…" : "Notify me"}
            </button>
          </form>
        )}

        {error && (
          <p className="mt-3 text-center text-sm text-destructive">{error}</p>
        )}

        <p className="mt-4 text-center text-xs text-muted-foreground">
          We'll only email you about pools in your area. Unsubscribe anytime.
        </p>
      </div>
    </section>
  );
}
