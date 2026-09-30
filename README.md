# christoph-jerolimov.github.io

Minimal project overview for <https://christoph-jerolimov.github.io>, built with [Astro](https://astro.build) and TypeScript.

The page lists projects that are published on GitHub Pages as a folder listing: path, title, description, a link to the site and to the repository, and when the repository was last touched (relative, e.g. *today* or *yesterday*).

## Adding a project

Edit [`src/config.ts`](src/config.ts) and append an entry to `projects`:

```ts
{
  name: 'my-project',            // repo name; the site is expected at /my-project/
  title: 'My Project',
  description: 'What it does.',
  // optional overrides: owner, pagesUrl, repoUrl
}
```

The author information shown in the header and footer lives in the same file (`author`).

## Development

```sh
npm ci
npm run dev      # local dev server
npm run check    # type check
npm run build    # static build into dist/
```

The "last touched" date is fetched from the GitHub REST API at build time (`pushed_at` of the repository). Set `GITHUB_TOKEN` to raise the rate limit; without network access the page still builds and shows *unknown*.

## Deployment

[`.github/workflows/pages.yml`](.github/workflows/pages.yml) builds and deploys the site to GitHub Pages on every push to `main`, once a day (so the relative dates stay fresh), and on demand via *Run workflow*.

In the repository settings, set **Pages → Build and deployment → Source** to **GitHub Actions**.
