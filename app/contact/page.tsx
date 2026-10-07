import type { Metadata } from "next";
import { PageIntro } from "@/components/page-intro";
import { siteConfig } from "@/lib/site-config";

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
    <main className="container page-main contact-page">
      <PageIntro
        eyebrow="CONTACT"
        title="Get in touch."
        description="I’m open to conversations about software, products, and technology."
      />
      <div className="contact-card">
        <h2>Contact details</h2>
        <ul className="contact-list">
          {configuredLinks.map((item) => (
            <li key={item.label}>
              <span>{item.label}</span>
              <a
                href={item.href}
                target={item.label === "GitHub" || item.label === "LinkedIn" ? "_blank" : undefined}
                rel={item.label === "GitHub" || item.label === "LinkedIn" ? "noreferrer" : undefined}
              >
                {item.detail}
                {(item.label === "GitHub" || item.label === "LinkedIn") && (
                  <span aria-hidden="true"> ↗</span>
                )}
              </a>
            </li>
          ))}
        </ul>
        {!siteConfig.email && (
          <p className="contact-note">
            Email contact details can be added in the site configuration.
          </p>
        )}
      </div>
      {siteConfig.cv && (
        <a className="button button-secondary cv-link" href={siteConfig.cv}>
          View CV <span aria-hidden="true">↗</span>
        </a>
      )}
      <p className="contact-signoff">
        You can also explore my <a href={siteConfig.github} target="_blank" rel="noreferrer">GitHub profile</a>.
      </p>
    </main>
  );
}
