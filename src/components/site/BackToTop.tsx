import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export const BackToTop = () => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <button
      type="button"
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={`fixed bottom-6 right-6 z-40 h-11 w-11 grid place-items-center rounded-full border border-primary/50 bg-background/80 backdrop-blur text-foreground shadow-[0_0_24px_hsl(var(--primary)/0.35)] transition-all duration-300 hover:bg-primary/10 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
      }`}
    >
      <ArrowUp className="h-5 w-5" />
    </button>
  );
};
