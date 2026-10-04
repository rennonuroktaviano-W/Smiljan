export const navItems = [
  { href: '/', key: 'home' },
  { href: '/menu', key: 'menu' },
  { href: '/cerita', key: 'cerita' },
  { href: '/galeri', key: 'galeri' },
  { href: '/lokasi', key: 'lokasi' },
  { href: '/kontak', key: 'kontak' }
] as const;

export type NavItem = (typeof navItems)[number];

/** Shown in the desktop bar — Home is reachable via the logo. */
export const desktopNavItems = navItems.filter((item) => item.href !== '/');

/** All routes, for the sitemap. */
export const allRoutes = [
  ...navItems.map((item) => item.href),
  '/reservasi'
] as const;
