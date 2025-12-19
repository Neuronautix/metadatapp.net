import { notFound } from "next/navigation";
import { HeroSection } from "../../components/HeroSection";
import { ContentSections } from "../../components/ContentSections";
import {
  getPageBySlug,
  getStaticParams,
  buildMetadata,
  getBlogPosts
} from "../../lib/content";
import { BlogPost } from "../../components/BlogPost";
import { BlogList } from "../../components/BlogList";

type Props = { params: { slug?: string[] } };

export async function generateStaticParams() {
  return getStaticParams();
}

export async function generateMetadata({ params }: Props) {
  const slug = "/" + (params.slug ?? []).join("/");
  const page = getPageBySlug(slug);
  if (!page) return {};
  return buildMetadata(page);
}

export default function Page({ params }: Props) {
  const slug = "/" + (params.slug ?? []).join("/");
  const page = getPageBySlug(slug);
  if (!page) return notFound();

  if (page.slug === "/blog") {
    const posts = getBlogPosts();
    return <BlogList posts={posts} />;
  }

  if (page.layout === "blog") {
    return <BlogPost title={page.title} body={page.body} publishAt={page.publishAt} />;
  }

  return (
    <div className="space-y-10">
      {page.hero ? <HeroSection hero={page.hero} /> : null}
      {page.sections ? <ContentSections sections={page.sections} /> : null}
    </div>
  );
}
