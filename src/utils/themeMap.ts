export const DEFAULT_THEME = 'nord-dark';

export const themeMap: Record<string, () => Promise<void>> = {
  frame: () => import('@milkdown/crepe/theme/frame.css').then(() => {}),
  nord: () => import('@milkdown/crepe/theme/nord.css').then(() => {}),
  'frame-dark': () => import('@milkdown/crepe/theme/frame-dark.css').then(() => {}),
  'node-dark': () => import('@milkdown/crepe/theme/nord-dark.css').then(() => {}),
};
