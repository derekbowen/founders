import { useEffect } from "react";

/**
 * Mount this once at the top of the app to surface React hydration mismatches
 * with full context. Production React minifies messages (#418/#423/#425), so
 * we tag every console.error with the URL, UA, document signature, and a
 * captured stack to make it easy to identify which subtree mismatched.
 */
export function HydrationDebug() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const w = window as unknown as { __hydrationDebugInstalled?: boolean };
    if (w.__hydrationDebugInstalled) return;
    w.__hydrationDebugInstalled = true;

    const url = window.location.href;
    const path = window.location.pathname;
    const ua = navigator.userAgent;
    const htmlLen = document.documentElement.outerHTML.length;
    const bodyChildren = document.body.children.length;

    // eslint-disable-next-line no-console
    console.info("[hydration-debug] mounted", {
      url,
      path,
      ua,
      htmlLen,
      bodyChildren,
      time: new Date().toISOString(),
    });

    const HYDRATION_CODES = ["418", "419", "421", "422", "423", "425"];
    const HYDRATION_KEYWORDS = [
      "hydrat",
      "did not match",
      "Text content does not match",
      "server rendered HTML",
      "Minified React error",
    ];

    const origError = console.error;
    console.error = (...args: unknown[]) => {
      const msg = args
        .map((a) => {
          if (typeof a === "string") return a;
          if (a instanceof Error) return a.message;
          try {
            return JSON.stringify(a);
          } catch {
            return String(a);
          }
        })
        .join(" ");

      const isHydration =
        HYDRATION_KEYWORDS.some((k) => msg.toLowerCase().includes(k.toLowerCase())) ||
        HYDRATION_CODES.some((c) => msg.includes(`Minified React error #${c}`));

      if (isHydration) {
        const stack = new Error("hydration-debug capture").stack;
        try {
          origError.call(
            console,
            "[hydration-debug] HYDRATION ERROR DETECTED",
            {
              url: window.location.href,
              path: window.location.pathname,
              originalArgs: args,
              capturedStack: stack,
              docTitle: document.title,
              firstH1: document.querySelector("h1")?.textContent ?? null,
              bodyPreview: document.body.innerText.slice(0, 200),
            },
          );
        } catch {
          // ignore
        }
      }

      return origError.apply(console, args as []);
    };

    const onError = (event: ErrorEvent) => {
      // eslint-disable-next-line no-console
      console.warn("[hydration-debug] window.error", {
        message: event.message,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        stack: event.error?.stack,
      });
    };
    const onRejection = (event: PromiseRejectionEvent) => {
      // eslint-disable-next-line no-console
      console.warn("[hydration-debug] unhandledrejection", {
        reason: event.reason?.message ?? String(event.reason),
        stack: event.reason?.stack,
      });
    };
    window.addEventListener("error", onError);
    window.addEventListener("unhandledrejection", onRejection);

    return () => {
      console.error = origError;
      window.removeEventListener("error", onError);
      window.removeEventListener("unhandledrejection", onRejection);
      w.__hydrationDebugInstalled = false;
    };
  }, []);

  return null;
}

/**
 * Drop-in wrapper that logs on every render + mount/unmount of a subtree.
 * Use sparingly to bisect which component is causing a hydration mismatch:
 *   <RenderTrace name="HomePageHero"><Hero /></RenderTrace>
 */
export function RenderTrace({
  name,
  children,
}: {
  name: string;
  children: React.ReactNode;
}) {
  const isServer = typeof window === "undefined";
  // eslint-disable-next-line no-console
  console.info(`[render-trace] ${name} render`, {
    env: isServer ? "server" : "client",
  });

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.info(`[render-trace] ${name} mounted`);
    return () => {
      // eslint-disable-next-line no-console
      console.info(`[render-trace] ${name} unmounted`);
    };
  }, [name]);

  return <>{children}</>;
}
