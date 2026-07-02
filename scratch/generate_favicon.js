import fs from "fs";
import path from "path";

// Base64 for a 1x1 transparent PNG
const base64Png =
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";
const buffer = Buffer.from(base64Png, "base64");

const publicDir = "c:/Users/barath/Downloads/stellar-portfolio-main/public";

// Write to favicon.ico
fs.writeFileSync(path.join(publicDir, "favicon.ico"), buffer);
console.log("Successfully generated public/favicon.ico");
