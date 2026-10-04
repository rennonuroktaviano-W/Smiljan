import { getTranslations, setRequestLocale } from 'next-intl/server';

import { CtaBand } from '@/components/sections/CtaBand';
import { GalleryPreview } from '@/components/sections/GalleryPreview';
import { Hero } from '@/components/sections/Hero';
import { LocationTeaser } from '@/components/sections/LocationTeaser';
import { SignatureMenu } from '@/components/sections/SignatureMenu';
import { StoryBlock } from '@/components/sections/StoryBlock';
import { Testimonials } from '@/components/sections/Testimonials';
import { WhySmiljan } from '@/components/sections/WhySmiljan';
import { Marquee } from '@/components/ui/Marquee';

export default async function HomePage({ params }: PageProps<'/[locale]'>) {
  const { locale } = await params;
  setRequestLocale(locale);

  const tCommon = await getTranslations('common');

  return (
    <>
      <Hero />

      <div className="border-b border-line bg-cream py-2">
        <Marquee items={tCommon.raw('marquee')} tone="maroon" duration={44} />
      </div>

      <SignatureMenu />
      <StoryBlock />
      <WhySmiljan />
      <GalleryPreview />
      <Testimonials />
      <LocationTeaser />
      <CtaBand />
    </>
  );
}