import Link from "next/link";
import type { LoadedContent } from "../lib/content";

type Props = { posts: LoadedContent[] };

export function BlogList({ posts }: Props) {
  if (!posts.length) return null;
  return (
    <section className="section space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Latest updates</h2>
        <Link href="/blog" className="text-sm text-sky-300 underline">
          View all
        </Link>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <article key={post.slug} className="card space-y-3">
            <div className="text-xs uppercase tracking-[0.08em] text-white/60">
              {post.publishAt
                ? new Date(post.publishAt).toLocaleDateString()
                : "Update"}
            </div>
            <h3 className="text-lg font-semibold">
              <Link href={post.slug}>{post.title}</Link>
            </h3>
            {post.description ? (
              <p className="text-white/70 text-sm">{post.description}</p>
            ) : null}
          </article>
        ))}
      </div>
    </section>
  );
}
