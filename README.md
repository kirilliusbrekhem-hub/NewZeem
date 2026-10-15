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
