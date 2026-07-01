import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useState, type FormEvent } from "react";
import { Mail, Send, CheckCircle2, Loader2, AlertCircle } from "lucide-react";
import { PageShell, SectionTitle } from "../components/site/PageShell";
import emailjs from "@emailjs/browser";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Barath Gajendran" },
      {
        name: "description",
        content: "Get in touch with Barath Gajendran for projects, collaborations, or just a chat.",
      },
      { property: "og:title", content: "Contact — Barath Gajendran" },
      { property: "og:url", content: "/contact" },
    ],
    links: [
      { rel: "canonical", href: "/contact" },
      {
        rel: "icon",
        type: "image/svg+xml",
        href: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="%23E0A899" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>',
      },
    ],
  }),
  component: ContactPage,
});

type Form = { name: string; email: string; subject: string; message: string };
type Errs = Partial<Record<keyof Form, string>>;

function validate(f: Form): Errs {
  const e: Errs = {};
  if (!f.name.trim()) e.name = "Name is required";
  if (!f.email.trim()) e.email = "Email is required";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) e.email = "Invalid email";
  if (!f.subject.trim()) e.subject = "Subject is required";
  if (!f.message.trim()) e.message = "Message is required";
  else if (f.message.length < 10) e.message = "Tell me a bit more (10+ chars)";
  return e;
}

function ContactPage() {
  const [f, setF] = useState<Form>({ name: "", email: "", subject: "", message: "" });
  const [errs, setErrs] = useState<Errs>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [focus, setFocus] = useState<string | null>(null);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const v = validate(f);
    setErrs(v);
    if (Object.keys(v).length) return;
    setStatus("loading");
    try {
      await emailjs.send(
        "service_5atk8ga",
        "template_l21nu5g",
        {
          from_name: f.name,
          from_email: f.email,
          name: f.name,
          email: f.email,
          subject: f.subject,
          message: f.message,
        },
        "Q3dwEfJVwa4qCtSqA",
      );
      setStatus("success");
      setF({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setStatus("idle"), 4500);
    } catch (err) {
      console.error("EmailJS Error:", err);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4500);
    }
  };

  const field = (key: keyof Form, label: string, type = "text", textarea = false) => {
    const active = focus === key || f[key].length > 0;
    return (
      <div className="relative">
        <label
          className={`pointer-events-none absolute left-4 font-mono text-xs transition-all ${
            active ? "top-1.5 text-[10px] text-neon" : "top-4 text-muted-foreground"
          }`}
        >
          {label}
        </label>
        {textarea ? (
          <textarea
            rows={5}
            value={f[key]}
            onFocus={() => setFocus(key)}
            onBlur={() => setFocus(null)}
            onChange={(e) => setF({ ...f, [key]: e.target.value })}
            className="glass w-full resize-none rounded-2xl px-4 pb-3 pt-7 text-sm outline-none transition focus:border-neon focus:shadow-[0_0_30px_var(--color-neon)]"
          />
        ) : (
          <input
            type={type}
            value={f[key]}
            onFocus={() => setFocus(key)}
            onBlur={() => setFocus(null)}
            onChange={(e) => setF({ ...f, [key]: e.target.value })}
            className="glass w-full rounded-2xl px-4 pb-2 pt-6 text-sm outline-none transition focus:border-neon focus:shadow-[0_0_30px_var(--color-neon)]"
          />
        )}
        {errs[key] && <p className="mt-1 px-2 font-mono text-xs text-destructive">{errs[key]}</p>}
      </div>
    );
  };

  return (
    <PageShell variant="fade" className="mx-auto max-w-3xl px-6 pb-24">
      <SectionTitle
        kicker="Say hello"
        title="Let's talk"
        subtitle="Drop a line below — I read every message."
        icon={Mail}
      />

      <motion.form
        onSubmit={onSubmit}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="glass-strong space-y-4 rounded-3xl p-8"
      >
        <div className="grid gap-4 md:grid-cols-2">
          {field("name", "Your name")}
          {field("email", "Email", "email")}
        </div>
        {field("subject", "Subject")}
        {field("message", "Message", "text", true)}

        <button
          type="submit"
          disabled={status === "loading" || status === "success"}
          className={`relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-full px-6 py-4 font-display font-semibold transition hover:scale-[1.02] disabled:opacity-80 ${
            status === "error"
              ? "bg-gradient-to-r from-destructive to-destructive/80 text-destructive-foreground shadow-[0_0_30px_rgba(239,68,68,0.4)]"
              : "bg-gradient-to-r from-neon to-lime text-background shadow-[0_0_40px_var(--color-neon)]"
          }`}
        >
          <AnimatePresence mode="wait">
            {status === "idle" && (
              <motion.span
                key="i"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex items-center gap-2"
              >
                <Send className="h-4 w-4" /> Send Message
              </motion.span>
            )}
            {status === "loading" && (
              <motion.span
                key="l"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-2"
              >
                <Loader2 className="h-4 w-4 animate-spin" /> Sending…
              </motion.span>
            )}
            {status === "success" && (
              <motion.span
                key="s"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-2"
              >
                <CheckCircle2 className="h-4 w-4" /> Message sent!
              </motion.span>
            )}
            {status === "error" && (
              <motion.span
                key="e"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-2"
              >
                <AlertCircle className="h-4 w-4" /> Failed to send. Try again!
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </motion.form>
    </PageShell>
  );
}
