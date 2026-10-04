'use client';

import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

import { Link, usePathname } from '@/i18n/navigation';
import { cn } from '@/lib/utils';

import { Logo } from './Logo';
import { ThemeToggle } from './ThemeToggle';
import { desktopNavItems } from './nav-items';

export function Navbar() {
  const t = useTranslations('nav');
  const pathname = usePathname();

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const isHome = pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the drawer whenever the route changes.
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Lock body scroll while the mobile drawer is open.
  useEffect(() => {
    if (!menuOpen) return;

    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previous;
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };

    document.addEventListener('keydown', onKeyDown);

    return () => document.removeEventListener('keydown', onKeyDown);
  }, [menuOpen]);

  // Transparent only over the dark home hero, before any scrolling.
  const transparent = isHome && !scrolled && !menuOpen;

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]',
        transparent
          ? 'bg-transparent py-5'
          : 'border-b border-line/70 bg-header-bg py-3 backdrop-blur-xl'
      )}
    >
      <div className="mx-auto flex w-full max-w-[90rem] items-center justify-between gap-4 px-5 sm:px-8 lg:px-12">
        <Link
          href="/"
          aria-label={t('home')}
          className="rounded-full"
        >
          <Logo tone={transparent ? 'cream' : 'ink'} />
        </Link>

        <nav
          aria-label={t('openMenu')}
          className="hidden items-center gap-1 lg:flex"
        >
          {desktopNavItems.map((item) => {
            const active =
              pathname === item.href || pathname.startsWith(`${item.href}/`);

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'relative rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300',
                  transparent
                    ? 'text-cream/80 hover:text-cream'
                    : 'text-ink-muted hover:text-ink',
                  active && (transparent ? 'text-cream' : 'text-ink')
                )}
              >
                {t(item.key)}
                <span
                  aria-hidden="true"
                  className={cn(
                    'absolute inset-x-4 -bottom-0.5 h-px origin-left transition-transform duration-300',
                    transparent ? 'bg-saffron' : 'bg-maroon',
                    active ? 'scale-x-100' : 'scale-x-0'
                  )}
                />
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle tone={transparent ? 'cream' : 'ink'} />

          <Link
            href="/reservasi"
            className={cn(
              'hidden h-10 items-center rounded-full px-5 text-sm font-medium transition-all duration-300 hover:-translate-y-0.5 md:inline-flex',
              transparent
                ? 'bg-saffron text-espresso hover:bg-saffron-soft'
                : 'bg-maroon text-cream hover:bg-maroon-deep'
            )}
          >
            {t('reservasi')}
          </Link>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? t('closeMenu') : t('openMenu')}
            className={cn(
              'grid size-10 place-items-center rounded-full border transition-colors duration-300 lg:hidden',
              transparent
                ? 'border-cream/30 text-cream'
                : 'border-ink/15 text-ink'
            )}
          >
            <span className="relative block h-3 w-4">
              <span
                className={cn(
                  'absolute left-0 h-px w-full bg-current transition-all duration-300',
                  menuOpen ? 'top-1.5 rotate-45' : 'top-0'
                )}
              />
              <span
                className={cn(
                  'absolute left-0 top-1.5 h-px w-full bg-current transition-all duration-300',
                  menuOpen && 'opacity-0'
                )}
              />
              <span
                className={cn(
                  'absolute left-0 h-px w-full bg-current transition-all duration-300',
                  menuOpen ? 'top-1.5 -rotate-45' : 'top-3'
                )}
              />
            </span>
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        id="mobile-menu"
        hidden={!menuOpen}
        className="border-t border-line bg-bg lg:hidden"
      >
        <nav
          aria-label={t('openMenu')}
          className="mx-auto flex w-full max-w-[90rem] flex-col px-5 py-6 sm:px-8"
        >
          {[...desktopNavItems, { href: '/reservasi', key: 'reservasi' }].map(
            (item, index) => (
              <Link
                key={item.href}
                href={item.href}
                className="border-b border-line/70 py-4 font-display text-2xl text-ink transition-colors hover:text-maroon"
              >
                <span className="label-caps mr-3 align-middle text-ink-muted">
                  {String(index + 1).padStart(2, '0')}
                </span>
                {t(item.key)}
              </Link>
            )
          )}
        </nav>
      </div>
    </header>
  );
}
