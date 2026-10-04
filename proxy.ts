import createMiddleware from 'next-intl/middleware';

import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  // Skip Next.js internals, API routes and any path that looks like a file.
  matcher: '/((?!api|_next|_vercel|.*\\..*).*)'
};
