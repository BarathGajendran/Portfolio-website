import { motion } from "framer-motion";
import { Github, Linkedin, Twitter, Instagram } from "lucide-react";

const socials = [
  { Icon: Github, href: "https://github.com/BarathGajendran", label: "GitHub" },
  {
    Icon: Linkedin,
    href: "https://www.linkedin.com/in/barath-gajendran",
    label: "LinkedIn",
  },
  { Icon: Twitter, href: "https://x.com/barath1715", label: "Twitter" },
  { Icon: Instagram, href: "https://www.instagram.com/barath_1028/", label: "Instagram" },
];

export function Footer() {
  return (
    <footer className="relative mt-32 border-t border-border/60 px-6 py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 text-center">
        <div className="flex gap-3">
          {socials.map(({ Icon, href, label }, i) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -6, rotate: -8, scale: 1.1 }}
              className="grid h-11 w-11 place-items-center rounded-xl glass text-neon transition hover:shadow-[0_0_30px_var(--color-neon)]"
            >
              <Icon className="h-5 w-5" />
            </motion.a>
          ))}
        </div>
      </div>
    </footer>
  );
}
