import MarkdownIt from "markdown-it";

const md = new MarkdownIt({ html: true });

type Props = {
  title: string;
  body: string;
  publishAt?: string;
};

export function BlogPost({ title, body, publishAt }: Props) {
  return (
    <article className="space-y-6">
      <div className="space-y-2">
        <p className="text-xs uppercase tracking-[0.08em] text-white/60">
          {publishAt
            ? new Date(publishAt).toLocaleDateString()
            : "Metadatapp Blog"}
        </p>
        <h1 className="text-3xl font-semibold">{title}</h1>
      </div>
      <div
        className="prose prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: md.render(body) }}
      />
    </article>
  );
}
