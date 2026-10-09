import Link from "next/link";
import { ArrowUpRight, Mail } from "lucide-react";
import { ui } from "@/lib/ui";

export default function SiteFooter() {
  const currentYear = 2026;
  return (
    <footer className="border-t border-border bg-surface">
      <div className={`${ui.container} py-12 md:py-14`}>
        <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_auto] md:items-start">
          <div>
            <h3 className="text-xl font-extrabold tracking-[-0.045em]">Eyad Lazkani</h3>
            <p className="mt-3 max-w-md text-sm leading-7 text-muted">
              Data Engineering student and software developer building useful,
              thoughtful products for real people.
            </p>
            <div className="mt-6 flex gap-3">
              <a
                href="https://www.linkedin.com/in/eyad-lazkani-2146702a0/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex size-11 items-center justify-center rounded-xl border border-border bg-white text-muted transition-colors hover:border-accent/30 hover:text-accent"
                aria-label="LinkedIn"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5"
                  aria-hidden="true"
                >
                  <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.44-2.13 2.94v5.67H9.35V8.99h3.42v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.62 0 4.29 2.38 4.29 5.47v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM3.56 8.99h3.56v11.46H3.56V8.99zM22.23 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.21 0 22.23 0z" />
                </svg>
              </a>

              <a
                href="mailto:eyadlaza@gmail.com"
                className="inline-flex size-11 items-center justify-center rounded-xl border border-border bg-white text-muted transition-colors hover:border-accent/30 hover:text-accent"
                aria-label="Email Eyad Lazkani"
              >
                <Mail className="size-5" />
              </a>
            </div>
          </div>
          <div>
            <h4 className="text-xs font-extrabold tracking-[0.08em] text-subtle uppercase">
              Explore
            </h4>
            <ul className="mt-4 grid gap-2.5">
              <li>
                <Link
                  href="/"
                  className="inline-flex items-center gap-1.5 text-sm font-bold text-muted transition-colors hover:text-accent"
                >
                  Home <ArrowUpRight className="size-3.5" aria-hidden="true" />
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="inline-flex items-center gap-1.5 text-sm font-bold text-muted transition-colors hover:text-accent"
                >
                  About <ArrowUpRight className="size-3.5" aria-hidden="true" />
                </Link>
              </li>
              <li>
                <Link
                  href="/projects"
                  className="inline-flex items-center gap-1.5 text-sm font-bold text-muted transition-colors hover:text-accent"
                >
                  Projects <ArrowUpRight className="size-3.5" aria-hidden="true" />
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-1.5 text-sm font-bold text-muted transition-colors hover:text-accent"
                >
                  Contact <ArrowUpRight className="size-3.5" aria-hidden="true" />
                </Link>
              </li>
            </ul>
          </div>

        </div>
        <div className="mt-10 flex flex-col gap-3 border-t border-border pt-6 text-xs text-subtle md:flex-row md:items-center md:justify-between">
          <p>
            © {currentYear} Eyad Lazkani. All rights reserved.
          </p>
          <p>Designed and built with care in Oslo.</p>
        </div>
      </div>
    </footer>
  );
}
