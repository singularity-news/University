import { SectionHeader } from "./SectionHeader";

// Cross-origin iframes can't have their inner content restyled from the parent.
// We at minimum control the surrounding wrapper so it matches the dark theme
// (deep blue background, light typography), and force colorScheme on the iframe
// so the browser hints to the embedded page to render in dark mode where supported.
const iframeStyle = {
  border: 0,
  background: "hsl(var(--background))",
  colorScheme: "dark" as const,
};

const Frame = ({
  src,
  title,
  height = 1200,
  width = "100%",
}: {
  src: string;
  title: string;
  height?: number;
  width?: string | number;
}) => (
  <div className="rounded-xl border border-border bg-background overflow-hidden text-foreground">
    <iframe
      src={src}
      title={title}
      width={width as number}
      height={height}
      loading="lazy"
      className="w-full block bg-background"
      style={iframeStyle}
    />
  </div>
);

export const Embeds = () => (
  <section id="channels" className="section-pad border-t border-border/60 relative">
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
        <div className="rounded-xl border border-border bg-background overflow-hidden text-foreground flex justify-center">
          <iframe
            src="https://widgets.sociablekit.com/threads-posts/iframe/25681284"
            title="Threads · Singularity University"
            width={500}
            height={1200}
            loading="lazy"
            className="block bg-background w-full max-w-[520px]"
            style={iframeStyle}
          />
        </div>
      </div>
    </div>
  </section>
);
