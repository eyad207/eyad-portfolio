import Link from "next/link";
import { navigation } from "@/components/navigation-links";

export function SiteHeaderFallback() {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link className="wordmark" href="/">
          <span className="wordmark-monogram" aria-hidden="true">E</span>
          <span>Eyad Lazkani</span>
        </Link>
        <nav className="primary-nav fallback-nav" aria-label="Main navigation">
          {navigation.map(({ href, label }) => (
            <Link href={href} key={href}>{label}</Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
