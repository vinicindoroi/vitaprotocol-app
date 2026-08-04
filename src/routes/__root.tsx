import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import { Toaster } from "sonner";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { registerPWA } from "../lib/register-pwa";
import { supabase } from "@/integrations/supabase/client";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-6xl font-bold text-primary">404</h1>
        <p className="mt-3 text-muted-foreground">Esta página no existe.</p>
        <Link to="/" className="btn-primary mt-6 inline-flex" style={{ maxWidth: 220 }}>
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => { reportLovableError(error, { boundary: "root" }); }, [error]);
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold text-foreground">Algo salió mal</h1>
        <p className="mt-2 text-sm text-muted-foreground">Intenta de nuevo.</p>
        <button onClick={() => { router.invalidate(); reset(); }} className="btn-primary mt-6" style={{ maxWidth: 220 }}>
          Reintentar
        </button>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover, maximum-scale=1" },
      { name: "theme-color", content: "#2D6A4F" },
      { name: "apple-mobile-web-app-capable", content: "yes" },
      { name: "apple-mobile-web-app-status-bar-style", content: "default" },
      { name: "apple-mobile-web-app-title", content: "vitaprotocol" },
      { name: "mobile-web-app-capable", content: "yes" },
      { title: "vitaprotocol — Reequilibrio hormonal en 30 días" },
      { name: "description", content: "Protocolo personal de reequilibrio hormonal para mujeres de 30 a 55 años. 30 días, paso a paso." },
      { property: "og:title", content: "vitaprotocol — Reequilibrio hormonal en 30 días" },
      { property: "og:description", content: "Protocolo personal de reequilibrio hormonal para mujeres de 30 a 55 años. 30 días, paso a paso." },
      { property: "og:type", content: "website" },
      { name: "twitter:title", content: "vitaprotocol — Reequilibrio hormonal en 30 días" },
      { name: "twitter:description", content: "Protocolo personal de reequilibrio hormonal para mujeres de 30 a 55 años. 30 días, paso a paso." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/2fcf1ab2-dc41-4141-9538-a17677b21a68/id-preview-c4e3baf0--406f72f9-2b8a-4fad-9a19-797d2b4a6911.lovable.app-1781941269201.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/2fcf1ab2-dc41-4141-9538-a17677b21a68/id-preview-c4e3baf0--406f72f9-2b8a-4fad-9a19-797d2b4a6911.lovable.app-1781941269201.png" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "manifest", href: "/manifest.webmanifest" },
      { rel: "icon", href: "/icon-192.png", type: "image/png" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@500;600;700&display=swap" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <head><HeadContent /></head>
      <body>{children}<Scripts /></body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const router = useRouter();

  useEffect(() => { registerPWA(); }, []);

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((event) => {
      if (event !== "SIGNED_IN" && event !== "SIGNED_OUT" && event !== "USER_UPDATED") return;
      router.invalidate();
      if (event !== "SIGNED_OUT") queryClient.invalidateQueries();
    });
    return () => data.subscription.unsubscribe();
  }, [router, queryClient]);

  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <Outlet />
      </LanguageProvider>
      <Toaster position="top-center" richColors closeButton />
    </QueryClientProvider>
  );
}

