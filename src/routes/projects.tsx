import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState, type MouseEvent } from "react";
import { Github, ExternalLink, FolderGit } from "lucide-react";
import { PageShell, SectionTitle } from "../components/site/PageShell";
import { SpotlightCard } from "../components/ui/SpotlightCard";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects — Barath Gajendran" },
      {
        name: "description",
        content: "Selected projects across full-stack, AI, and creative engineering.",
      },
      { property: "og:title", content: "Projects — Barath Gajendran" },
      { property: "og:url", content: "/projects" },
    ],
    links: [
      { rel: "canonical", href: "/projects" },
      {
        rel: "icon",
        type: "image/svg+xml",
        href: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="%23E0A899" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/><path d="m10 10 3 3-3 3"/></svg>',
      },
    ],
  }),
  component: ProjectsPage,
});

type Project = {
  title: string;
  desc: string;
  tags: string[];
  category: "Web" | "AI" | "CV";
  github: string;
  demo: string;
  hue: string;
};

const projects: Project[] = [
  {
    title: "Phish Sentry AI",
    desc: "AI-powered phishing detection system utilizing natural language processing to analyse and classify suspicious emails.",
    tags: ["React", "Python", "BERT", "NLP"],
    category: "AI",
    github: "https://github.com/BarathGajendran/Phish-Sentry-AI",
    demo: "https://phish-sentry-ai.netlify.app/",
    hue: "var(--color-neon)",
  },
  {
    title: "Food Delivery App",
    desc: "Full-stack food delivery application featuring a dynamic menu catalog, shopping cart, and Stripe payment integration.",
    tags: ["React", "Node.js", "MongoDB", "Stripe"],
    category: "Web",
    github: "https://github.com/BarathGajendran/food_del_fullstack",
    demo: "https://fooddelfrontend-five.vercel.app/",
    hue: "var(--color-lime)",
  },
  {
    title: "ShopsHere E-Commerce",
    desc: "Premium e-commerce shopping experience with product filtering, product detail views, persistent cart, and checkout flow.",
    tags: ["React", "Redux", "Tailwind CSS"],
    category: "Web",
    github: "https://github.com/BarathGajendran/E-Commerce-Shopshere-",
    demo: "https://e-commerce-shopshere-frontend.vercel.app/",
    hue: "var(--color-neon-soft)",
  },
  {
    title: "SaaS Subscription Platform",
    desc: "SaaS subscription dashboard layout with detailed pricing tables, dashboard telemetry graphs, and user auth routing.",
    tags: ["React", "TypeScript", "Tailwind CSS"],
    category: "Web",
    github: "https://github.com/BarathGajendran/Saas-Subscription",
    demo: "https://saas-subscription-frontend-pi.vercel.app/",
    hue: "var(--color-neon)",
  },
  {
    title: "Expense Tracker",
    desc: "Interactive personal budgeting app that tracks income, categories expenditures, and displays monthly cost trends.",
    tags: ["React", "Chart.js", "LocalStorage"],
    category: "Web",
    github: "https://github.com/BarathGajendran/Expense-Tracker",
    demo: "https://expense-tracker-zeta-swart.vercel.app/",
    hue: "var(--color-lime)",
  },
  {
    title: "Chatbot Learning",
    desc: "Interactive AI chatbot application powered by LLMs for automated learning and query resolution.",
    tags: ["Streamlit", "Python", "LangChain", "LLM"],
    category: "AI",
    github: "https://github.com/BarathGajendran/Chatbot-Learning",
    demo: "https://chatbot-learning-esjyftqfawoarg3xiup8ow.streamlit.app/",
    hue: "var(--color-neon-soft)",
  },
  {
    title: "Traffic Intelligence",
    desc: "AI-powered traffic flow analytics and vehicle intelligence platform hosted on Hugging Face Spaces (Login: admin / admin123).",
    tags: ["Python", "YOLO", "Gradio", "HuggingFace"],
    category: "CV",
    github: "https://github.com/BarathGajendran/Traffic-Intelligence-System",
    demo: "https://barath1028-traffic-intelligence.hf.space",
    hue: "var(--color-neon)",
  },
  {
    title: "Resume Builder",
    desc: "Interactive résumé builder web application featuring template customisation and real-time preview options.",
    tags: ["React", "CSS", "LocalStorage"],
    category: "AI",
    github: "https://github.com/BarathGajendran/Resume-Builder",
    demo: "https://resume-builder-ui-interface.netlify.app/",
    hue: "var(--color-lime)",
  },
  {
    title: "ASL Realtime Translator",
    desc: "Real-time American Sign Language (ASL) translator application using computer vision and machine learning for gesture recognition.",
    tags: ["Python", "OpenCV", "MediaPipe", "TensorFlow"],
    category: "CV",
    github: "https://github.com/BarathGajendran/ASL-Translator",
    demo: "https://asl-realtime-translator.onrender.com",
    hue: "var(--color-neon-soft)",
  },
];

const categories = ["All", "Web", "AI", "CV"] as const;

function ProjectCard({ p, i }: { p: Project; i: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: i * 0.08, duration: 0.6 }}
      className="h-full"
    >
      <SpotlightCard className="p-6 flex flex-col justify-between h-full">
        <div>
          <div
            className="mb-5 flex h-44 items-center justify-center rounded-2xl border border-border bg-surface text-5xl font-display font-bold"
            style={{
              background: `linear-gradient(135deg, color-mix(in oklch, ${p.hue} 13%, transparent), transparent)`,
              color: p.hue,
            }}
          >
            {p.title
              .split(" ")
              .map((w) => w[0])
              .join("")}
          </div>
          <p className="font-mono text-[10px] uppercase tracking-widest text-neon">{p.category}</p>
          <h3 className="mt-1 font-display text-xl font-semibold">{p.title}</h3>
          <p className="mt-2 text-sm text-muted-foreground">{p.desc}</p>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {p.tags.map((t) => (
              <span
                key={t}
                className="rounded-full border border-border bg-surface px-2 py-0.5 font-mono text-[10px] text-muted-foreground"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
        <div className="mt-5 flex gap-3 pt-4 border-t border-border/10">
          <a
            href={p.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition hover:text-neon"
          >
            <Github className="h-4 w-4" /> Code
          </a>
          <a
            href={p.demo}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition hover:text-neon"
          >
            <ExternalLink className="h-4 w-4" /> Demo
          </a>
        </div>
      </SpotlightCard>
    </motion.div>
  );
}

function ProjectsPage() {
  const [active, setActive] = useState<(typeof categories)[number]>("All");
  const list = active === "All" ? projects : projects.filter((p) => p.category === active);

  return (
    <PageShell variant="slide" className="mx-auto max-w-7xl px-6 pb-24">
      <SectionTitle
        kicker="Selected work"
        title="Projects"
        subtitle="A snapshot of things I've built — products, experiments, and side quests."
        icon={FolderGit}
      />

      <div className="mb-10 flex flex-wrap justify-center gap-2">
        {categories.map((c) => (
          <motion.button
            key={c}
            onClick={() => setActive(c)}
            whileTap={{ scale: 0.95 }}
            className={`rounded-full px-4 py-1.5 text-sm font-mono transition ${
              active === c
                ? "bg-gradient-to-r from-neon to-lime text-background shadow-[0_0_24px_var(--color-neon)]"
                : "glass text-muted-foreground hover:text-foreground"
            }`}
          >
            {c}
          </motion.button>
        ))}
      </div>

      <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((p, i) => (
          <ProjectCard key={p.title} p={p} i={i} />
        ))}
      </motion.div>
    </PageShell>
  );
}
