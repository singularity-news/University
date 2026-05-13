import { useState } from "react";
import { SectionHeader } from "./SectionHeader";

// Cross-origin iframes can't be restyled from the parent. We control the
// surrounding wrapper so it always matches the dark-blue site theme with
// white typography, and we provide explicit loading + error fallbacks so
// users never see a flash of unstyled (white) content.
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
}: {
  src: string;
  title: string;
  height?: number;
  maxWidth?: number;
}) => {
  const [state, setState] = useState<"loading" | "ready" | "error">("loading");

  return (
    <div
      className="relative rounded-xl border border-border bg-background overflow-hidden text-foreground"
      style={{ minHeight: Math.min(height, 320) }}
    >
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

      {/* Error fallback — same dark theme, white text */}
      {state === "error" && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-background text-foreground p-6 text-center">
          <span className="text-[11px] tracking-[0.25em] uppercase text-accent">Embed unavailable</span>
          <p className="text-sm text-muted-foreground max-w-xs">
            {title} could not be loaded. Please refresh or open the source directly.
          </p>
          <a
            href={src}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs tracking-[0.2em] uppercase text-primary hover:underline"
          >
            Open source ↗
          </a>
        </div>
      )}

      <iframe
        src={src}
        title={title}
        height={height}
        loading="lazy"
        onLoad={() => setState("ready")}
        onError={() => setState("error")}
        className="w-full block bg-background"
        style={{ ...iframeStyle, maxWidth: maxWidth ? `${maxWidth}px` : "100%", margin: maxWidth ? "0 auto" : undefined, opacity: state === "ready" ? 1 : 0, transition: "opacity 250ms ease" }}
      />
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
