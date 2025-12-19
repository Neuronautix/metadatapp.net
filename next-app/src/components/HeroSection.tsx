import Image from "next/image";
import Link from "next/link";

export type Hero = {
  title: string;
  subtitle?: string;
  backgroundImage?: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  badge?: string;
};

type Props = {
  hero: Hero;
};

export function HeroSection({ hero }: Props) {
  const { title, subtitle, backgroundImage, primaryCta, secondaryCta, badge } =
    hero;
  return (
    <section className="hero-wrap p-8 md:p-12 mb-8">
      <div className="grid md:grid-cols-[1.1fr,0.9fr] gap-8 items-center">
        <div className="space-y-4">
          {badge ? (
            <span className="inline-block px-3 py-1 rounded-full bg-white/10 text-xs uppercase tracking-[0.08em]">
              {badge}
            </span>
          ) : null}
          <h1 className="text-3xl md:text-4xl font-semibold leading-tight">
            {title}
          </h1>
          {subtitle ? (
            <p className="text-lg text-white/80 leading-relaxed">{subtitle}</p>
          ) : null}
          <div className="flex flex-wrap gap-3 pt-2">
            {primaryCta ? (
              <Link href={primaryCta.href} className="btn btn--mapp-primary">
                {primaryCta.label}
              </Link>
            ) : null}
            {secondaryCta ? (
              <Link href={secondaryCta.href} className="btn btn--mapp-ghost">
                {secondaryCta.label}
              </Link>
            ) : null}
          </div>
        </div>
        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/5 bg-white/5">
          {backgroundImage ? (
            <Image
              src={backgroundImage}
              alt=""
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 45vw, 90vw"
              priority
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-sky-500/20 via-cyan-500/10 to-emerald-400/20" />
          )}
        </div>
      </div>
    </section>
  );
}
