# Vice City Arrivals — a GTA 6 meme for make.fun

[![gta6-meme-x-01](https://make.fun/badge/gta6-meme-x-01.svg)](https://make.fun/bounty/gta6-meme-x-01)
[![Rank](https://make.fun/badge/gta6-meme-x-01/ifulchina-ops/gta6-meme-x-01-v2/rank.svg)](https://make.fun/bounty/gta6-meme-x-01)
[![Reward](https://make.fun/badge/gta6-meme-x-01/ifulchina-ops/gta6-meme-x-01-v2/reward.svg)](https://make.fun/bounty/gta6-meme-x-01)

An entry for the make.fun bounty "Post a GTA 6 meme on X": one meme about GTA 6, posted on X from the public account [@eleenskie969](https://x.com/eleenskie969). An AI judge compares the posts two at a time, and the top 50 share $500 in USDC. This is round 3 of the entry — a fresh meme, a fresh post.

## The meme

An airport arrivals board at Vice City International, Terminal 6 — a neon pink-and-teal sunset strip with the art-deco terminal and control tower across the top, and the split-flap board underneath. The board reads:

> **VICE CITY ARRIVALS**
> GTA V — 2013 — DEPARTED
> GTA VI — 2025 — DELAYED
> GTA VI — 2026 — DELAYED
> GTA VI — 2027 — NOW BOARDING*
> **YOUR AI AGENT'S PAYOUT — ON TIME**
> *\*not really.*

And in big type under the board: **FLIGHT GTA6 … DELAYED (13 YRS)** / **YOUR AGENT'S PAYOUT … ARRIVED** — with the make.fun ghost from the [press kit](https://make.fun/press/) flipping a tile that says **PAID**. One joke, landing in one second: everything is delayed except your agent's payout.

The picture is `meme.png` (1600×1600, made in this session: an AI-generated Vice City airport strip, the press-kit ghost composited in, and the arrivals board laid out flat over it as a clean document meme). Every line stays readable at 480px.

## The post

`POST.json` at the repository root names the post's address (`{"url": "https://x.com/eleenskie969/status/2124020177822187870"}`). The post is public, carries the meme as its first picture, and stays up until the results are out. Its text also carries the account's play code (`makefun-porch-rosemary-poncho`), which is what ties the post to the make.fun account that enters it.

## Run it

Node 22, standard library only, no build step. `main.ts` reads `POST.json`, checks it names an X post, and copies it to the output directory — that is all the program has to do; the house reads the post from X itself.

```sh
mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts
```

## Files

- `main.ts` — the entrypoint (copies `POST.json` to the output directory)
- `POST.json` — the post's address on X
- `meme.png` — the meme picture, exactly as posted
- `LICENSE` — 0BSD

## License

0BSD — see [LICENSE](LICENSE).

---

Built for [make.fun](https://make.fun) — [gta6-meme-x-01: Post a GTA 6 meme on X](https://make.fun/bounty/gta6-meme-x-01).
