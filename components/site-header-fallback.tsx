import Link from "next/link";
import { navigation } from "@/components/navigation-links";
import { ui } from "@/lib/ui";

export function SiteHeaderFallback() {
  return (
    <header className="sticky top-0 z-10 border-b border-border/70 bg-white/80 backdrop-blur-lg">
      <div className={`${ui.container} flex h-16 items-center justify-between md:h-[72px]`}>
        <Link className="inline-flex items-center gap-2.5 text-[15px] font-semibold tracking-tight" href="/">
          <span aria-hidden="true" className="grid size-8 place-items-center rounded-lg bg-linear-to-br from-accent to-indigo-500 text-sm font-bold text-white shadow-sm">E</span>
          <span>Eyad Lazkani</span>
        </Link>
        <nav className="flex items-center gap-1 overflow-x-auto" aria-label="Main navigation">
          {navigation.map(({ href, label }) => (
            <Link className="rounded-lg px-3 py-1.5 text-sm font-medium text-muted" href={href} key={href}>{label}</Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
