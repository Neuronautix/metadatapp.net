import "../app/globals.css";
import type { Metadata } from "next";
import { getNavItems, getSiteMeta } from "../lib/content";

export const metadata: Metadata = getSiteMeta();

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const groupedNav = getNavItems().reduce<
    Record<string, { label: string; slug: string; group?: string }[]>
  >((acc, item) => {
    const key = item.group || "Other";
    acc[key] = acc[key] ? [...acc[key], item] : [item];
    return acc;
  }, {});
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen flex flex-col">
          <header className="sticky top-0 z-20 backdrop-blur bg-black/40 border-b border-white/10">
            <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
              <a href="/" className="font-semibold text-lg">
                Metadatapp
              </a>
              <nav className="flex items-center gap-6 text-sm">
                {Object.entries(groupedNav).map(([group, items]) => (
                  <div key={group} className="relative group">
                    <button className="text-white/70 hover:text-[var(--accent)] font-medium px-2 py-1">
                      {group}
                    </button>
                    <div className="absolute left-0 top-full pt-2 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition">
                      <div className="min-w-[180px] rounded-lg border border-white/10 bg-black/80 p-3 shadow-xl flex flex-col gap-2">
                        {items.map((item) => (
                          <a
                            key={item.slug}
                            href={item.slug}
                            className="hover:text-[var(--accent)] text-white/80"
                          >
                            {item.label}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </nav>
            </div>
          </header>
          <main className="flex-1 mx-auto max-w-6xl px-6 py-10">{children}</main>
          <footer className="border-t border-white/10 py-8 text-center text-sm text-white/70">
            © {new Date().getFullYear()} Metadatapp. Built with Next.js + Markdown.
          </footer>
        </div>
      </body>
    </html>
  );
}
