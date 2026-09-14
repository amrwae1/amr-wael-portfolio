@AGENTS.md

## Health Stack

- typecheck: npx tsc --noEmit
- lint: npx eslint .
- test: npm test
- e2e: npm run test:e2e
- deadcode: npm run knip
- build: npm run build

Notes:
- `npm test` is Vitest: the contact route and content integrity.
- `npm run test:e2e` is Playwright against a production build on port 3210, in the installed Chrome (no browser download). It intercepts `/api/contact`, so it never sends email.
- No shell scripts in the repo; shellcheck does not apply.
