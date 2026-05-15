import { useEffect, useState } from "react";
import { RefreshCw, Play, ExternalLink } from "lucide-react";
import { SectionHeader } from "./SectionHeader";

// Persist the user's "Load embed" opt-in across visits so heavy third-party
// iframes don't require a second click on subsequent page loads.
const LS_PREFIX = "embed:loaded:";
const wasLoaded = (src: string) => {
  if (typeof window === "undefined") return false;
  try {
    return window.localStorage.getItem(LS_PREFIX + src) === "1";
  } catch {
    return false;
  }
};
const rememberLoaded = (src: string) => {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(LS_PREFIX + src, "1");
  } catch {
    /* storage disabled — silently ignore */
  }
};

// Cross-origin iframes can't be restyled from the parent. We control the
// surrounding wrapper so it always matches the dark-blue site theme with
// white typography, provide explicit loading + error fallbacks, and keep
// heavy third-party widgets behind an opt-in "Load embed" action so they
// never block the rest of the page from rendering.
const iframeStyle = {
  border: 0,
  background: "hsl(var(--background))",
  colorScheme: "dark" as const,
};

const Frame = ({
  src,
  title,
  height = 1200,
  maxWidth,
  autoLoad = false,
}: {
  src: string;
  title: string;
  height?: number;
  maxWidth?: number;
  /** When false the iframe stays gated behind a "Load embed" button. */
  autoLoad?: boolean;
}) => {
  const [state, setState] = useState<"idle" | "loading" | "ready" | "error">(
    autoLoad ? "loading" : "idle",
  );
  // bumping this nonce forces the <iframe> to remount on retry
  const [nonce, setNonce] = useState(0);

  // Auto-load if the user already opted in for this src on a previous visit.
  useEffect(() => {
    if (state === "idle" && wasLoaded(src)) setState("loading");
  }, [src, state]);

  const start = () => {
    rememberLoaded(src);
    setState("loading");
    setNonce((n) => n + 1);
  };

  const retry = () => {
    setState("loading");
    setNonce((n) => n + 1);
  };

  return (
    <div
      className="relative rounded-xl border border-border bg-background overflow-hidden text-foreground"
      style={{ minHeight: Math.min(height, 320) }}
    >
      {/* Idle (opt-in) — keeps third-party widgets from blocking content */}
      {state === "idle" && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-background text-foreground p-6 text-center">
          <span className="text-[11px] tracking-[0.25em] uppercase text-accent">External embed</span>
          <p className="text-sm text-muted-foreground max-w-sm">
            {title} is hosted by a third party. Loading it on demand keeps this page fast.
          </p>
          <div className="flex flex-wrap items-center gap-3 justify-center">
            <button
              onClick={start}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-primary/60 bg-primary/10 text-foreground text-xs tracking-[0.2em] uppercase hover:bg-primary/20 transition-all"
            >
              <Play className="h-3.5 w-3.5" /> Load embed
            </button>
            <a
              href={src}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground"
            >
              Open source <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      )}

      {/* Loading skeleton — keeps wrapper dark-blue while iframe initialises */}
      {state === "loading" && (
        <div
          className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-background text-foreground/70"
          aria-hidden="true"
        >
          <div className="h-8 w-8 rounded-full border-2 border-primary/40 border-t-primary animate-spin" />
          <span className="text-[11px] tracking-[0.25em] uppercase text-muted-foreground">
            Loading {title}
          </span>
        </div>
      )}

      {/* Error fallback — same dark theme, white text, with retry */}
      {state === "error" && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-background text-foreground p-6 text-center">
          <span className="text-[11px] tracking-[0.25em] uppercase text-accent">Embed unavailable</span>
          <p className="text-sm text-muted-foreground max-w-xs">
            {title} could not be loaded. Try again or open the source directly.
          </p>
          <div className="flex flex-wrap items-center gap-3 justify-center">
            <button
              onClick={retry}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-primary/60 bg-primary/10 text-foreground text-xs tracking-[0.2em] uppercase hover:bg-primary/20 transition-all"
            >
              <RefreshCw className="h-3.5 w-3.5" /> Retry
            </button>
            <a
              href={src}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground"
            >
              Open source <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      )}

      {state !== "idle" && (
        <iframe
          key={nonce}
          src={src}
          title={title}
          height={height}
          loading="lazy"
          onLoad={() => {
            rememberLoaded(src);
            setState("ready");
          }}
          onError={() => setState("error")}
          className="w-full block bg-background"
          style={{
            ...iframeStyle,
            maxWidth: maxWidth ? `${maxWidth}px` : "100%",
            margin: maxWidth ? "0 auto" : undefined,
            opacity: state === "ready" ? 1 : 0,
            transition: "opacity 250ms ease",
          }}
        />
      )}
    </div>
  );
};

export const Embeds = () => (
  <section id="channels" className="section-pad border-t border-border/60 relative bg-background text-foreground">
    <div className="container space-y-16">
      <div>
        <SectionHeader
          eyebrow="Video Channel"
          title="YouTube · Singularity University"
          description="Lectures, dispatches and conversations on Juridical Singularity, Electric Technocracy and the new international legal order."
        />
        <Frame
          src="https://widgets.sociablekit.com/youtube-channel-videos/iframe/25680810"
          title="Singularity University · YouTube"
          height={1000}
        />
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div>
          <SectionHeader
            eyebrow="RSS Wire I"
            title="Editorial & Research Feed"
            description="Curated global publications on AI law, governance and infrastructure sovereignty."
          />
          <Frame src="https://rss.app/embed/v1/list/4CuB6torzVbnQAzt" title="RSS feed I" height={1600} />
        </div>

        <div>
          <SectionHeader
            eyebrow="RSS Wire II"
            title="Technology & Policy Feed"
            description="Cross-syndicated dispatches from leading technology and policy publications."
          />
          <Frame src="https://rss.app/embed/v1/list/tZA7cHwU1KSA9pah" title="RSS feed II" height={1600} />
        </div>
      </div>

      <div>
        <SectionHeader
          eyebrow="Threads · Social Wire"
          title="Latest from Threads"
          description="Live posts syndicated from the Singularity University Threads channel."
        />
        <Frame
          src="https://widgets.sociablekit.com/threads-posts/iframe/25681284"
          title="Threads · Singularity University"
          height={1200}
          maxWidth={520}
        />
      </div>
    </div>
  </section>
);
