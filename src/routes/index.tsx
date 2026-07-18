import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useEffect, useState, lazy, Suspense } from "react";
import {
  ArrowRight,
  Sparkles,
  Code2,
  Brain,
  Rocket,
  Award,
  GraduationCap,
  FileBadge,
  Globe,
  Cloud,
  Building2,
  Shield,
  Briefcase,
} from "lucide-react";
import { PageShell, SectionTitle } from "../components/site/PageShell";
import { Blobs } from "../components/site/Blobs";
import { MagneticButton } from "../components/site/MagneticButton";
import { Dashboard } from "../components/site/Dashboard";
import { SpotlightCard } from "../components/ui/SpotlightCard";
import { CountUp } from "../components/ui/CountUp";

// HeroScene removed

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Barath Gajendran — Portfolio" },
      {
        name: "description",
        content:
          "Hi, I'm Barath Gajendran. Full Stack Developer, AI/ML Enthusiast, and Problem Solver building cinematic, performant web experiences.",
      },
      { property: "og:title", content: "Barath Gajendran — Portfolio" },
      {
        property: "og:description",
        content:
          "Cinematic portfolio of a developer crafting interactive, performant web experiences.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [
      { rel: "canonical", href: "/" },
      {
        rel: "icon",
        type: "image/svg+xml",
        href: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="%23E0A899" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>',
      },
    ],
  }),
  component: Index,
});

const titles = ["Full Stack Developer", "AI/ML Enthusiast", "Problem Solver", "Creative Coder"];

function Typewriter() {
  const [i, setI] = useState(0);
  const [text, setText] = useState("");
  const [del, setDel] = useState(false);

  useEffect(() => {
    const current = titles[i];
    const speed = del ? 40 : 80;
    const t = setTimeout(() => {
      if (!del) {
        const next = current.slice(0, text.length + 1);
        setText(next);
        if (next === current) setTimeout(() => setDel(true), 1400);
      } else {
        const next = current.slice(0, text.length - 1);
        setText(next);
        if (next === "") {
          setDel(false);
          setI((i + 1) % titles.length);
        }
      }
    }, speed);
    return () => clearTimeout(t);
  }, [text, del, i]);

  return (
    <span className="font-mono text-neon">
      {text}
      <span className="inline-block w-[2px] animate-pulse bg-neon">&nbsp;</span>
    </span>
  );
}

const achievements = [
  {
    icon: FileBadge,
    number: 16,
    suffix: "+",
    label: "Certifications",
    desc: "Google, Anthropic, AWS, Deloitte, JP Morgan & more.",
  },
  {
    icon: Rocket,
    number: 9,
    suffix: "+",
    label: "Projects Shipped",
    desc: "From computer vision trackers to multi-agent AI pipelines.",
  },
  {
    icon: Brain,
    number: 4,
    suffix: "+",
    label: "AI & CV Models",
    desc: "NLP classifiers, YOLO detection & sign language translators.",
  },
  {
    icon: Globe,
    number: 3,
    suffix: "",
    label: "Languages Spoken",
    desc: "Fluent in English, Tamil, and learning French.",
  },
];

