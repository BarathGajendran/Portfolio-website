import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Github, Code2, Trophy, Cpu, ExternalLink, Linkedin, Link } from "lucide-react";
import { PageShell, SectionTitle } from "../components/site/PageShell";
import { SpotlightCard } from "../components/ui/SpotlightCard";

export const Route = createFileRoute("/profiles")({
  head: () => ({
    meta: [
      { title: "Coding Profiles — Barath Gajendran" },
      {
        name: "description",
        content: "Find me on GitHub, LeetCode, HackerRank, CodeChef and more.",
      },
      { property: "og:title", content: "Coding Profiles — Barath Gajendran" },
      { property: "og:url", content: "/profiles" },
    ],
    links: [
      { rel: "canonical", href: "/profiles" },
      {
        rel: "icon",
        type: "image/svg+xml",
        href: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="%23E0A899" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.45 1-1 1H4v2h16v-2h-5c-.55 0-1-.45-1-1v-2.34"/><path d="M12 2a5 5 0 0 0-5 5v3c0 3 2.5 5 5 5s5-2 5-5V7a5 5 0 0 0-5-5z"/></svg>',
      },
    ],
  }),
  component: ProfilesPage,
});

const profiles = [
  {
    name: "GitHub",
    handle: "@BarathGajendran",
    icon: Github,
    url: "https://github.com/BarathGajendran",
    hue: "#10ffb0",
  },
  {
    name: "LinkedIn",
    handle: "@barath-gajendran",
    icon: Linkedin,
    url: "https://www.linkedin.com/in/barath-gajendran",
    hue: "#a3e635",
  },
  {
    name: "LeetCode",
    handle: "@barath",
    icon: Code2,
    url: "https://leetcode.com/u/Barath28/",
    hue: "#10ffb0",
  },
  {
    name: "HackerRank",
    handle: "@barathg941",
    icon: Trophy,
    url: "https://www.hackerrank.com/profile/barathg941",
    hue: "#a3e635",
  },
  {
    name: "SkillRack",
    handle: "@barath",
    icon: Cpu,
    url: "https://skillrack.com",
    hue: "#10ffb0",
  },
  {
    name: "Linktree",
    handle: "@Barathgajendran",
    icon: Link,
    url: "https://linktr.ee/Barathgajendran",
    hue: "#a3e635",
  },
];

function ProfilesPage() {
  return (
    <PageShell variant="zoom" className="mx-auto max-w-6xl px-6 pb-24">
      <SectionTitle
        kicker="Find me online"
        title="Coding Profiles"
        subtitle="Where I sharpen my saw — and rack up the green squares."
        icon={Trophy}
      />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {profiles.map(({ name, handle, icon: Icon, url, hue }, i) => (
          <motion.a
            key={name}
            href={url}
            target="_blank"
            rel="noreferrer"
            initial={{ opacity: 0, scale: 0.85, y: 40 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, type: "spring", stiffness: 110, damping: 14 }}
            className="group block h-full animate-float"
            style={{ animationDelay: `${i * 0.3}s` }}
          >
            <SpotlightCard className="p-6 h-full relative">
              <div
                className="absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-30 blur-2xl transition group-hover:opacity-60"
                style={{ background: hue }}
              />
              <div
                className="grid h-12 w-12 place-items-center rounded-xl"
                style={{ background: `${hue}22`, color: hue }}
              >
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="mt-4 font-display text-xl font-semibold">{name}</h3>
              <p className="mt-1 font-mono text-xs text-muted-foreground">{handle}</p>
              <ExternalLink className="absolute right-5 top-5 h-4 w-4 text-muted-foreground transition group-hover:text-neon" />
            </SpotlightCard>
          </motion.a>
        ))}
      </div>
    </PageShell>
  );
}
