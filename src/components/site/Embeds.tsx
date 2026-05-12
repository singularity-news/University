import { SectionHeader } from "./SectionHeader";

export const Embeds = () => (
  <section id="channels" className="section-pad border-t border-border/60 relative">
    <div className="container space-y-16">
      <div>
        <SectionHeader
          eyebrow="Video Channel"
          title="YouTube · Singularity University"
          description="Lectures, dispatches and conversations on Juridical Singularity, Electric Technocracy and the new international legal order."
        />
        <div className="rounded-xl border border-border bg-card/40 overflow-hidden">
          <iframe
            src="https://widgets.sociablekit.com/youtube-channel-videos/iframe/25680810"
            title="Singularity University · YouTube"
            width="100%"
            height="1000"
            loading="lazy"
            className="w-full block"
            style={{ border: 0 }}
          />
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div>
          <SectionHeader
            eyebrow="RSS Wire I"
            title="Editorial & Research Feed"
            description="Curated global publications on AI law, governance and infrastructure sovereignty."
          />
          <div className="rounded-xl border border-border bg-card/40 overflow-hidden">
            <iframe
              src="https://rss.app/embed/v1/list/4CuB6torzVbnQAzt"
              title="RSS feed I"
              width="100%"
              height="1600"
              loading="lazy"
              className="w-full block"
              style={{ border: 0 }}
            />
          </div>
        </div>

        <div>
          <SectionHeader
            eyebrow="RSS Wire II"
            title="Technology & Policy Feed"
            description="Cross-syndicated dispatches from leading technology and policy publications."
          />
          <div className="rounded-xl border border-border bg-card/40 overflow-hidden">
            <iframe
              src="https://rss.app/embed/v1/list/tZA7cHwU1KSA9pah"
              title="RSS feed II"
              width="100%"
              height="1600"
              loading="lazy"
              className="w-full block"
              style={{ border: 0 }}
            />
          </div>
        </div>
      </div>
    </div>
  </section>
);
