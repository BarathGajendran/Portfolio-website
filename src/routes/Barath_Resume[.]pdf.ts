import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { generateResumePdf } from "../lib/resume-pdf";

export const Route = createFileRoute("/Barath_Resume.pdf")({
  server: {
    handlers: {
      GET: async () => {
        const pdf = generateResumePdf();

        return new Response(pdf, {
          headers: {
            "Content-Type": "application/pdf",
            "Content-Disposition": 'attachment; filename="Barath_Resume.pdf"',
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
