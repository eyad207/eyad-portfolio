"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { navigation } from "@/components/navigation-links";
import { ui } from "@/lib/ui";

export function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-10 border-b border-border/70 bg-white/80 backdrop-blur-lg supports-[backdrop-filter]:bg-white/70">
      <div className={`${ui.container} relative flex h-16 items-center justify-between md:h-[72px]`}>
        <Link
          className="group inline-flex items-center gap-2.5 rounded-md text-[15px] font-semibold tracking-tight text-foreground outline-none focus-visible:ring-2 focus-visible:ring-accent/50"
          href="/"
          onClick={() => setMenuOpen(false)}
        >
          <span>Eyad Lazkani</span>
        </Link>
        <button
          className="grid size-10 place-items-center rounded-lg border border-border bg-white text-foreground transition-colors hover:bg-surface focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:outline-none md:hidden"
          type="button"
          aria-label={
            menuOpen ? "Close navigation menu" : "Open navigation menu"
          }
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="flex w-[18px] flex-col gap-[5px]" aria-hidden="true">
            <span
              className={`h-0.5 rounded bg-current transition-transform duration-200 ${menuOpen ? "translate-y-[3.5px] rotate-45" : ""}`}
            />
            <span
              className={`h-0.5 rounded bg-current transition-transform duration-200 ${menuOpen ? "-translate-y-[3.5px] -rotate-45" : ""}`}
            />
          </span>
        </button>
        <nav
          className={`${
            menuOpen ? "flex" : "hidden"
          } absolute inset-x-[-20px] top-full flex-col gap-1 border-b border-border bg-white/95 p-3 shadow-lg backdrop-blur-lg md:static md:inset-auto md:flex md:flex-row md:items-center md:gap-1 md:border-0 md:bg-transparent md:p-0 md:shadow-none md:backdrop-blur-none`}
          id="primary-navigation"
          aria-label="Main navigation"
        >
          {navigation.map(({ href, label }) => {
            const active = pathname === href || pathname.startsWith(`${href}/`);
            return (
              <Link
                key={href}
                href={href}
                aria-current={active ? "page" : undefined}
                onClick={() => setMenuOpen(false)}
                className={`rounded-lg px-3.5 py-2.5 text-sm font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-accent/50 md:py-1.5 ${
                  active
                    ? "bg-accent/10 text-accent"
                    : "text-muted hover:bg-surface hover:text-foreground"
                }`}
              >
                {label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
