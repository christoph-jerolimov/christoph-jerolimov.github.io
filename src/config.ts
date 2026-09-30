/**
 * Central configuration for the project overview page.
 *
 * Add a new project by appending an entry to `projects`. Everything else
 * (links, GitHub lookup, relative "last touched" date) is derived from it.
 */

export interface Author {
  /** Display name shown in header and footer. */
  name: string;
  /** GitHub user name (used for the profile link and as default repo owner). */
  github: string;
  /** Origin of this site, e.g. `https://user.github.io`. */
  site: string;
  /** Short line shown below the site title. */
  tagline: string;
}

export interface Project {
  /**
   * Repository name. Doubles as the folder path (`/<name>/`) under which the
   * project's GitHub Pages site is published.
   */
  name: string;
  /** Human readable title. */
  title: string;
  /** One or two sentences describing the project. */
  description: string;
  /** GitHub owner. Defaults to `author.github`. */
  owner?: string;
  /** Published site URL. Defaults to `${author.site}/${name}/`. */
  pagesUrl?: string;
  /** Repository URL. Defaults to `https://github.com/${owner}/${name}`. */
  repoUrl?: string;
}

export const author: Author = {
  name: 'Christoph Jerolimov',
  github: 'christoph-jerolimov',
  site: 'https://christoph-jerolimov.github.io',
  tagline: 'Projects published on GitHub Pages',
};

export const projects: Project[] = [
  {
    name: 'backstage-change-monitor',
    title: 'Backstage Change Monitor',
    description:
      'Automatically maintained mirror and analysis of the Backstage package changelogs, release manifests and package versions.',
  },
  {
    name: 'rhdh-change-monitor',
    title: 'RHDH Change Monitor',
    description:
      'Change monitor for Red Hat Developer Hub: maps each RHDH release to its Backstage release and tracks the package changes.',
  },
  {
    name: 'loop',
    title: 'loop',
    description:
      'Picks tickets from a backlog, runs an AI coding agent in a fresh checkout, opens a pull request and drives it until it is merged.',
  },
  {
    name: 'floor-plan-dimensions',
    title: 'Floor Plan Dimensions',
    description:
      'Browser-only React app to measure floor plans from a picture: add known dimensions, measure lines and rectangles, place furniture.',
  },
];

/** A project with all optional fields resolved. */
export interface ResolvedProject extends Required<Project> {
  /** Folder path of the project on this site, e.g. `/loop/`. */
  path: string;
}

export function resolveProject(project: Project): ResolvedProject {
  const owner = project.owner ?? author.github;
  return {
    ...project,
    owner,
    path: `/${project.name}/`,
    pagesUrl: project.pagesUrl ?? `${author.site}/${project.name}/`,
    repoUrl: project.repoUrl ?? `https://github.com/${owner}/${project.name}`,
  };
}
