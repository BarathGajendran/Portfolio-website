import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef } from "react";
import { PageShell, SectionTitle } from "../components/site/PageShell";
import { SpotlightCard } from "../components/ui/SpotlightCard";
import { CountUp } from "../components/ui/CountUp";
import { Sparkles, Brain, Code2, Database, Shield, Wrench, CheckCircle } from "lucide-react";

export const Route = createFileRoute("/skills")({
  head: () => ({
    meta: [
      { title: "Skills — Barath Gajendran" },
      {
        name: "description",
        content: "Technical skills across frontend, backend, AI/ML, databases, and tooling.",
      },
      { property: "og:title", content: "Skills — Barath Gajendran" },
      { property: "og:url", content: "/skills" },
    ],
    links: [
      { rel: "canonical", href: "/skills" },
      {
        rel: "icon",
        type: "image/svg+xml",
        href: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="%23E0A899" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',
      },
    ],
  }),
  component: SkillsPage,
});

interface Skill {
  name: string;
  level: number;
  desc: string;
  tools: string[];
}

interface Group {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  angleRange: [number, number]; // Polar angles for layout
  colorClass: string;
  hue: number;
  items: Skill[];
}

const groups: Group[] = [
  {
    title: "Frontend",
    icon: Code2,
    angleRange: [18, 90],
    colorClass: "text-neon border-neon/30",
    hue: 35, // Rose Gold
    items: [
      {
        name: "React.js",
        level: 90,
        desc: "Building dynamic single-page web applications and dashboard frontends with modern components.",
        tools: ["React.js", "JavaScript", "HTML5 & CSS3", "MERN Stack"],
      },
      {
        name: "Tailwind CSS",
        level: 92,
        desc: "Crafting fluid responsive layouts, custom utility-first UI components, and modern clean styling.",
        tools: ["Tailwind CSS", "Flexbox & Grid", "Responsive Design", "CSS Variables"],
      },
      {
        name: "Streamlit",
        level: 85,
        desc: "Developing fast, interactive data scripts and ML demo web applications in pure Python.",
        tools: ["Python UI", "Data Dashboards", "Session State", "Layout widgets"],
      },
    ],
  },
  {
    title: "Backend",
    icon: Shield,
    angleRange: [90, 162],
    colorClass: "text-neon-soft border-neon-soft/30",
    hue: 50, // Sunset Copper
    items: [
      {
        name: "Node.js & Express",
        level: 88,
        desc: "Creating robust server-side applications, routing architectures, and middleware APIs.",
        tools: ["Node.js", "Express.js", "REST APIs", "MERN Stack"],
      },
      {
        name: "Python (FastAPI/Flask)",
        level: 85,
        desc: "Implementing lightweight and ultra-fast asynchronous endpoints for machine learning servers.",
        tools: ["FastAPI", "Flask", "REST APIs", "Pydantic"],
      },
      {
        name: "Java",
        level: 80,
        desc: "Developing backend database-connected applications using JDBC and object-oriented architectures.",
        tools: ["Java SE", "JDBC", "OOP principles", "MySQL integration"],
      },
    ],
  },
  {
    title: "AI / ML",
    icon: Brain,
    angleRange: [162, 234],
    colorClass: "text-accent border-accent/30",
    hue: 85, // Warm Amber
    items: [
      {
        name: "Machine Learning",
        level: 85,
        desc: "Training models and performing classification, clustering, regression, and data preparation.",
        tools: ["Supervised", "Unsupervised", "Classification", "Clustering"],
      },
      {
        name: "Deep Learning",
        level: 80,
        desc: "Building neural network architectures, working with CNNs, and processing basic text data.",
        tools: ["Neural Networks", "CNNs", "NLP basics", "TensorFlow/Keras basics"],
      },
      {
        name: "Generative AI",
        level: 88,
        desc: "Prompt engineering, orchestrating multi-agent frameworks, and building apps via Gemini and Claude APIs.",
        tools: ["Prompt Engineering", "LLMs", "Claude API", "Gemini", "LangChain"],
      },
      {
        name: "Applied AI Models",
        level: 82,
        desc: "Implementing pre-trained models for state-of-the-art vision, speech, NLP, and agent workflows.",
        tools: ["BERT (used)", "YOLOv8 (used)", "Whisper (used)", "CrewAI (used)"],
      },
    ],
  },
  {
    title: "Database",
    icon: Database,
    angleRange: [234, 306],
    colorClass: "text-neon border-neon/30",
    hue: 120, // Muted Earth Green
    items: [
      {
        name: "MongoDB",
        level: 86,
        desc: "Designing document schemas, handling aggregations, and connecting databases via Mongoose ODM.",
        tools: ["NoSQL Model", "MERN Stack", "Mongoose", "Aggregation"],
      },
      {
        name: "MySQL",
        level: 82,
        desc: "Writing structured relational databases, designing SQL schemas, and connecting applications via JDBC.",
        tools: ["SQL Schemas", "JDBC Connection", "Relational Queries", "Data Normalization"],
      },
    ],
  },
  {
    title: "Tools / DevOps",
    icon: Wrench,
    angleRange: [306, 378],
    colorClass: "text-neon-soft border-neon-soft/30",
    hue: 300, // Lavender
    items: [
      {
        name: "Dev Tools",
        level: 90,
        desc: "Using standard development tools to edit code, collaborate on version branches, and package software.",
        tools: ["VS Code", "Git & GitHub", "PowerShell", "Postman", "npm / pip"],
      },
      {
        name: "Cloud & Deploy",
        level: 85,
        desc: "Hosting frontend apps, testing notebooks in browser, and publishing static pages or dashboard scripts.",
        tools: ["Netlify", "GitHub Pages", "Streamlit Cloud", "Google Colab"],
      },
      {
        name: "AI & Data Tools",
        level: 84,
        desc: "Managing local LLMs, loading pre-trained models, exploring datasets, and plotting statistics.",
        tools: [
          "Hugging Face",
          "Ollama",
          "Jupyter Notebook",
          "Pandas & NumPy",
          "Matplotlib & Seaborn",
        ],
      },
      {
        name: "Design & Docs",
        level: 80,
        desc: "Designing UI prototypes, crafting graphics, and presenting projects in premium dark theme decks.",
        tools: ["Figma (basic)", "Canva", "PowerPoint (advanced)"],
      },
    ],
  },
];

