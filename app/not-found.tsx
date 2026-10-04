import Link from 'next/link';

/**
 * Catch-all for paths that never reached the `[locale]` segment — for example
 * `/unknown.txt`. There is no root layout above `app/[locale]`, so this page
 * has to supply its own document shell.
 */
export default function GlobalNotFound() {
  return (
    <html lang="id">
      <body
        style={{
          margin: 0,
          minHeight: '100vh',
          display: 'grid',
          placeItems: 'center',
          backgroundColor: '#F7EFE2',
          color: '#2A1810',
          fontFamily: 'Georgia, serif',
          textAlign: 'center',
          padding: '2rem'
        }}
      >
        <main>
          <p style={{ letterSpacing: '0.22em', fontSize: '0.75rem', color: '#8C2F39' }}>
            404
          </p>
          <h1 style={{ fontSize: '2.5rem', margin: '1rem 0' }}>
            Halaman tidak ditemukan
          </h1>
          <p style={{ color: '#6B564A', marginBottom: '2rem' }}>
            The page you were looking for does not exist.
          </p>
          <Link
            href="/id"
            style={{
              display: 'inline-block',
              backgroundColor: '#8C2F39',
              color: '#F7EFE2',
              padding: '0.85rem 1.75rem',
              borderRadius: '9999px',
              textDecoration: 'none'
            }}
          >
            Kembali ke beranda
          </Link>
        </main>
      </body>
    </html>
  );
}
