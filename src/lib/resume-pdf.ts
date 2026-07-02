const RESUME_LINES = [
  "Barath Gajendran",
  "Full Stack Developer | AI/ML Enthusiast",
  "barathgajendran.dev | github.com/BarathGajendran",
  "",
  "EDUCATION",
  "B.Tech CSE (Business Systems), SMVEC, Puducherry (2024-2028)",
  "Current CGPA: 8.62 / 10",
  "Higher Secondary Certificate (HSC), Seventh Day Adventist - 80%",
  "",
  "INTERNSHIPS",
  "Virtual internships via Forage and Eduskills in software engineering",
  "and quantitative research.",
  "",
  "CORE STACKS",
  "MERN Stack, Python, Machine Learning, Generative AI, FastAPI, Docker,",
  "Java, MySQL, Git and GitHub",
  "",
  "FEATURED PROJECTS",
  "Phish Sentry AI - NLP phishing detection with React and BERT",
  "Food Delivery App - React, Node.js, MongoDB, Stripe payments",
  "Traffic Intelligence - YOLO-based vehicle analytics on Hugging Face",
  "",
  "ACHIEVEMENTS",
  "16+ certifications from Google, AWS, Deloitte, and JP Morgan",
  "9+ shipped projects across full-stack, AI, and computer vision",
  "Fluent in English and Tamil; learning French",
];

function escapePdfText(value: string): string {
  return value.replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");
}

function buildPdf(lines: string[]): Uint8Array {
  const contentLines = ["BT", "/F1 11 Tf"];
  let y = 760;

  for (const line of lines) {
    contentLines.push(`1 0 0 1 50 ${y} Tm (${escapePdfText(line)}) Tj`);
    y -= line === "" ? 10 : 16;
  }

  contentLines.push("ET");
  const stream = contentLines.join("\n");
  const streamLength = Buffer.byteLength(stream, "utf8");

  const objects = [
    "1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n",
    "2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n",
    "3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>\nendobj\n",
    `4 0 obj\n<< /Length ${streamLength} >>\nstream\n${stream}\nendstream\nendobj\n`,
    "5 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj\n",
  ];

  let pdf = "%PDF-1.4\n";
  const offsets: number[] = [0];

  for (const object of objects) {
    offsets.push(Buffer.byteLength(pdf, "utf8"));
    pdf += object;
  }

  const xrefOffset = Buffer.byteLength(pdf, "utf8");
  pdf += `xref\n0 ${objects.length + 1}\n`;
  pdf += "0000000000 65535 f \n";

  for (let i = 1; i <= objects.length; i += 1) {
    pdf += `${offsets[i].toString().padStart(10, "0")} 00000 n \n`;
  }

  pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\n`;
  pdf += `startxref\n${xrefOffset}\n%%EOF`;

  return new Uint8Array(Buffer.from(pdf, "utf8"));
}

export function generateResumePdf(): Uint8Array {
  return buildPdf(RESUME_LINES);
}
