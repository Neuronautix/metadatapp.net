import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { Metadata } from "next";
import type { Hero } from "../components/HeroSection";
import type { Section } from "../components/ContentSections";

export type FrontMatter = {
  title: string;
  layout?: "page" | "blog";
  slug?: string;
  showInNav?: boolean;
  navOrder?: number;
  navGroup?: string;
  hero?: Hero;
  sections?: Section[];
  description?: string;
  publishAt?: string;
};

export type LoadedContent = FrontMatter & {
  body: string;
  slug: string;
};

const contentDir = path.join(process.cwd(), "content");

function walkMarkdownFiles(dir: string): string[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  return entries.flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return walkMarkdownFiles(full);
    if (entry.isFile() && entry.name.endsWith(".md")) return [full];
    return [];
  });
}

function normalizeSlug(rawSlug: string | undefined, filePath: string): string {
  if (rawSlug) return rawSlug === "/" ? "/" : rawSlug.replace(/\/+$/, "");
  const relative = path.relative(contentDir, filePath);
  const withoutExt = relative.replace(/\\/g, "/").replace(/\.md$/, "");
  if (withoutExt === "home") return "/";
  return "/" + withoutExt.replace(/index$/, "");
}

function parseMarkdown(filePath: string): LoadedContent {
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const fm = data as FrontMatter;
  return {
    ...fm,
    body: content.trim(),
    slug: normalizeSlug(fm.slug, filePath),
    layout: fm.layout ?? "page"
  };
}

export function getAllContent(): LoadedContent[] {
  return walkMarkdownFiles(contentDir).map(parseMarkdown);
}

export function getHomePage(): LoadedContent | null {
  const all = getAllContent();
  return (
    all.find((item) => item.slug === "/") ??
    all.find((item) => item.slug === "/home") ??
    null
  );
}

export function getPageBySlug(slug: string): LoadedContent | null {
  const all = getAllContent();
  return all.find((item) => item.slug === slug) ?? null;
}

export function getNavItems() {
  return getAllContent()
    .filter((item) => item.showInNav)
    .sort((a, b) => (a.navOrder ?? 0) - (b.navOrder ?? 0))
    .map((item) => ({
      label: item.title,
      slug: item.slug,
      group: item.navGroup
    }));
}

export function getBlogPosts(): LoadedContent[] {
  const now = new Date();
  return getAllContent()
    .filter((item) => item.layout === "blog")
    .filter((item) => {
      if (!item.publishAt) return true;
      return new Date(item.publishAt) <= now;
    })
    .sort((a, b) => {
      const aDate = a.publishAt ? new Date(a.publishAt).getTime() : 0;
      const bDate = b.publishAt ? new Date(b.publishAt).getTime() : 0;
      return bDate - aDate;
    });
}

export function getBlogStaticParams() {
  return getBlogPosts().map((post) => ({
    slug: post.slug.replace(/^\//, "").split("/")
  }));
}

function findFirstImage(body: string): string | null {
  const match = body.match(/!\[[^\]]*]\(([^)]+)\)/);
  return match ? match[1] : null;
}

export function getSiteMeta(): Metadata {
  const sitePath = path.join(contentDir, "_site.md");
  if (fs.existsSync(sitePath)) {
    const { data } = matter.read(sitePath);
    const meta = data as {
      title?: string;
      description?: string;
      openGraph?: Metadata["openGraph"];
      twitter?: Metadata["twitter"];
    };
    return {
      title: meta.title ?? "Metadatapp",
      description: meta.description ?? "Metadata management for preclinical research",
      openGraph: meta.openGraph,
      twitter: meta.twitter
    };
  }
  return {
    title: "Metadatapp",
    description: "Metadata management for preclinical research"
  };
}

export function buildMetadata(page: LoadedContent): Metadata {
  const firstImage = page.hero?.backgroundImage ?? findFirstImage(page.body);
  return {
    title: page.title,
    description: page.description ?? page.hero?.subtitle,
    openGraph: {
      title: page.title,
      description: page.description ?? page.hero?.subtitle,
      images: firstImage ? [{ url: firstImage }] : undefined
    }
  };
}

export function getStaticParams() {
  return getAllContent()
    .filter((item) => item.slug !== "/")
    .map((item) => ({
      slug: item.slug.replace(/^\//, "").split("/").filter(Boolean)
    }));
}
