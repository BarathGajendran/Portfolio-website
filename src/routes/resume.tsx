import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Download, FileText, Eye, GraduationCap, Briefcase, Award, Code2 } from "lucide-react";
import { PageShell, SectionTitle } from "../components/site/PageShell";
import { MagneticButton } from "../components/site/MagneticButton";
import { SpotlightCard } from "../components/ui/SpotlightCard";

export const Route = createFileRoute("/resume")({
  head: () => ({
    meta: [
      { title: "Resume — Barath Gajendran" },
      { name: "description", content: "Download Barath Gajendran's résumé or browse role highlights." },
      { property: "og:title", content: "Resume — Barath Gajendran" },
      { property: "og:url", content: "/resume" },
    ],
    links: [
      { rel: "canonical", href: "/resume" },
      {
        rel: "icon",
        type: "image/svg+xml",
        href: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="%23E0A899" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/></svg>',
      },
    ],
  }),
  component: ResumePage,
});

function ResumePage() {
  return (
    <PageShell variant="parallax" className="mx-auto max-w-5xl px-6 pb-24">
      <SectionTitle
        kicker="Curriculum vitae"
        title="Resume"
        subtitle="A concise overview of experience, projects, and education."
        icon={FileText}
      />

      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto max-w-xl"
      >
        <SpotlightCard className="p-8 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)]">
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-4"
          >
            <div className="grid h-20 w-20 place-items-center rounded-2xl bg-gradient-to-br from-neon to-lime shadow-[0_0_40px_var(--color-neon)]">
              <FileText className="h-10 w-10 text-background" />
            </div>
            <h3 className="font-display text-2xl font-semibold">Barath's Resume</h3>

            <div className="mt-2 flex flex-wrap justify-center gap-3">
              <MagneticButton href="/Barath_Resume.pdf?download=1" download="Barath_Resume.pdf">
                <Download className="h-4 w-4" /> Download
              </MagneticButton>
              <a
                href="/Barath_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-neon/40 px-6 py-3 font-display font-semibold transition hover:border-[#E0A899] hover:text-[#E0A899]"
              >
                <Eye className="h-4 w-4" /> View PDF
              </a>
              <a
                href="#preview"
                className="inline-flex items-center gap-2 rounded-full border border-border/40 px-6 py-3 font-display font-semibold text-muted-foreground transition hover:border-neon/40 hover:text-foreground"
              >
                Highlights
              </a>
            </div>
          </motion.div>
        </SpotlightCard>
      </motion.div>

      {/* HIGHLIGHTS DASHBOARD PREVIEW */}
      <motion.div
        id="preview"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="glass mt-16 rounded-3xl p-8 space-y-8"
      >
        {/* STATS ROW (Idea 3) */}
        <div className="grid grid-cols-3 gap-4 border-b border-border/10 pb-6 text-center">
          <div className="space-y-1">
            <span className="block font-display text-2xl md:text-3xl font-bold text-neon">9+</span>
            <span className="block font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
              Projects Built
            </span>
          </div>
          <div className="space-y-1 border-x border-border/10">
            <span className="block font-display text-2xl md:text-3xl font-bold text-neon">16</span>
            <span className="block font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
              Certifications
            </span>
          </div>
          <div className="space-y-1">
            <span className="block font-display text-2xl md:text-3xl font-bold text-neon">3</span>
            <span className="block font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
              Languages
            </span>
          </div>
        </div>

        {/* 4 CLEAN SECTIONS SPLIT (Idea 1) */}
        <div className="grid gap-8 md:grid-cols-2">
          {/* LEFT SIDE: Education, Internships & Tech Badges */}
          <div className="space-y-8">
            {/* SECTION 1: Education */}
            <div>
              <h4 className="font-display font-semibold text-lg text-foreground flex items-center gap-2 mb-4">
                <GraduationCap className="h-5 w-5 text-neon" /> Education
              </h4>
              <ul className="space-y-4 text-sm text-muted-foreground font-sans pl-2 border-l border-neon/20 leading-relaxed">
                <li>
                  <b className="text-foreground block text-sm">B.Tech CSE (Business Systems)</b>
                  <span className="text-xs block">SMVEC, Puducherry · 2024–2028</span>
                  <span className="block text-xs font-semibold text-[#E0A899] mt-0.5">
                    Current CGPA: 8.62 / 10
                  </span>
                </li>
                <li>
                  <b className="text-foreground block text-sm">
                    Higher Secondary Certificate (HSC)
                  </b>
                  <span className="text-xs block">Seventh Day Adventist · Overall: 80%</span>
                </li>
              </ul>
            </div>

            {/* SECTION 2: Internships */}
            <div className="pt-6 border-t border-border/5">
              <h4 className="font-display font-semibold text-lg text-foreground flex items-center gap-2 mb-4">
                <Briefcase className="h-5 w-5 text-neon" /> Internships
              </h4>
              <p className="text-sm text-muted-foreground font-sans pl-2 border-l border-neon/20 leading-relaxed">
                Completed virtual professional internships through{" "}
                <b className="text-foreground">Forage & Eduskills</b>, building practical
                proficiency in software engineering and quantitative research.
              </p>
            </div>

            {/* SECTION 3: Tech Badges (Inside Left Column to Balance Heights) */}
            <div className="pt-6 border-t border-border/5">
              <h4 className="font-display font-bold text-xs uppercase tracking-wider text-muted-foreground mb-3">
                Core Stacks & Technologies
              </h4>
              <div className="flex flex-wrap gap-2">
                {[
                  "MERN Stack",
                  "Python",
                  "Machine Learning",
                  "Generative AI",
                  "FastAPI",
                  "Docker",
                  "Java",
                  "MySQL",
                  "Git & GitHub",
                ].map((tech) => (
                  <span
                    key={tech}
                    className="font-mono text-xs px-3 py-1 rounded-full bg-surface border border-border/20 text-foreground"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: Projects & Achievements */}
          <div className="space-y-8">
            {/* SECTION 4: Projects with Cards (Idea 2) */}
            <div>
              <h4 className="font-display font-semibold text-lg text-foreground flex items-center gap-2 mb-4">
                <Code2 className="h-5 w-5 text-neon" /> Featured Projects
              </h4>
              <div className="space-y-4">
                {/* Project Card 1 */}
                <a
                  href="https://github.com/BarathGajendran/Phish-Sentry-AI"
                  target="_blank"
                  rel="noreferrer"
                  className="block group p-4 rounded-2xl border border-border/10 bg-surface/20 hover:border-neon/30 hover:bg-surface/30 transition-all cursor-pointer"
                >
                  <span className="font-display font-bold text-sm text-foreground block group-hover:text-neon transition-colors">
                    Phish Sentry AI
                  </span>
                  <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
                    AI-powered phishing detection system using NLP to analyze and classify suspicious
                    emails with a React dashboard and BERT-backed classification pipeline.
                  </p>
                  <div className="mt-2.5 flex flex-wrap gap-1.5">
                    {["React", "Python", "BERT", "NLP"].map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-[9px] px-1.5 py-0.5 rounded bg-surface/40 border border-border/20 text-[#E0A899]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </a>

                {/* Project Card 2 */}
                <a
                  href="https://fooddelfrontend-five.vercel.app/"
                  target="_blank"
                  rel="noreferrer"
                  className="block group p-4 rounded-2xl border border-border/10 bg-surface/20 hover:border-neon/30 hover:bg-surface/30 transition-all cursor-pointer"
                >
                  <span className="font-display font-bold text-sm text-foreground block group-hover:text-neon transition-colors">
                    Food Delivery App
                  </span>
                  <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
                    Full-stack food delivery application featuring a dynamic menu catalog, shopping
                    cart, and Stripe payment integration.
                  </p>
                  <div className="mt-2.5 flex flex-wrap gap-1.5">
                    {["React", "Node.js", "MongoDB", "Stripe"].map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-[9px] px-1.5 py-0.5 rounded bg-surface/40 border border-border/20 text-[#E0A899]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </a>
              </div>
            </div>

            {/* SECTION 5: Achievements */}
            <div className="pt-6 border-t border-border/5">
              <h4 className="font-display font-semibold text-lg text-foreground flex items-center gap-2 mb-4">
                <Award className="h-5 w-5 text-neon" /> Achievements
              </h4>
              <ul className="space-y-3 text-sm text-muted-foreground font-sans pl-2 border-l border-neon/20 leading-relaxed list-disc list-inside">
                <li>
                  Earned <b className="text-foreground">16+ industry certifications</b> from Google,
                  AWS, Deloitte, and JP Morgan.
                </li>
                <li>
                  Shipped <b className="text-foreground">9+ real-world projects</b> using MERN,
                  Python, and Docker.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </motion.div>
    </PageShell>
  );
}
