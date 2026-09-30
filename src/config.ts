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
    description: 'Daily mirror and analysis of the Backstage package changelogs and releases.',
  },
  {
    name: 'rhdh-change-monitor',
    title: 'RHDH Change Monitor',
    description: 'The same for Red Hat Developer Hub, mapped to its Backstage releases.',
  },
  {
    name: 'floor-plan-dimensions',
    title: 'Floor Plan Dimensions',
    description: 'Measure floor plans from a picture in the browser.',
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
