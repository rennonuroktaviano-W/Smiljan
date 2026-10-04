import { getTranslations } from 'next-intl/server';

import { Link } from '@/i18n/navigation';

import { Button } from '../ui/Button';
import { Container, Section } from '../ui/Container';
import { Plate } from '../ui/Plate';
import { Reveal } from '../ui/Reveal';
import { SectionHeading } from '../ui/SectionHeading';

const shots = [
  { src: '/images/gallery/interior-1.svg', ratio: '3/4', alt: 'Interior' },
  { src: '/images/gallery/minuman-1.svg', ratio: '1/1', alt: 'Minuman' },
  { src: '/images/gallery/makanan-1.svg', ratio: '3/4', alt: 'Makanan' },
  { src: '/images/gallery/interior-2.svg', ratio: '4/3', alt: 'Bar' }
];

/** Asymmetric photo grid teaser — PRD 5.2.6. */
export async function GalleryPreview() {
  const t = await getTranslations('home.gallery');

  return (
    <Section tone="plain" spacing="lg">
      <Container size="wide">
        <SectionHeading
          eyebrow={t('eyebrow')}
          title={t('title')}
          description={t('description')}
          action={
            <Button href="/galeri" variant="outline">
              {t('cta')}
            </Button>
          }
        />

        <div className="mt-14 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
          {shots.map((shot, index) => (
            <Reveal
              key={shot.src}
              delay={index * 80}
              className={index % 2 === 1 ? 'lg:mt-12' : undefined}
            >
              <Link href="/galeri" className="group block">
                <Plate
                  src={shot.src}
                  alt={`${shot.alt} Smiljan`}
                  width={1200}
                  height={1200}
                  sizes="(min-width: 1024px) 22vw, 45vw"
                  ratio={shot.ratio}
                  imgClassName="transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                />
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
