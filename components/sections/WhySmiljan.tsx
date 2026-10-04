import { getTranslations } from 'next-intl/server';

import { Container, Section } from '../ui/Container';
import { Reveal } from '../ui/Reveal';

/** Custom line icons — PRD asks for custom icons rather than generic ones. */
const icons = [
  <svg
    key="beans"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    className="size-7"
    aria-hidden="true"
  >
    <ellipse cx="12" cy="12" rx="6" ry="9.5" transform="rotate(35 12 12)" />
    <path d="M12 2.5c-2.5 4-2.5 15 0 19M12 2.5c2.5 4 2.5 15 0 19" />
  </svg>,
  <svg
    key="manual"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    strokeLinecap="round"
    className="size-7"
    aria-hidden="true"
  >
    <path d="M5 8h14l-1.2 12.2a2 2 0 0 1-2 1.8H8.2a2 2 0 0 1-2-1.8Z" />
    <path d="M8.5 4.5c0 1 1.5 1 1.5 2M12 3.5c0 1 1.5 1 1.5 2M15.5 4.5c0 1 1.5 1 1.5 2" />
  </svg>,
  <svg
    key="space"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    strokeLinejoin="round"
    className="size-7"
    aria-hidden="true"
  >
    <path d="M3 20V9l9-6 9 6v11" />
    <path d="M9 20v-6h6v6" />
  </svg>
];

const accents = [
  { box: 'bg-maroon/10 text-maroon', rule: 'bg-maroon' },
  { box: 'bg-teal/10 text-teal', rule: 'bg-teal' },
  { box: 'bg-saffron/25 text-espresso', rule: 'bg-saffron' }
] as const;

const keys = ['beans', 'manual', 'space'] as const;

/** Three non-negotiables — PRD 5.2.5. */
export async function WhySmiljan() {
  const t = await getTranslations('home.why');

  return (
    <Section tone="alt" spacing="md">
      <Container size="wide">
        <div className="max-w-2xl">
          <p className="label-caps flex items-center gap-3 text-maroon">
            <span aria-hidden="true" className="h-px w-8 bg-maroon" />
            {t('eyebrow')}
          </p>
          <h2 className="mt-4 font-display text-display-md leading-[1.05]">
            {t('title')}
          </h2>
        </div>

        <ul className="mt-14 grid gap-8 md:grid-cols-3 md:gap-6">
          {keys.map((key, index) => (
            <Reveal as="li" key={key} delay={index * 110}>
              <div className="group relative h-full overflow-hidden rounded-card border border-line bg-surface p-8 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-lift">
                <span
                  aria-hidden="true"
                  className={`absolute inset-x-0 top-0 h-1 origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100 ${accents[index].rule}`}
                />

                <span
                  className={`grid size-14 place-items-center rounded-full ${accents[index].box}`}
                >
                  {icons[index]}
                </span>

                <h3 className="mt-6 font-display text-2xl leading-snug">
                  {t(`items.${key}.title`)}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                  {t(`items.${key}.body`)}
                </p>
              </div>
            </Reveal>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
