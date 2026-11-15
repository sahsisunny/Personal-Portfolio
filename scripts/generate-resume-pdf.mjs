import fs from "fs";
import path from "path";
import { execSync } from "child_process";

const chromePath = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

if (!fs.existsSync(chromePath)) {
  console.error("Chrome not found at", chromePath);
  process.exit(1);
}

// Find active port
const candidatePorts = [process.env.PORT, 3000, 3001, 3002, 3003, 3004, 3005].filter(Boolean);
let port = null;

for (const p of candidatePorts) {
  try {
    const res = execSync(`curl -s "http://localhost:${p}/resume"`, { encoding: "utf-8", timeout: 2000 });
    if (res.includes("Sunny Sahsi")) {
      port = p;
      break;
    }
  } catch {}
}

if (!port) {
  console.error("Could not find active portfolio server. Please ensure 'pnpm dev' is running.");
  process.exit(1);
}

const jobs = [
  {
    name: "Resume (Light)",
    url: `http://localhost:${port}/resume?theme=light`,
    out: path.resolve("./public/resume.pdf"),
  },
  {
    name: "Resume (Dark)",
    url: `http://localhost:${port}/resume?theme=dark`,
    out: path.resolve("./public/resume-dark.pdf"),
  },
  {
    name: "Cover Letter (Light)",
    url: `http://localhost:${port}/cover-letter?theme=light`,
    out: path.resolve("./public/cover-letter.pdf"),
  },
  {
    name: "Cover Letter (Dark)",
    url: `http://localhost:${port}/cover-letter?theme=dark`,
    out: path.resolve("./public/cover-letter-dark.pdf"),
  },
];

for (const job of jobs) {
  console.log(`Generating ${job.name} PDF from ${job.url}`);
  execSync(`"${chromePath}" --headless --disable-gpu --no-pdf-header-footer --print-to-pdf="${job.out}" "${job.url}"`, { stdio: "inherit" });
  console.log(`✓ ${job.name} saved to: ${job.out}`);
}

console.log("✓ All PDFs generated successfully!");