function Index() {
  return (
    <PageShell variant="zoom" className="overflow-hidden">
      {/* HERO */}
      <section className="relative flex min-h-screen items-center justify-center px-6">
        <Blobs />

        <div className="relative z-10 mx-auto grid max-w-6xl gap-12 md:grid-cols-[1.4fr_1fr] md:items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-mono"
            >
              <span className="h-2 w-2 animate-pulse rounded-full bg-neon shadow-[0_0_10px_var(--color-neon)]" />
              Available for new projects
            </motion.div>

            <h1 className="mt-6 font-display text-5xl font-light leading-[1.08] md:text-7xl tracking-tight">
              <div className="overflow-hidden block py-1">
                <motion.span
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{ type: "spring", stiffness: 70, damping: 15, delay: 0.3 }}
                  className="block"
                >
                  Hi, I'm <span className="neon-text italic font-medium">Barath</span>
                </motion.span>
              </div>
              <div className="overflow-hidden block py-1">
                <motion.span
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{ type: "spring", stiffness: 70, damping: 15, delay: 0.45 }}
                  className="block"
                >
                  Gajendran
                </motion.span>
              </div>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 }}
              className="mt-6 max-w-xl text-lg text-muted-foreground"
            >
              <Typewriter /> — crafting cinematic interfaces, intelligent systems, and pixel-perfect
              experiences.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.75 }}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <MagneticButton href="/contact" data-cursor-text="SAY HI">
                Hire Me <ArrowRight className="h-4 w-4" />
              </MagneticButton>
              <Link
                to="/projects"
                data-cursor-text="WORK"
                className="group inline-flex items-center gap-2 rounded-full border border-neon/40 px-6 py-3 font-display font-semibold text-foreground transition hover:border-neon hover:text-neon"
              >
                View Work
                <Sparkles className="h-4 w-4 transition group-hover:rotate-12" />
              </Link>
            </motion.div>
          </div>

          {/* Profile glow */}
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
            className="relative mx-auto"
          >
            <div className="relative h-64 w-64 rounded-full bg-gradient-to-br from-neon to-lime p-1 md:h-80 md:w-80 shadow-glow-sm">
              <div className="grid h-full w-full place-items-center rounded-full bg-background">
                <div className="font-display text-8xl font-bold neon-text">BG</div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 font-mono text-xs text-muted-foreground"
        >
          <span className="block animate-bounce">scroll ↓</span>
        </motion.div>
      </section>

      {/* DASHBOARD */}
      <section className="relative mx-auto max-w-6xl px-6 pt-16 pb-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Dashboard />
        </motion.div>
      </section>

      {/* ABOUT */}
      <section className="relative mx-auto max-w-6xl px-6 py-32">
        <SectionTitle
          kicker="About me"
          title="The story so far"
          subtitle="Engineer by trade, designer by obsession, problem-solver by nature."
          icon={Brain}
        />

        <div className="grid gap-6 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="h-full"
          >
            <SpotlightCard className="p-8 h-fit md:h-[280px] flex flex-col justify-center">
              <div className="w-full">
                <h3 className="font-display text-2xl font-semibold">Intro</h3>
                <p className="mt-4 font-tech text-sm leading-relaxed text-foreground/90 tracking-wide font-normal">
                  I'm Barath, a Computer Science student passionate about building intelligent,
                  end-to-end web solutions. I specialize in Full Stack Development and AI/ML —
                  turning ideas into real, deployable products. From RESTful APIs to BERT-powered
                  models, I bridge the gap between backend logic and machine learning. I build
                  smart. I build full. I build end-to-end. I build with purpose. I build for impact.
                  I build for the future.
                </p>
              </div>
            </SpotlightCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="h-full"
          >
            <SpotlightCard className="p-8 h-[280px] md:h-[280px] overflow-hidden">
              <div className="flex flex-col h-full w-full">
                <h3 className="font-display text-2xl font-semibold flex items-center gap-2 flex-shrink-0 border-b border-border/10 pb-2.5">
                  <GraduationCap className="h-5 w-5 text-neon" /> Education & Certifications
                </h3>

                <div className="flex-1 overflow-y-auto pr-1 scroll-container mt-4 space-y-4 text-sm">
                  {/* EDUCATION SECTION */}
                  <div>
                    <span className="font-mono text-xs uppercase tracking-wider text-neon block mb-2">
                      Education
                    </span>
                    <div className="pl-3 border-l border-neon/30">
                      <span className="font-display text-base font-semibold text-foreground">
                        Currently Pursuing B.Tech in CSE (Business Systems)
                      </span>
                      <p className="font-sans text-xs text-muted-foreground mt-0.5">
                        Specialization in Full Stack & AI/ML
                      </p>
                    </div>
                  </div>

                  {/* CERTIFICATIONS SECTION */}
                  <div className="pt-3 border-t border-border/10">
                    <span className="font-mono text-xs uppercase tracking-wider text-neon block mb-2">
                      Certifications
                    </span>
                    <div className="space-y-3 pl-3 border-l border-neon/30">
                      <div className="flex gap-2.5 items-start">
                        <Cloud className="h-4 w-4 text-neon mt-0.5 flex-shrink-0" />
                        <div>
                          <span className="font-display text-[15px] font-semibold text-foreground block">
                            Cloud & AI
                          </span>
                          <p className="font-sans text-xs text-muted-foreground mt-0.5">
                            Google GenAI, Vertex AI, AWS ML, Claude in Action
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2.5 items-start">
                        <Building2 className="h-4 w-4 text-neon mt-0.5 flex-shrink-0" />
                        <div>
                          <span className="font-display text-[15px] font-semibold text-foreground block">
                            Industry & Corporate
                          </span>
                          <p className="font-sans text-xs text-muted-foreground mt-0.5">
                            Deloitte, JP Morgan, Adv. Software Engineering
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2.5 items-start">
                        <Shield className="h-4 w-4 text-neon mt-0.5 flex-shrink-0" />
                        <div>
                          <span className="font-display text-[15px] font-semibold text-foreground block">
                            Dev & Security
                          </span>
                          <p className="font-sans text-xs text-muted-foreground mt-0.5">
                            Android Developer, Cyber Security, Data Analytics
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2.5 items-start">
                        <Briefcase className="h-4 w-4 text-neon mt-0.5 flex-shrink-0" />
                        <div>
                          <span className="font-display text-[15px] font-semibold text-foreground block">
                            Internships & Learning
                          </span>
                          <p className="font-sans text-xs text-muted-foreground mt-0.5">
                            AI-ML Virtual Internship, Infosys Springboard
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SpotlightCard>
          </motion.div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {achievements.map(({ icon: Icon, number, suffix, label, desc }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="h-full"
            >
              <SpotlightCard className="p-6 h-full hover:border-neon/40 group">
                <Icon className="h-6 w-6 text-neon transition group-hover:scale-110" />
                <h4 className="mt-4 font-display font-semibold text-2xl">
                  {number > 0 && <CountUp end={number} />}
                  {number > 0 && suffix} {label}
                </h4>
                <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative mx-auto max-w-5xl px-6 py-32 text-center">
        <Blobs />
        <motion.h2
          initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="text-balance font-display text-5xl font-bold leading-tight md:text-7xl"
        >
          Let's build something <span className="neon-text">amazing</span>
        </motion.h2>
        <p className="mx-auto mt-6 max-w-xl text-muted-foreground">
          Got an idea worth chasing? Let's turn it into something people remember.
        </p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-10 flex justify-center"
        >
          <MagneticButton href="/contact" data-cursor-text="SAY HI">
            Hire Me <ArrowRight className="h-4 w-4" />
          </MagneticButton>
        </motion.div>
      </section>
    </PageShell>
  );
}
