import { useEffect, useState } from "react";
import { Twitter, Facebook, Linkedin, Link2, Check } from "lucide-react";

interface Props {
  url: string;
  title: string;
}

export const ShareButtons = ({ url, title }: Props) => {
  const [absUrl, setAbsUrl] = useState(url);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (/^https?:\/\//i.test(url)) setAbsUrl(url);
    else setAbsUrl(window.location.origin + url);
  }, [url]);

  const enc = encodeURIComponent;
  const links = [
    {
      label: "Share on X",
      Icon: Twitter,
      href: `https://twitter.com/intent/tweet?url=${enc(absUrl)}&text=${enc(title)}`,
    },
    {
      label: "Share on Facebook",
      Icon: Facebook,
      href: `https://www.facebook.com/sharer/sharer.php?u=${enc(absUrl)}`,
    },
    {
      label: "Share on LinkedIn",
      Icon: Linkedin,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${enc(absUrl)}`,
    },
  ];

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(absUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* ignore */
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-3 my-10">
      <span className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground mr-1">
        Share
      </span>
      {links.map(({ label, Icon, href }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className="h-9 w-9 grid place-items-center rounded-md border border-border bg-card/50 text-muted-foreground hover:text-foreground hover:border-primary/60 hover:bg-primary/10 transition-all"
        >
          <Icon className="h-4 w-4" />
        </a>
      ))}
      <button
        onClick={copy}
        aria-label="Copy link"
        className="h-9 w-9 grid place-items-center rounded-md border border-border bg-card/50 text-muted-foreground hover:text-foreground hover:border-accent/60 hover:bg-accent/10 transition-all"
      >
        {copied ? <Check className="h-4 w-4 text-accent" /> : <Link2 className="h-4 w-4" />}
      </button>
    </div>
  );
};
