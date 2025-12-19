import { notFound } from "next/navigation";
import { HeroSection } from "../components/HeroSection";
import { ContentSections } from "../components/ContentSections";
import { getHomePage, getBlogPosts, buildMetadata } from "../lib/content";
import { BlogList } from "../components/BlogList";

export const metadata = (() => {
  const home = getHomePage();
  return home ? buildMetadata(home) : {};
})();

export default function Page() {
  const page = getHomePage();
  if (!page) return notFound();
  const latestPosts = getBlogPosts().slice(0, 3);
  return (
    <div className="space-y-10">
      {page.hero ? <HeroSection hero={page.hero} /> : null}
      {page.sections ? <ContentSections sections={page.sections} /> : null}
      <BlogList posts={latestPosts} />
    </div>
  );
}
