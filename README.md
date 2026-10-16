# newzeem

A free daily paper that fits your topics into five minutes. No sign-up, no ads, no endless feed.

- Static front end (vanilla JS, no build) and one serverless function, `api/topic.js`.
- The function reads public RSS feeds per topic (see `topics.js`), asks an AI to pick and retell the stories that matter,
  and returns items whose source and link always come from the feed. Responses are cached on the CDN for hours,
  so one topic costs one AI call for all readers.
- Without an AI key it still works: it shows headlines and descriptions from the sources.
- No tracking. The reader's topics, read marks and streak live in the browser (localStorage).

## AI
Set ONE of `GROQ_API_KEY`, `OPENAI_API_KEY`, `ANTHROPIC_API_KEY` in the environment (Vercel project settings). `AI_PROVIDER` forces a choice.
Optional: `GROQ_MODEL`, `NZ_AI_PER_DAY` (soft cap of AI calls per function instance per day, default 400).

## Community and admin (October 2026)
- **Authors** write explainers with at least one source. Every post goes to the moderation queue first. Authors have no e-mail or password: the device keeps a secret key (copyable in "Mine" to sign in elsewhere).
- **Reputation**: +5 per published post, +2 per "Useful" vote, −3 per rejected post. Levels: Newcomer (0), Author (20), Expert (100), Legend (500).
- **Admin** at `/admin`: queue with an AI hint, published posts, authors (ban), chat reports, source health. Locked until `ADMIN_TOKEN` (12+ characters) is set in Vercel.
- **Share pages** with preview cards: `/p/<post>`, `/n/<story>`, `/c/<collection>`.
- Saved stories, today's picks, interests and notifications live on the reader's device.
- Storage: Upstash Redis (`UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`). Without it the community is switched off and the paper still works.
