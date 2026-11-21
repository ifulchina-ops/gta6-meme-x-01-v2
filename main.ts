// gta6-meme-x-01, round 3: "Vice City Arrivals" (Node 22, stdlib only).
//
// The judged artifact is the X post, not this program: a GTA 6 meme — an
// airport arrivals board where every GTA VI flight is DELAYED and the only
// row ON TIME is your AI agent's payout — posted from @eleenskie969 with
// the make.fun link, the @makefunai tag, and the account's play code.
// POST.json at the repo root holds the post's address. This program's only
// job is to deliver that address to the gate: load POST.json, confirm the
// address is an X status URL, and place a copy in the output directory.
// The house fetches the post from X itself; nothing here is scored.
//
// Local run:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

// Read an env var, falling back when it is unset or blank.
function envOr(name: string, fallback: string): string {
  const value = process.env[name];
  return value !== undefined && value !== "" ? value : fallback;
}

const botRoot = envOr("MAKEFUN_BOT_DIR", "/bot");
const outRoot = envOr("MAKEFUN_OUTPUT_DIR", "/output");

// An X status address: https://x.com/<handle>/status/<digits>.
// twitter.com and the www./mobile. hosts are the same post.
const X_STATUS_URL =
  /^https:\/\/(www\.|mobile\.)?(x\.com|twitter\.com)\/[^/]+\/status\/\d+$/;

// Load POST.json from the bot root and return the post address it names.
// Throws a plain Error describing what went wrong.
function loadPostAddress(root: string): string {
  const path = join(root, "POST.json");
  let record: unknown;
  try {
    record = JSON.parse(readFileSync(path, "utf8"));
  } catch (err) {
    throw new Error(`cannot read ${path}: ${(err as Error).message}`);
  }
  const url = (record as { url?: unknown }).url;
  if (typeof url !== "string" || !X_STATUS_URL.test(url)) {
    throw new Error(
      `POST.json must name an X post URL (https://x.com/<handle>/status/<id>), got ${JSON.stringify(url)}`,
    );
  }
  return url;
}

// Copy POST.json into the output directory, creating it first, then
// re-read the delivered copy and confirm it still names the same post.
function shipPost(root: string, destination: string, expected: string): string {
  const source = join(root, "POST.json");
  const target = join(destination, "POST.json");
  mkdirSync(destination, { recursive: true });
  copyFileSync(source, target);
  const delivered = JSON.parse(readFileSync(target, "utf8")) as { url?: unknown };
  if (delivered.url !== expected) {
    throw new Error(`delivered POST.json at ${target} does not name ${expected}`);
  }
  return target;
}

function main(): void {
  let address: string;
  try {
    address = loadPostAddress(botRoot);
  } catch (err) {
    console.error((err as Error).message);
    process.exit(1);
  }
  let target: string;
  try {
    target = shipPost(botRoot, outRoot, address);
  } catch (err) {
    console.error(`cannot copy POST.json to ${outRoot}: ${(err as Error).message}`);
    process.exit(1);
  }
  console.log(`POST.json -> ${target}`);
  console.log(`post: ${address} (round 3, Vice City Arrivals)`);
}

main();
