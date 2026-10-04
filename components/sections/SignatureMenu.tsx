import { getLocale, getTranslations } from 'next-intl/server';

import { featuredMenu } from '@/data/menu';
import { pick } from '@/data/shared';
import { whatsappLink } from '@/lib/whatsapp';
import { formatIDR } from '@/lib/utils';
import { Link } from '@/i18n/navigation';

import { ArchFrame } from '../ui/ArchFrame';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Container, Section } from '../ui/Container';
import { Plate } from '../ui/Plate';
import { Reveal } from '../ui/Reveal';
import { SectionHeading } from '../ui/SectionHeading';
import { WhatsappIcon } from '../ui/BrandIcons';

/**
 * Menu Signature — four featured drinks, each on its own accent colour so the
 * row reads as four blocks rather than one long list (PRD 5.2.3).
 */
export async function SignatureMenu() {
  const t = await getTranslations('home.signature');
  const tBadges = await getTranslations('menu.badges');
  const tCta = await getTranslations('cta');
  const locale = await getLocale();

  const items = featuredMenu.slice(0, 4);

  return (
    <Section tone="plain" spacing="lg">
      <Container size="wide">
        <SectionHeading
          eyebrow={t('eyebrow')}
          title={t('title')}
          description={t('description')}
          action={
            <Button href="/menu" variant="outline">
              {t('cta')}
            </Button>
          }
        />

        <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {items.map((item, index) => (
            <Reveal as="li" key={item.id} delay={index * 90}>
              <article className="group h-full">
                <ArchFrame
                  shape={index % 2 === 0 ? 'arch' : 'circle'}
                  className="aspect-[4/5]"
                >
                  <Link href={`/menu#${item.id}`} className="block size-full">
                    <Plate
                      src={item.image}
                      alt={pick(item.description, locale)}
                      width={800}
                      height={800}
                      sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 90vw"
                      ratio="4/5"
                      imgClassName="transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-108"
                    />
                  </Link>
                </ArchFrame>

                <div className="mt-5">
                  {item.badges?.[0] ? (
                    <Badge accent={item.accent}>{tBadges(item.badges[0])}</Badge>
                  ) : null}

                  <h3 className="mt-3 font-display text-xl leading-snug">
                    {pick(item.name, locale)}
                  </h3>

                  <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                    {pick(item.description, locale)}
                  </p>

                  {item.tastingNotes ? (
                    <p className="mt-3 text-xs text-ink-muted">
                      <span className="label-caps mr-2 text-maroon">
                        {t('tastingNotes')}
                      </span>
                      {pick(item.tastingNotes, locale)}
                    </p>
                  ) : null}

                  <div className="mt-4 flex items-baseline justify-between gap-3 border-t border-line pt-4">
                    <span className="font-display text-lg text-maroon">
                      {formatIDR(item.price, locale)}
                    </span>
                    {item.brewTime ? (
                      <span className="text-xs text-ink-muted">
                        {t('brewTime', { minutes: item.brewTime })}
                      </span>
                    ) : null}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </ul>

        <Reveal className="mt-14 flex justify-center">
          <Button
            href={whatsappLink(
              locale === 'en'
                ? 'Hi Smiljan, I would like to order the signature menu.'
                : 'Halo Smiljan, saya mau pesan menu signature.'
            )}
            external
            variant="primary"
            size="lg"
          >
            <WhatsappIcon className="size-4" />
            {tCta('primary')}
          </Button>
        </Reveal>
      </Container>
    </Section>
  );
}
