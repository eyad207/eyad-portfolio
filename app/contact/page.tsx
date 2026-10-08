import type { Metadata } from "next";
import { PageIntro } from "@/components/page-intro";
import { siteConfig } from "@/lib/site-config";
import { ui } from "@/lib/ui";

export const metadata: Metadata = {
  title: "Contact | Eyad Lazkani",
  description: "Contact Eyad Lazkani and find his GitHub profile.",
};

export default function ContactPage() {
  const configuredLinks = [
    ...(siteConfig.email
      ? [{ label: "Email", detail: siteConfig.email, href: `mailto:${siteConfig.email}` }]
      : []),
    {
      label: "GitHub",
      detail: "github.com/eyad207",
      href: siteConfig.github,
    },
    ...(siteConfig.linkedin
      ? [{ label: "LinkedIn", detail: siteConfig.linkedin, href: siteConfig.linkedin }]
      : []),
    ...(siteConfig.phone
      ? [{ label: "Phone", detail: siteConfig.phone, href: `tel:${siteConfig.phone}` }]
      : []),
  ];

  return (
    <main className={`${ui.pageMain} max-w-[800px]`}>
      <PageIntro
        eyebrow="CONTACT"
        title="Get in touch."
        description="I’m open to conversations about software, products, and technology."
      />
      <div className={`${ui.card} p-[22px]`}>
        <h2 className="mb-[15px] text-[17px] font-[550]">Contact details</h2>
        <ul>
          {configuredLinks.map((item) => {
            const external = item.label === "GitHub" || item.label === "LinkedIn";
            return (
              <li
                className="grid grid-cols-[80px_minmax(0,1fr)] gap-3 border-t border-border py-3 text-xs md:grid-cols-[120px_minmax(0,1fr)] md:gap-5"
                key={item.label}
              >
                <span className="text-muted">{item.label}</span>
                <a
                  className="text-accent [overflow-wrap:anywhere]"
                  href={item.href}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noreferrer" : undefined}
                >
                  {item.detail}
                  {external && <span aria-hidden="true"> ↗</span>}
                </a>
              </li>
            );
          })}
        </ul>
        {!siteConfig.email && (
          <p className="mt-[15px] text-[11px] text-muted">
            Email contact details can be added in the site configuration.
          </p>
        )}
      </div>
      {siteConfig.cv && (
        <a className={`${ui.buttonSecondary} mt-[17px]`} href={siteConfig.cv}>
          View CV <span aria-hidden="true">↗</span>
        </a>
      )}
      <p className="mt-[21px] text-[11px] text-muted">
        You can also explore my{" "}
        <a
          className="text-accent underline underline-offset-[3px]"
          href={siteConfig.github}
          target="_blank"
          rel="noreferrer"
        >
          GitHub profile
        </a>
        .
      </p>
    </main>
  );
}
