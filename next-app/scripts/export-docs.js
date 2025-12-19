const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const appDir = path.resolve(__dirname, "..");
const repoRoot = path.resolve(appDir, "..");
const outDir = path.join(appDir, "out");
const docsDir = path.join(repoRoot, "docs");
const cnameSrc = path.join(repoRoot, "CNAME");

// Build the static export into next-app/out
execSync("npx next build", { cwd: appDir, stdio: "inherit" });

// Replace docs/ with the fresh export
fs.rmSync(docsDir, { recursive: true, force: true });
fs.renameSync(outDir, docsDir);

// Ensure GitHub Pages serves the _next folder
fs.writeFileSync(path.join(docsDir, ".nojekyll"), "");

// Keep custom domain if present
if (fs.existsSync(cnameSrc)) {
  fs.copyFileSync(cnameSrc, path.join(docsDir, "CNAME"));
}
