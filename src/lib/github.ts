/**
 * Build-time lookup of repository metadata from the GitHub REST API.
 *
 * Set `GITHUB_TOKEN` in the environment (GitHub Actions provides one) to
 * raise the rate limit. Without network access or on any error the lookup
 * returns `undefined` so the page still builds.
 */

export interface RepoInfo {
  /** Time of the last push to the repository. */
  pushedAt: Date;
  /** Default branch name. */
  defaultBranch: string;
  /** Repository description on GitHub, if set. */
  description: string | null;
}

interface GitHubRepoResponse {
  pushed_at: string;
  default_branch: string;
  description: string | null;
}

export async function fetchRepoInfo(owner: string, repo: string): Promise<RepoInfo | undefined> {
  const headers: Record<string, string> = {
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
    'User-Agent': `${owner}.github.io`,
  };
  const token = process.env.GITHUB_TOKEN;
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  try {
    const response = await fetch(`https://api.github.com/repos/${owner}/${repo}`, { headers });
    if (!response.ok) {
      console.warn(`[github] ${owner}/${repo}: HTTP ${response.status} ${response.statusText}`);
      return undefined;
    }
    const data = (await response.json()) as GitHubRepoResponse;
    return {
      pushedAt: new Date(data.pushed_at),
      defaultBranch: data.default_branch,
      description: data.description,
    };
  } catch (error) {
    console.warn(`[github] ${owner}/${repo}: ${error instanceof Error ? error.message : String(error)}`);
    return undefined;
  }
}
