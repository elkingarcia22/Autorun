/**
 * @autoframe/github
 * Export público del add-on GitHub
 */

export { GitHubAddon } from './GitHubAddon';
export { GitHubService, GitHubConfig, CommitInfo } from './GitHubService';

// Export default para que AddonLoader pueda cargarlo
export { GitHubAddon as default } from './GitHubAddon';

