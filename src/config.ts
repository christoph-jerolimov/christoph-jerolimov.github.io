/**
 * Central configuration for the overview page.
 *
 * The list of repositories is not maintained here: `scripts/fetch-repos.ts`
 * loads every repository of `author.github` from the GitHub API when the
 * site is deployed and keeps the ones whose website starts with
 * `author.site`. The result is written to `src/data/repos.json`, which the
 * page imports, so the build itself makes no network requests.
 */

export interface Author {
  /** Display name shown in header and footer. */
  name: string;
  /** GitHub user name whose repositories are listed. */
  github: string;
  /** Origin of this site, e.g. `https://user.github.io`. */
  site: string;
  /** Short line used as the page description. */
  tagline: string;
}

export const author: Author = {
  name: 'Christoph Jerolimov',
  github: 'christoph-jerolimov',
  site: 'https://christoph-jerolimov.github.io',
  tagline: 'Repos published on GitHub Pages',
};

/** Only repositories whose website starts with this prefix are listed. */
export const pagesPrefix = `${author.site}/`;

/** Path to the generated data file, relative to the repository root. */
export const reposDataFile = 'src/data/repos.json';
