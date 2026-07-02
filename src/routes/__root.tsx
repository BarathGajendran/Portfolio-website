import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { Home, FolderGit, Sparkles, FileText, Trophy, Mail } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

import appCss from "../styles.css?url";
import { Nav } from "../components/site/Nav";
import { Footer } from "../components/site/Footer";
import { CustomCursor } from "../components/site/CustomCursor";
import { ScrollProgress } from "../components/site/ScrollProgress";
import { BackToTop } from "../components/site/BackToTop";
import { CosmicDust } from "../components/site/CosmicDust";

function NotFoundComponent() {
  return (
    <div className="relative flex min-h-screen items-center justify-center px-4">
      <div className="max-w-md text-center">
        <motion.h1
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="font-display text-[8rem] font-bold leading-none neon-text"
        >
          404
        </motion.h1>
        <h2 className="mt-2 text-xl font-semibold">Lost in the matrix</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for has drifted into another dimension.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex rounded-full bg-gradient-to-r from-neon to-lime px-5 py-2.5 text-sm font-semibold text-background shadow-[0_0_30px_var(--color-neon)]"
          >
            Take me home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="glass-strong max-w-md rounded-2xl p-8 text-center">
        <h1 className="text-xl font-semibold">This page didn't load</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something glitched. Try again or head home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="rounded-full bg-gradient-to-r from-neon to-lime px-4 py-2 text-sm font-semibold text-background"
          >
            Try again
          </button>
          <a href="/" className="rounded-full border border-border px-4 py-2 text-sm">
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Barath Gajendran — Full Stack Developer & AI Enthusiast" },
      {
        name: "description",
        content:
          "Portfolio of Barath Gajendran — Full Stack Developer, AI Enthusiast, and Problem Solver. Crafting cinematic web experiences.",
      },
      { name: "author", content: "Barath Gajendran" },
      { name: "theme-color", content: "#10ffb0" },
      { property: "og:title", content: "Barath Gajendran — Full Stack Developer & AI Enthusiast" },
      {
        property: "og:description",
        content:
          "Cinematic portfolio of a developer crafting interactive, performant web experiences.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <HeadContent />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('portfolio_theme');
                  if (theme && theme !== 'espresso') {
                    document.documentElement.classList.add('theme-' + theme);
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function LoadingScreen({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDone, 1400);
    return () => clearTimeout(t);
  }, [onDone]);
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, filter: "blur(20px)" }}
      transition={{ duration: 0.7 }}
      className="fixed inset-0 z-[9999] grid place-items-center bg-background"
    >
      <div className="text-center">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 120, damping: 12 }}
          className="mx-auto grid h-20 w-20 place-items-center rounded-2xl bg-gradient-to-br from-neon to-lime font-display text-4xl font-bold text-background shadow-[0_0_60px_var(--color-neon)]"
        >
          B
        </motion.div>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-4 font-mono text-xs uppercase tracking-[0.4em] text-muted-foreground"
        >
          Initializing…
        </motion.p>
      </div>
    </motion.div>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [loading, setLoading] = useState(true);

  return (
    <QueryClientProvider client={queryClient}>
      <AnimatePresence>
        {loading && <LoadingScreen key="loader" onDone={() => setLoading(false)} />}
      </AnimatePresence>

      <CosmicDust />
      <ScrollProgress />
      <CustomCursor />
      <Nav />

      <AnimatePresence mode="wait">
        <div key={pathname}>
          <Outlet />
          <Footer />
        </div>
      </AnimatePresence>

      <BackToTop />
    </QueryClientProvider>
  );
}
