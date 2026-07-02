import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

const RESUME_FILENAME = "Barath_Resume.pdf";

async function readResumePdf(): Promise<Buffer> {
  const candidates = [
    join(process.cwd(), "public", RESUME_FILENAME),
    join(process.cwd(), ".output", "public", RESUME_FILENAME),
  ];

  for (const path of candidates) {
    try {
      return await readFile(path);
    } catch {
      // try next location
    }
  }

  throw new Error("Resume PDF not found");
}

export const Route = createFileRoute("/Barath_Resume.pdf")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        try {
          const pdf = await readResumePdf();
          const download = new URL(request.url).searchParams.get("download") === "1";

          return new Response(pdf, {
            headers: {
              "Content-Type": "application/pdf",
              "Content-Disposition": download
                ? `attachment; filename="${RESUME_FILENAME}"`
                : `inline; filename="${RESUME_FILENAME}"`,
              "Cache-Control": "public, max-age=3600",
            },
          });
        } catch {
          return new Response("Resume file not found. Add public/Barath_Resume.pdf", {
            status: 404,
            headers: { "Content-Type": "text/plain" },
          });
        }
      },
    },
  },
});
