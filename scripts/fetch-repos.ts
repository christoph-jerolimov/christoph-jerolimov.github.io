/**
 * Loads every repository of the configured GitHub user and writes the ones
 * whose website starts with the Pages origin to `src/data/repos.json`.
 *
 * Runs at deploy time (see .github/workflows/pages.yml) and locally via
 * `npm run fetch-repos`. Set `GITHUB_TOKEN` to raise the API rate limit.
 *
 *   node scripts/fetch-repos.ts
 */

import { mkdir, writeFile } from 'node:fs/promises';
import { dirname } from 'node:path';

import { author, pagesPrefix, reposDataFile } from '../src/config.ts';
import type { Repo, RepoData } from '../src/lib/repos.ts';

interface GitHubRepo {
  name: string;
  description: string | null;
  homepage: string | null;
  html_url: string;
  pushed_at: string;
  language: string | null;
  stargazers_count: number;
  archived: boolean;
  fork: boolean;
}

const headers: Record<string, string> = {
  Accept: 'application/vnd.github+json',
  'X-GitHub-Api-Version': '2022-11-28',
  'User-Agent': `${author.github}.github.io`,
};
if (process.env.GITHUB_TOKEN) {
  headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
}

async function listRepos(owner: string): Promise<GitHubRepo[]> {
  const repos: GitHubRepo[] = [];
  for (let page = 1; ; page++) {
    const url = `https://api.github.com/users/${owner}/repos?type=owner&per_page=100&page=${page}`;
    const response = await fetch(url, { headers });
    if (!response.ok) {
      throw new Error(`GET ${url}: HTTP ${response.status} ${response.statusText}`);
    }
    const batch = (await response.json()) as GitHubRepo[];
    repos.push(...batch);
    if (batch.length < 100) return repos;
  }
}

function hasPages(repo: GitHubRepo): repo is GitHubRepo & { homepage: string } {
  // The site repository itself has the bare origin as its website; skip it.
  return !!repo.homepage && repo.homepage.startsWith(pagesPrefix) && repo.homepage !== pagesPrefix;
}

function toRepo(repo: GitHubRepo & { homepage: string }): Repo {
  return {
    name: repo.name,
    description: repo.description,
    homepage: repo.homepage,
    url: repo.html_url,
    pushedAt: repo.pushed_at,
    language: repo.language,
    stars: repo.stargazers_count,
    archived: repo.archived,
    fork: repo.fork,
  };
}

const all = await listRepos(author.github);
const repos = all
  .filter(hasPages)
  .map(toRepo)
  .sort((a, b) => b.pushedAt.localeCompare(a.pushedAt));

const data: RepoData = {
  fetchedAt: new Date().toISOString(),
  owner: author.github,
  totalRepos: all.length,
  repos,
};

await mkdir(dirname(reposDataFile), { recursive: true });
await writeFile(reposDataFile, JSON.stringify(data, null, 2) + '\n');

console.log(`${author.github}: ${all.length} repos, ${repos.length} with a website under ${pagesPrefix}`);
for (const repo of repos) console.log(`  ${repo.homepage}  (${repo.name}, pushed ${repo.pushedAt})`);
console.log(`written to ${reposDataFile}`);
