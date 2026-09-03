import { createRootRoute, HeadContent, Outlet, Scripts } from "@tanstack/react-router";
import { AuthProvider } from "@/lib/auth/provider";
import { PreviewHostBridge } from "@/components/preview-host-bridge";
import { AppShell } from "@/components/app-shell";
import { isGroupId, type GroupId } from "@/lib/catalog";
import { isMarketId, type MarketId } from "@/data/markets";
import appCss from "../styles.css?url";

const APP_NAME = "G-Product Intelligence";

export type RootSearch = { g?: GroupId; v?: string; m?: MarketId };

export const Route = createRootRoute({
  validateSearch: (s: Record<string, unknown>): RootSearch => ({
    g: isGroupId(s.g) ? s.g : undefined,
    v: typeof s.v === "string" && s.v ? s.v : undefined,
    m: isMarketId(s.m) ? s.m : undefined,
  }),
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
      { title: APP_NAME },
      { name: "theme-color", content: "#1A6B5C" },
      {
        name: "description",
        content: "G-Product Intelligence — architecture, platform, vehicle.",
      },
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "stylesheet", href: appCss },
      { rel: "manifest", href: "/__grok/manifest.webmanifest" },
      { rel: "apple-touch-icon", href: "/__grok/icon-180.png" },
    ],
  }),
  component: () => (
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        <PreviewHostBridge />
        <AuthProvider>
          <AppShell>
            <Outlet />
          </AppShell>
        </AuthProvider>
        <Scripts />
      </body>
    </html>
  ),
});
