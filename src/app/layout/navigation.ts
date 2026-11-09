export interface NavigationItem {
  key: 'records';
  path: '/records';
  label: string;
}

export const navigationItems = [
  {
    key: 'records',
    path: '/records',
    label: 'Records',
  },
] as const satisfies readonly NavigationItem[];

export type NavigationKey = (typeof navigationItems)[number]['key'];

export function getNavigationKeyByPath(pathname: string): NavigationKey {
  const match = navigationItems.find((item) => item.path === pathname);
  return match?.key ?? 'records';
}
