# christoph-jerolimov.github.io

Minimal project overview for <https://christoph-jerolimov.github.io>, built with [Astro](https://astro.build) and TypeScript.

The page is styled like an AI coding agent session: a typed prompt, two tool calls, and a streamed answer listing the repos that are published on GitHub Pages with path, title, description, a link to the repository, and when the repository was last touched (relative, e.g. *today* or *yesterday*). The typing animation plays once per browser session and is skipped for `prefers-reduced-motion`; the full content is in the static HTML, so it also works without JavaScript.

## Which repositories are listed

No list is maintained by hand. When the site is deployed, [`scripts/fetch-repos.ts`](scripts/fetch-repos.ts) loads all repositories of the GitHub user from the GitHub API and keeps the ones whose **Website** (the `homepage` field in the repository settings) starts with `https://christoph-jerolimov.github.io/`. The result is written to `src/data/repos.json` (git-ignored), which the page imports, so the Astro build itself makes no network requests.

To list a repository, set its Website to its GitHub Pages URL. The next deploy (push, daily schedule, or *Run workflow*) picks it up.

The author information shown in the header and footer lives in [`src/config.ts`](src/config.ts).

## Development

```sh
npm ci
npm run dev           # fetches the repos, then starts the dev server
npm run check         # type check (needs src/data/repos.json, see below)
npm run build         # fetches the repos, then builds into dist/
```

`npm run dev` and `npm run build` run `npm run fetch-repos` first, which writes `src/data/repos.json`. Run it on its own to refresh the data or before `npm run check`. Set `GITHUB_TOKEN` for a higher API rate limit; the unauthenticated limit is enough for normal use.

## Deployment

[`.github/workflows/pages.yml`](.github/workflows/pages.yml) fetches the repository list, builds the site and deploys it to GitHub Pages on every push to `main`, once a day (so the list and the relative dates stay fresh), and on demand via *Run workflow*.

In the repository settings, set **Pages → Build and deployment → Source** to **GitHub Actions**.
