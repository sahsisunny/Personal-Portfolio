import fs from "fs";
import path from "path";
import { execSync } from "child_process";

const chromePath = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

if (!fs.existsSync(chromePath)) {
  console.error("Chrome not found at", chromePath);
  process.exit(1);
}

// Find active port
let port = 3001;
try {
  const check = execSync(`curl -s -o /dev/null -w "%{http_code}" http://localhost:3001/resume`, { encoding: "utf-8" });
  if (check.trim() !== "200") {
    port = 3000;
  }
} catch {
  port = 3000;
}

const lightUrl = `http://localhost:${port}/resume?theme=light`;
const darkUrl = `http://localhost:${port}/resume?theme=dark`;

const lightPdf = path.resolve("./public/resume.pdf");
const darkPdf = path.resolve("./public/resume-dark.pdf");

console.log("Generating Light Theme PDF from", lightUrl);
execSync(`"${chromePath}" --headless --disable-gpu --no-pdf-header-footer --print-to-pdf="${lightPdf}" "${lightUrl}"`, { stdio: "inherit" });
console.log("✓ Light PDF saved to:", lightPdf);

console.log("Generating Dark Theme PDF from", darkUrl);
execSync(`"${chromePath}" --headless --disable-gpu --no-pdf-header-footer --print-to-pdf="${darkPdf}" "${darkUrl}"`, { stdio: "inherit" });
console.log("✓ Dark PDF saved to:", darkPdf);
console.log("✓ Done!");
