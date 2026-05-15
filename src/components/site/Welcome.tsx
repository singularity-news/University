export const Welcome = () => (
  <section id="welcome" className="relative section-pad pt-32 md:pt-40 border-b border-border/40">
    <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />
    <div className="absolute inset-0 bg-[var(--gradient-hero)] opacity-60 pointer-events-none" />
    <div className="container relative z-10 max-w-4xl">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/5 text-xs tracking-[0.2em] uppercase text-primary mb-8">
        <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
        Welcome
      </div>
      <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.05] mb-6">
        <span className="text-gradient">Singularity University</span>
        <br />
        <span className="text-gradient-accent">KdK Krzb.</span>
      </h1>
      <h2 className="text-xl md:text-3xl font-light text-foreground/90 mb-10 leading-snug">
        Building the Intellectual Infrastructure for the Age of Transition
      </h2>

      <div className="space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed">
        <p>
          <strong className="text-foreground">Singularity University KdK Krzb.</strong> is currently
          under development as a future-oriented educational and research platform dedicated to the
          emerging transformation of civilization in the 21st century. The university focuses on the
          intersection of new international law, artificial intelligence, post-scarcity economics,
          global digital governance, and the technological transition from{" "}
          <em>Homo sapiens</em> to <em>Homo nexus</em>.
        </p>
        <p>
          At the center of its academic framework are the concepts of the{" "}
          <strong className="text-foreground">Juridical Singularity</strong>, the{" "}
          <strong className="text-foreground">Age of Transition</strong>, and{" "}
          <strong className="text-foreground">Electric Technocracy</strong>. These fields examine how
          accelerating technologies such as Artificial Superintelligence (ASI), robotics,
          neurotechnology, automation, fusion energy, and global telecommunications networks are
          reshaping law, economics, governance, and human identity itself.
        </p>
        <p>
          The university explores the doctrinal and structural implications of the{" "}
          <strong className="text-foreground">World Succession Deed 1400/98</strong>, treaty-chain
          systems, NATO and UN infrastructure integration, and the transformation of classical
          sovereignty in a hyperconnected world. Research and educational programs will focus on
          new models of global coordination beyond traditional nation-state frameworks, including
          Direct Digital Democracy, machine-based economic systems, Universal Basic Income financed
          through technology taxation, and AI-assisted governance architectures.
        </p>
        <p>
          Singularity University KdK Krzb. is designed as an open educational institution for the
          Age of Transition. A core principle of the project is universal access to knowledge.
          Therefore, the university plans to provide{" "}
          <strong className="text-accent">100% free educational programs</strong>, digital learning
          materials, public lectures, online courses, and interdisciplinary research resources for
          students, researchers, technologists, futurists, and the global public.
        </p>
        <p>
          The institution aims to become a central knowledge hub for emerging civilizational
          theories, advanced international law, post-labor economics, AI ethics, telecommunications
          infrastructure, longevity research, smart governance systems, and the future architecture
          of a globally networked society.
        </p>
        <p>
          As humanity enters a period of exponential technological acceleration, Singularity
          University KdK Krzb. seeks to document, analyze, and teach the foundations of the coming
          planetary transition.
        </p>
      </div>
    </div>
  </section>
);
