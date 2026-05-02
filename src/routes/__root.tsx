import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { SiteHeader, SiteFooter } from "@/components/site-layout";
import {
  buildMeta,
  ldJsonScript,
  organizationJsonLd,
  websiteJsonLd,
  SITE_NAME,
} from "@/lib/seo";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex flex-1 items-center justify-center px-4 py-20">
        <div className="max-w-md text-center">
          <h1 className="text-7xl font-bold text-foreground">404</h1>
          <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <div className="mt-6">
            <Link
              to="/"
              className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-glow"
            >
              Go home
            </Link>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}

export const Route = createRootRoute({
  head: () => {
    const meta = buildMeta({
      title: `${SITE_NAME} — Rent a Private Pool by the Hour`,
      description:
        "Find and book private pool rentals near you. Hourly bookings, $2M liability insurance included. Backyard pools, heated pools, hot tubs, and more.",
      path: "/",
    });
    return {
      meta: [
        { charSet: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "author", content: SITE_NAME },
        { name: "theme-color", content: "#0ea5e9" },
        ...meta.meta,
        { title: "Lovable App" },
        { property: "og:title", content: "Lovable App" },
        { name: "twitter:title", content: "Lovable App" },
        { name: "description", content: "PSEO PAGES builds and optimizes web pages to improve search engine visibility and user experience." },
        { property: "og:description", content: "PSEO PAGES builds and optimizes web pages to improve search engine visibility and user experience." },
        { name: "twitter:description", content: "PSEO PAGES builds and optimizes web pages to improve search engine visibility and user experience." },
        { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/cdca8af2-1a13-4e93-9026-238b727f46d3/id-preview-0e1c38cd--4831238c-ae4b-468a-bfd8-41cba26ba0b1.lovable.app-1777737379318.png" },
        { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/cdca8af2-1a13-4e93-9026-238b727f46d3/id-preview-0e1c38cd--4831238c-ae4b-468a-bfd8-41cba26ba0b1.lovable.app-1777737379318.png" },
        { name: "twitter:card", content: "summary_large_image" },
        { property: "og:type", content: "website" },
      ],
      links: [
        { rel: "stylesheet", href: appCss },
        { rel: "icon", href: "/favicon.ico" },
        ...meta.links,
      ],
      scripts: [ldJsonScript(organizationJsonLd()), ldJsonScript(websiteJsonLd())],
    };
  },
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return <Outlet />;
}
