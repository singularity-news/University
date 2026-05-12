import { useEffect, ReactNode } from "react";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";

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

interface Props {
  title: string;
  description: string;
  path: string;
  eyebrow: string;
  heading: string;
  children: ReactNode;
}

export const StaticPage = ({ title, description, path, eyebrow, heading, children }: Props) => {
  useEffect(() => {
    const absoluteUrl = `${SITE_URL}${path}`;
    const ogImage = `${SITE_URL}/og-image.png`;
    document.title = title;
    setMeta('meta[name="description"]', "content", description);
    setMeta('meta[property="og:title"]', "content", title);
    setMeta('meta[property="og:description"]', "content", description);
    setMeta('meta[property="og:type"]', "content", "website");
    setMeta('meta[property="og:url"]', "content", absoluteUrl);
    setMeta('meta[property="og:image"]', "content", ogImage);
    setMeta('meta[property="og:site_name"]', "content", "Singularity University");
    setMeta('meta[name="twitter:card"]', "content", "summary_large_image");
    setMeta('meta[name="twitter:title"]', "content", title);
    setMeta('meta[name="twitter:description"]', "content", description);
    setMeta('meta[name="twitter:image"]', "content", ogImage);

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = absoluteUrl;
  }, [title, description, path]);

  return (
    <main className="min-h-screen bg-background">
      <Nav />
      <article className="relative pt-32 pb-24">
        <div className="container max-w-3xl">
          <div className="text-[10px] tracking-[0.25em] uppercase text-accent mb-4">{eyebrow}</div>
          <h1 className="text-3xl md:text-5xl font-semibold leading-[1.1] mb-10">{heading}</h1>
          <div className="prose prose-invert max-w-none prose-headings:text-foreground prose-p:text-foreground/85 prose-p:leading-relaxed prose-p:text-base md:prose-p:text-lg prose-li:text-foreground/85 prose-a:text-primary prose-strong:text-foreground">
            {children}
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
