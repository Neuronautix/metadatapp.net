"use client";

import { useState } from "react";

type Card = { title: string; body: string };

type Option = {
  key: string;
  label: string;
  cards: Card[];
};

type ToggleCardsProps = {
  title?: string;
  options: Option[];
};

export function ToggleCards({ title, options }: ToggleCardsProps) {
  const [mode, setMode] = useState(options[0]?.key ?? "");
  const active = options.find((opt) => opt.key === mode) ?? options[0];

  return (
    <section className="section space-y-6">
      {title ? <h2 className="text-2xl font-semibold">{title}</h2> : null}
      <div className="flex flex-wrap gap-3">
        {options.map((opt) => {
          const isActive = opt.key === mode;
          return (
            <button
              key={opt.key}
              type="button"
              onClick={() => setMode(opt.key)}
              className={`px-4 py-2 rounded-full border text-sm font-semibold transition ${
                isActive
                  ? "bg-[var(--accent-dark)] border-[var(--accent)] text-white"
                  : "bg-transparent border-white/20 text-white/80 hover:border-[var(--accent)] hover:text-[var(--accent)]"
              }`}
              aria-pressed={isActive}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
      {active ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {active.cards.map((card) => (
            <article key={card.title} className="card space-y-3">
              <h3 className="text-lg font-semibold">{card.title}</h3>
              <p className="text-white/70">{card.body}</p>
            </article>
          ))}
        </div>
      ) : null}
    </section>
  );
}