// Helper to convert polar coordinates to SVG Cartesian
const polarToCartesian = (
  centerX: number,
  centerY: number,
  radius: number,
  angleInDegrees: number,
) => {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  };
};

function SkillsPage() {
  const [activeGroupIndex, setActiveGroupIndex] = useState(0);
  const [hoveredSkill, setHoveredSkill] = useState<Skill | null>(null);
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(groups[0].items[0]);

  const centerX = 230;
  const centerY = 230;
  const maxRadius = 190;

  // Concentric circle layers
  const rings = [
    { label: "Core Stack", radius: 70, desc: "Production ready, expert level" },
    { label: "Battle Tested", radius: 130, desc: "Advanced level, shipped in systems" },
    { label: "Familiar / Explored", radius: 190, desc: "Intermediate/exploration level" },
  ];

  const activeGroup = groups[activeGroupIndex];

  // Helper to map skill level to polar radius
  const getSkillRadius = (level: number) => {
    // 100% level -> closer to center (70px)
    // 60% level -> further from center (190px)
    const factor = (100 - level) / 40; // 0 to 1 range
    return 70 + factor * (190 - 70);
  };

  return (
    <PageShell variant="blur" className="mx-auto max-w-6xl px-6 pb-24">
      <SectionTitle
        kicker="Capabilities"
        title="Technical Skills"
        subtitle="An interactive constellation map of my technical stack and expertise."
        icon={Sparkles}
      />

      {/* Categories Selector */}
      <div className="flex flex-wrap gap-2 justify-center mb-12">
        {groups.map((g, idx) => {
          const Icon = g.icon;
          const isActive = idx === activeGroupIndex;
          return (
            <button
              key={g.title}
              onClick={() => {
                setActiveGroupIndex(idx);
                setSelectedSkill(g.items[0]);
              }}
              data-cursor-text={`OPEN ${g.title.toUpperCase()}`}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-mono font-semibold transition border ${
                isActive
                  ? "bg-neon text-background border-neon shadow-[0_0_20px_var(--color-neon)]"
                  : "glass text-muted-foreground border-border/40 hover:border-neon-soft hover:text-foreground"
              }`}
            >
              <Icon className="h-4 w-4" />
              {g.title}
            </button>
          );
        })}
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr] items-center">
        {/* LEFT COLUMN: INTERACTIVE SVG CONSTELLATION MAP */}
        <SpotlightCard className="flex items-center justify-center p-6 min-h-[460px] select-none">
          <div className="relative w-full max-w-[460px] aspect-square">
            <svg viewBox="0 0 460 460" className="w-full h-full" style={{ overflow: "visible" }}>
              {/* Polar dividers */}
              {groups.map((g, idx) => {
                const angle = (g.angleRange[0] + g.angleRange[1]) / 2;
                const outerPt = polarToCartesian(centerX, centerY, maxRadius + 15, angle);
                const isActive = idx === activeGroupIndex;
                return (
                  <g key={g.title}>
                    <line
                      x1={centerX}
                      y1={centerY}
                      x2={outerPt.x}
                      y2={outerPt.y}
                      stroke="var(--color-border)"
                      strokeWidth={1}
                      strokeDasharray="4 6"
                      className="opacity-40"
                    />
                    {/* Category Label at outer node */}
                    <text
                      x={outerPt.x}
                      y={outerPt.y}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      className={`font-mono text-[9px] font-bold tracking-widest uppercase transition-all duration-300 ${
                        isActive ? "fill-neon scale-105" : "fill-muted-foreground/60"
                      }`}
                    >
                      {g.title}
                    </text>
                  </g>
                );
              })}

              {/* Concentric rings */}
              {rings.map((r) => (
                <g key={r.label}>
                  <circle
                    cx={centerX}
                    cy={centerY}
                    r={r.radius}
                    fill="none"
                    stroke="var(--color-border)"
                    strokeWidth={1}
                    className="opacity-30"
                  />
                  {/* Small ring helper label */}
                  <text
                    x={centerX + 2}
                    y={centerY - r.radius - 6}
                    className="font-mono text-[8px] fill-muted-foreground/40 uppercase tracking-wider"
                  >
                    {r.label}
                  </text>
                </g>
              ))}

              {/* DRAW CONSTELLATION LINES (connecting all skills in the category) */}
              {groups.map((g, groupIdx) => {
                const isCurrent = groupIdx === activeGroupIndex;
                const points = g.items.map((item, idx) => {
                  const angleStep = (g.angleRange[1] - g.angleRange[0]) / (g.items.length - 1);
                  const angle = g.angleRange[0] + idx * angleStep;
                  const r = getSkillRadius(item.level);
                  return polarToCartesian(centerX, centerY, r, angle);
                });

                // Generate path string
                let d = "";
                points.forEach((p, idx) => {
                  if (idx === 0) d += `M ${p.x} ${p.y}`;
                  else d += ` L ${p.x} ${p.y}`;
                });
                if (points.length > 2) {
                  d += " Z"; // Close the constellation loop
                }

                return (
                  <motion.path
                    key={g.title}
                    d={d}
                    fill={isCurrent ? `oklch(0.80 0.10 ${g.hue} / 0.03)` : "none"}
                    stroke={`oklch(0.80 0.10 ${g.hue} / ${isCurrent ? 0.35 : 0.08})`}
                    strokeWidth={isCurrent ? 1.5 : 1}
                    strokeDasharray={isCurrent ? "none" : "3 3"}
                    className="transition-all duration-500"
                    animate={isCurrent ? { strokeWidth: [1.5, 2, 1.5] } : {}}
                    transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                  />
                );
              })}

              {/* DRAW SKILLS STARS (NODES) */}
              {groups.map((g, groupIdx) => {
                const isCurrent = groupIdx === activeGroupIndex;
                return g.items.map((item, itemIdx) => {
                  const angleStep = (g.angleRange[1] - g.angleRange[0]) / (g.items.length - 1);
                  const angle = g.angleRange[0] + itemIdx * angleStep;
                  const r = getSkillRadius(item.level);
                  const pt = polarToCartesian(centerX, centerY, r, angle);

                  const isHovered = hoveredSkill?.name === item.name;
                  const isSelected = selectedSkill?.name === item.name;

                  return (
                    <g
                      key={item.name}
                      onClick={() => setSelectedSkill(item)}
                      onMouseEnter={() => setHoveredSkill(item)}
                      onMouseLeave={() => setHoveredSkill(null)}
                      data-cursor-text={item.name.split(" ")[0]}
                      className="cursor-pointer"
                    >
                      {/* Interactive Star Glow Halo */}
                      <AnimatePresence>
                        {(isHovered || isSelected) && (
                          <motion.circle
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0, opacity: 0 }}
                            cx={pt.x}
                            cy={pt.y}
                            r={15}
                            fill={`oklch(0.80 0.10 ${g.hue} / 0.15)`}
                            className="transition-all duration-300"
                          />
                        )}
                      </AnimatePresence>

                      {/* Main star node */}
                      <circle
                        cx={pt.x}
                        cy={pt.y}
                        r={isCurrent ? (isSelected ? 6 : 4.5) : 3.5}
                        fill={
                          isCurrent
                            ? isSelected
                              ? "var(--color-background)"
                              : `oklch(0.80 0.10 ${g.hue})`
                            : "var(--color-border)"
                        }
                        stroke={isCurrent && isSelected ? `oklch(0.80 0.10 ${g.hue})` : "none"}
                        strokeWidth={2}
                        className="transition-all duration-300"
                      />

                      {/* Star label */}
                      <text
                        x={pt.x}
                        y={pt.y - 9}
                        textAnchor="middle"
                        className={`font-mono text-[8px] tracking-wider fill-foreground transition-all duration-300 ${
                          isCurrent
                            ? isSelected || isHovered
                              ? "opacity-100 font-bold fill-neon"
                              : "opacity-45"
                            : "opacity-0"
                        }`}
                      >
                        {item.name}
                      </text>
                    </g>
                  );
                });
              })}

              {/* Center Core Core Marker */}
              <circle
                cx={centerX}
                cy={centerY}
                r={4}
                fill="var(--color-foreground)"
                className="opacity-80"
              />
            </svg>
          </div>
        </SpotlightCard>

        {/* RIGHT COLUMN: DETAIL PANEL */}
        <div className="flex flex-col gap-6">
          <SpotlightCard className="p-8 min-h-[300px] flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-xl bg-neon/10 text-neon border border-neon/20`}>
                  <Sparkles className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-display text-2xl font-bold tracking-tight">
                    {selectedSkill ? selectedSkill.name : activeGroup.title}
                  </h3>
                  <span className="font-mono text-[10px] text-neon uppercase tracking-widest mt-1 inline-block">
                    {activeGroup.title} STACK
                  </span>
                </div>
              </div>

              {selectedSkill ? (
                <div className="mt-6">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {selectedSkill.desc}
                  </p>

                  <div className="mt-6">
                    <span className="font-mono text-[9px] text-muted-foreground uppercase tracking-widest block mb-2">
                      Sub-Tools & Core Concepts
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedSkill.tools.map((t) => (
                        <span
                          key={t}
                          className="font-mono text-[10px] px-2.5 py-1 rounded-md bg-surface border border-border/20 text-muted-foreground"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <p className="mt-6 text-sm text-muted-foreground leading-relaxed">
                  Select any node on the star map to display detailed project experience, stack
                  level details, and sub-tools.
                </p>
              )}
            </div>
          </SpotlightCard>

          {/* Mini-list of skills for quick reading & clicking */}
          <div className="glass rounded-3xl p-6">
            <h4 className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest mb-3">
              Skills in this category
            </h4>
            <div className="grid gap-2 sm:grid-cols-2">
              {activeGroup.items.map((item) => {
                const isSelected = selectedSkill?.name === item.name;
                return (
                  <button
                    key={item.name}
                    onClick={() => setSelectedSkill(item)}
                    onMouseEnter={() => setHoveredSkill(item)}
                    onMouseLeave={() => setHoveredSkill(null)}
                    data-cursor-text={item.name.split(" ")[0]}
                    className={`flex items-center justify-between p-3 rounded-2xl border text-left text-xs transition-all ${
                      isSelected
                        ? "bg-neon/5 border-neon/50 text-foreground"
                        : "bg-surface/30 border-border/30 text-muted-foreground hover:border-neon-soft/50 hover:text-foreground"
                    }`}
                  >
                    <span className="font-semibold">{item.name}</span>
                    {isSelected && <CheckCircle className="h-4 w-4 text-neon" />}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Stats Wrap */}
      <div className="mt-16 grid gap-4 sm:grid-cols-3">
        {[
          { label: "Certifications", n: 16 },
          { label: "Projects shipped", n: 5 },
          { label: "AI Models Built", n: 3 },
        ].map((s, i) => (
          <SpotlightCard key={s.label} className="p-8 text-center">
            <div className="font-display text-5xl font-bold neon-text">
              <CountUp end={s.n} />+
            </div>
            <p className="mt-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              {s.label}
            </p>
          </SpotlightCard>
        ))}
      </div>
    </PageShell>
  );
}
