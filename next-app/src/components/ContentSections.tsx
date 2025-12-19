import MarkdownIt from "markdown-it";
import Image from "next/image";
import Link from "next/link";
import { TextSection } from "./TextSection";
import { ToggleCards } from "./ToggleCards";

const md = new MarkdownIt({ html: true });

export type FeatureCard = { title: string; body: string };
export type FaqItem = { question: string; answer: string };
export type Person = {
  name: string;
  role?: string;
  bio?: string;
  image?: string;
  links?: { label: string; href: string }[];
};
export type LogosCard = {
  title: string;
  body?: string;
  image?: string;
  links?: { label: string; href: string }[];
};
export type Section =
  | { type: "richText"; title?: string; body?: string }
  | { type: "textSection"; title?: string; body?: string }
  | {
      type: "toggleCards";
      title?: string;
      options: { key: string; label: string; cards: FeatureCard[] }[];
    }
  | { type: "featureCards"; title?: string; subtitle?: string; cards: FeatureCard[] }
  | { type: "featureCards2Col"; title?: string; subtitle?: string; cards: FeatureCard[] }
  | { type: "peopleGrid"; title: string; people: Person[] }
  | { type: "logosGrid"; title?: string; intro?: string; cards: LogosCard[] }
  | { type: "faq"; title?: string; items: FaqItem[] }
  | {
      type: "timeline";
      title?: string;
      steps: { title: string; caption?: string; image?: string }[];
    }
  | {
      type: "ctaBanner";
      title: string;
      body?: string;
      cta?: { label: string; href: string };
    };

type Props = { sections: Section[] };

