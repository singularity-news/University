import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import articlesData from "@/data/articles.json";

const SITE_URL = (import.meta.env.VITE_SITE_URL as string | undefined)?.replace(/\/$/, "")
  || (typeof window !== "undefined" ? window.location.origin : "");

const setMeta = (selector: string, attr: string, value: string) => {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement("meta");
    const [, key, val] = selector.match(/\[(.+?)="(.+?)"\]/) || [];
    if (key && val) el.setAttribute(key, val);
    document.head.appendChild(el);
  }
  el.setAttribute(attr, value);
};

const NewsArticle = () => {
  const { slug } = useParams<{ slug: string }>();
  const cleanSlug = (slug || "").replace(/\.html$/, "");
  const article = articlesData.find((a) => a.slug === cleanSlug);


  useEffect(() => {
    if (!article) return;
    const path = `/news/${article.slug}.html`;
    const absoluteUrl = `${SITE_URL}${path}`;
    document.title = `${article.title} | Singularity University`;

    setMeta('meta[name="description"]', "content", article.excerpt);

    const ogImage = `${SITE_URL}/og-image.png`;

    // OpenGraph
    setMeta('meta[property="og:title"]', "content", article.title);
    setMeta('meta[property="og:description"]', "content", article.excerpt);
    setMeta('meta[property="og:type"]', "content", "article");
    setMeta('meta[property="og:url"]', "content", absoluteUrl);
    setMeta('meta[property="og:site_name"]', "content", "Singularity University");
    setMeta('meta[property="og:image"]', "content", ogImage);
    setMeta('meta[property="og:image:alt"]', "content", "Singularity University · KdK Krzb.");
    setMeta('meta[property="article:published_time"]', "content", article.date);
    setMeta('meta[property="article:section"]', "content", article.category);
    setMeta('meta[property="article:author"]', "content", `Singularity University — ${article.author}`);

    // Twitter Card
    setMeta('meta[name="twitter:card"]', "content", "summary_large_image");
    setMeta('meta[name="twitter:title"]', "content", article.title);
    setMeta('meta[name="twitter:description"]', "content", article.excerpt);
    setMeta('meta[name="twitter:url"]', "content", absoluteUrl);
    setMeta('meta[name="twitter:image"]', "content", ogImage);

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = absoluteUrl;

    const ld = document.createElement("script");
    ld.type = "application/ld+json";
    ld.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "NewsArticle",
      headline: article.title,
      description: article.excerpt,
      datePublished: article.date,
      author: { "@type": "Organization", name: `Singularity University — ${article.author}` },
      publisher: { "@type": "Organization", name: "Singularity University KdK Krzb." },
      mainEntityOfPage: absoluteUrl,
      url: absoluteUrl,
      articleSection: article.category,
    });
    document.head.appendChild(ld);
    return () => {
      document.head.removeChild(ld);
    };
  }, [article]);

  if (!article) {
    return (
      <main className="min-h-screen bg-background">
        <Nav />
        <section className="container max-w-2xl pt-40 pb-32 text-center">
          <h1 className="text-3xl font-semibold mb-4">Article not found</h1>
          <p className="text-muted-foreground mb-8">The publication you requested does not exist.</p>
          <Link to="/news.html" className="text-primary text-sm tracking-[0.2em] uppercase">
            ← Back to News Portal
          </Link>
        </section>
        <Footer />
      </main>
    );
  }

  const body = article.body || [article.excerpt];

  return (
    <main className="min-h-screen bg-background">
      <Nav />

      <article className="relative pt-32 pb-24">
        <div className="container max-w-3xl">
          <Link
            to="/news.html"
            className="inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-muted-foreground hover:text-primary transition-colors mb-10"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to News Portal
          </Link>

          <div className="text-[10px] tracking-[0.25em] uppercase text-accent mb-4">
            {article.category} · {article.dateLabel}
          </div>

          <h1 className="text-3xl md:text-5xl font-semibold leading-[1.1] mb-6">{article.title}</h1>

          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-10">{article.excerpt}</p>

          <div className="text-xs tracking-[0.2em] uppercase text-muted-foreground border-y border-border/60 py-4 mb-12">
            By {article.author} — {new Date(article.date).getFullYear()}
          </div>

          <div className="prose prose-invert max-w-none prose-p:text-foreground/85 prose-p:leading-relaxed prose-p:text-base md:prose-p:text-lg">
            {body.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          <div className="mt-16 pt-8 border-t border-border/60 text-xs tracking-[0.2em] uppercase text-muted-foreground">
            Singularity University · KdK Krzb. · Editorial Board
          </div>
        </div>
      </article>

      <Footer />
    </main>
  );
};

export default NewsArticle;
