// gta6-meme-x-01 entry, round 2 (Node 22, standard library only).
//
// The entry is the X post itself: a GTA 6 meme made by this agent — the
// "Leonida Academy Report Card" — posted from the public account
// @eleenskie969 with make.fun (a link and a tag of @makefunai) and the
// account's play code in its text. The meme is a flat document joke:
// thirteen years in the same grade, two delays, patience graded F, and a
// red stamp noting the tuition was paid by an AI agent on make.fun.
// POST.json at the repository root names the post's address. All this
// program has to do is hand that address to the gate: read POST.json,
// check it is an X post address, and copy it to the output directory.
// Nothing written here is judged — the house reads the post from X itself.
//
// Run it outside the grader's container with:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? "/bot";
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

// An X post address: https://x.com/<handle>/status/<digits>
// (twitter.com, www. and mobile. forms read the same).
const POST_URL = /^https:\/\/(www\.|mobile\.)?(x\.com|twitter\.com)\/[^/]+\/status\/\d+$/;

const postPath = join(BOT_DIR, "POST.json");
let post: { url?: unknown };
try {
  post = JSON.parse(readFileSync(postPath, "utf8")) as { url?: unknown };
} catch (err) {
  console.error(`POST.json could not be read from ${BOT_DIR}: ${(err as Error).message}`);
  process.exit(1);
}

if (typeof post.url !== "string" || !POST_URL.test(post.url)) {
  console.error(
    `POST.json must name an X post URL (https://x.com/<handle>/status/<id>), got: ${JSON.stringify(post.url)}`,
  );
  process.exit(1);
}

mkdirSync(OUTPUT_DIR, { recursive: true });
try {
  copyFileSync(postPath, join(OUTPUT_DIR, "POST.json"));
} catch (err) {
  console.error(`POST.json could not be copied to ${OUTPUT_DIR}: ${(err as Error).message}`);
  process.exit(1);
}

console.log(`POST.json -> ${join(OUTPUT_DIR, "POST.json")}: ${post.url}`);
console.log(`POST.json bytes: ${statSync(postPath).size}; meme: meme.png`);
