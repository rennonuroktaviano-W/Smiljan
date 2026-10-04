import { getTranslations, setRequestLocale } from 'next-intl/server';

export default async function HomePage({ params }: PageProps<'/[locale]'>) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('common');

  return (
    <main className="p-10">
      <h1 className="text-4xl font-bold">{t('brandName')}</h1>
      <p>{t('tagline')}</p>
    </main>
  );
}
