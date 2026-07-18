export type DeveloperStatus = {
  text: string;
  sub: string;
  colorClass: string;
};

const WORK_START_HOUR = 9;
const WORK_END_HOUR = 18;
const SIDE_PROJECT_START_HOUR = 18;
const SIDE_PROJECT_END_HOUR = 20;

export function getISTHour(date = new Date()): number {
  const hourPart = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Kolkata",
    hour: "numeric",
    hour12: false,
  }).formatToParts(date).find((part) => part.type === "hour");

  return Number(hourPart?.value ?? 0);
}

export function getDeveloperStatus(date = new Date()): DeveloperStatus {
  const hour = getISTHour(date);

  if (hour >= WORK_START_HOUR && hour < WORK_END_HOUR) {
    return {
      text: "Active & Building 💻",
      sub: "Working on projects or shipping features.",
      colorClass: "bg-neon shadow-[0_0_12px_var(--color-neon)]",
    };
  }

  if (hour >= SIDE_PROJECT_START_HOUR && hour < SIDE_PROJECT_END_HOUR) {
    return {
      text: "Side Project Mode 🚀",
      sub: "Exploring AI, open-source code, and designs until 8 PM IST.",
      colorClass: "bg-neon-soft shadow-[0_0_12px_var(--color-neon-soft)]",
    };
  }

  return {
    text: "Offline & Recharging 💤",
    sub: "Sleeping or dreaming in code. Back tomorrow morning!",
    colorClass: "bg-muted-foreground/40",
  };
}

export function formatISTClock(date = new Date()): string {
  return date.toLocaleTimeString("en-US", {
    timeZone: "Asia/Kolkata",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
}
