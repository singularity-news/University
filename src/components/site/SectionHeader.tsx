interface Props {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}
export const SectionHeader = ({ eyebrow, title, description, align = "left" }: Props) => (
  <div className={`max-w-3xl mb-16 ${align === "center" ? "mx-auto text-center" : ""}`}>
    <div className="text-xs tracking-[0.25em] uppercase text-primary mb-4 flex items-center gap-3">
      {align === "center" && <span className="h-px w-10 bg-primary/40" />}
      {eyebrow}
      <span className="h-px w-10 bg-primary/40" />
    </div>
    <h2 className="text-3xl md:text-5xl font-bold leading-tight text-gradient mb-6">{title}</h2>
    {description && <p className="text-base md:text-lg text-muted-foreground leading-relaxed">{description}</p>}
  </div>
);
