import type { ReactNode } from "react";

type TextSectionProps = {
  title?: string;
  children: ReactNode;
};

export function TextSection({ title, children }: TextSectionProps) {
  return (
    <section className="text-section max-w-3xl space-y-4 text-base leading-relaxed text-slate-200">
      {title ? (
        <h2 className="text-xl font-semibold text-slate-50">{title}</h2>
      ) : null}
      <div className="space-y-3 prose prose-invert max-w-none">
        {children}
      </div>
    </section>
  );
}