export function ContentSections({ sections }: Props) {
  return (
    <div className="space-y-12">
      {sections.map((section, idx) => {
        switch (section.type) {
          case "richText":
            return (
              <section key={idx} className="section space-y-4">
                {section.title ? (
                  <h2 className="text-2xl font-semibold">{section.title}</h2>
                ) : null}
                {section.body ? (
                  <div
                    className="prose prose-invert max-w-none"
                    dangerouslySetInnerHTML={{ __html: md.render(section.body) }}
                  />
                ) : null}
              </section>
            );
          case "textSection":
            return (
              <TextSection
                key={idx}
                title={section.title}
              >
                {section.body ? (
                  <div
                    dangerouslySetInnerHTML={{ __html: md.render(section.body) }}
                  />
                ) : null}
              </TextSection>
            );
          case "toggleCards":
            return (
              <ToggleCards key={idx} title={section.title} options={section.options} />
            );
          case "featureCards2Col":
            return (
              <section key={idx} className="section space-y-4">
                {section.title ? (
                  <h2 className="text-2xl font-semibold">{section.title}</h2>
                ) : null}
                {section.subtitle ? (
                  <p className="text-white/70">{section.subtitle}</p>
                ) : null}
                <div className="grid md:grid-cols-2">
                  {section.cards.map((card, cardIdx) => (
                    <article key={cardIdx} className="card space-y-3">
                      <h3 className="text-lg font-semibold">{card.title}</h3>
                      <div
                        className="text-white/70 prose prose-invert max-w-none"
                        dangerouslySetInnerHTML={{ __html: md.render(card.body) }}
                      />
                    </article>
                  ))}
                </div>
              </section>
            );
          case "featureCards":
            return (
              <section key={idx} className="section space-y-4">
                {section.title ? (
                  <h2 className="text-2xl font-semibold">{section.title}</h2>
                ) : null}
                {section.subtitle ? (
                  <p className="text-white/70">{section.subtitle}</p>
                ) : null}
                <div className="grid md:grid-cols-2 lg:grid-cols-3">
                  {section.cards.map((card, cardIdx) => (
                    <article key={cardIdx} className="card space-y-3">
                      <h3 className="text-lg font-semibold">{card.title}</h3>
                      <div
                        className="text-white/70 prose prose-invert max-w-none"
                        dangerouslySetInnerHTML={{ __html: md.render(card.body) }}
                      />
                    </article>
                  ))}
                </div>
              </section>
            );
          case "timeline":
            return (
              <section key={idx} className="section space-y-4">
                {section.title ? (
                  <h2 className="text-2xl font-semibold">{section.title}</h2>
                ) : null}
                <div className="space-y-6">
                  {section.steps.map((step, sIdx) => (
                    <article
                      key={sIdx}
                      className="card grid md:grid-cols-[0.25fr,1fr] gap-4 items-start"
                    >
                      <div className="text-sm font-semibold text-white/80">
                        {String(sIdx + 1).padStart(2, "0")}
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-lg font-semibold">{step.title}</h3>
                        {step.caption ? (
                          <p className="text-white/70 text-sm leading-relaxed">
                            {step.caption}
                          </p>
                        ) : null}
                        {step.image ? (
                          <div className="relative aspect-[4/2] overflow-hidden rounded-lg border border-white/10">
                            <Image
                              src={step.image}
                              alt={step.title}
                              fill
                              className="object-cover"
                              sizes="(min-width: 1024px) 600px, 90vw"
                            />
                          </div>
                        ) : null}
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            );
          case "peopleGrid":
            return (
              <section key={idx} className="section space-y-4">
                <h2 className="text-2xl font-semibold">{section.title}</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3">
                  {section.people.map((person, pIdx) => (
                    <article key={pIdx} className="card space-y-3">
                      {person.image ? (
                        <div className="w-20 h-20 rounded-full overflow-hidden relative">
                          <Image
                            src={person.image}
                            alt={person.name}
                            fill
                            sizes="80px"
                            className="object-cover"
                          />
                        </div>
                      ) : null}
                      <div>
                        <h3 className="font-semibold">{person.name}</h3>
                        {person.role ? (
                          <p className="text-white/70 text-sm">{person.role}</p>
                        ) : null}
                      </div>
                      {person.bio ? (
                        <p className="text-white/70 text-sm leading-relaxed">
                          {person.bio}
                        </p>
                      ) : null}
                      {person.links && person.links.length ? (
                        <div className="flex flex-wrap gap-2 pt-2">
                          {person.links.map((link) => (
                            <Link
                              key={link.href}
                              href={link.href}
                              className="text-xs text-sky-300 underline"
                            >
                              {link.label}
                            </Link>
                          ))}
                        </div>
                      ) : null}
                    </article>
                  ))}
                </div>
              </section>
            );
          case "logosGrid":
            return (
              <section key={idx} className="section space-y-4">
                {section.title ? (
                  <h2 className="text-2xl font-semibold">{section.title}</h2>
                ) : null}
                {section.intro ? (
                  <p className="text-white/70">{section.intro}</p>
                ) : null}
                <div className="grid md:grid-cols-2 lg:grid-cols-3">
                  {section.cards.map((card, cIdx) => (
                    <article key={cIdx} className="card space-y-3">
                      {card.image ? (
                        <div className="h-16 flex items-center">
                          <Image
                            src={card.image}
                            alt={card.title}
                            width={160}
                            height={64}
                            className="object-contain max-h-16 w-auto"
                          />
                        </div>
                      ) : null}
                      <h3 className="font-semibold">{card.title}</h3>
                      {card.body ? (
                        <p className="text-white/70 text-sm">{card.body}</p>
                      ) : null}
                      {card.links && card.links.length ? (
                        <div className="flex flex-wrap gap-2">
                          {card.links.map((link) => (
                            <Link
                              key={link.href}
                              href={link.href}
                              className="text-xs text-sky-300 underline"
                            >
                              {link.label}
                            </Link>
                          ))}
                        </div>
                      ) : null}
                    </article>
                  ))}
                </div>
              </section>
            );
          case "faq":
            return (
              <section key={idx} className="section space-y-4">
                {section.title ? (
                  <h2 className="text-2xl font-semibold">{section.title}</h2>
                ) : null}
                <div className="space-y-3">
                  {section.items.map((item, fIdx) => (
                    <details key={fIdx} className="card">
                      <summary className="font-semibold cursor-pointer">
                        {item.question}
                      </summary>
                      <p className="text-white/70 mt-2">{item.answer}</p>
                    </details>
                  ))}
                </div>
              </section>
            );
          case "ctaBanner":
            return (
              <section key={idx} className="section">
                <div className="card flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-semibold">{section.title}</h3>
                    {section.body ? (
                      <p className="text-white/70 mt-1">{section.body}</p>
                    ) : null}
                  </div>
                  {section.cta ? (
                    <Link href={section.cta.href} className="btn btn--mapp-primary">
                      {section.cta.label}
                    </Link>
                  ) : null}
                </div>
              </section>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
