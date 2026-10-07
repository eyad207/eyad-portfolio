import "server-only";

function configuredValue(value: string | undefined) {
  const trimmed = value?.trim();
  if (!trimmed || /^[A-Z][A-Z0-9_]+$/.test(trimmed)) return undefined;
  return trimmed;
}

export const siteConfig = {
  name: "Eyad Lazkani",
  github: "https://github.com/eyad207",
  email: configuredValue(process.env.EMAIL_ADDRESS),
  linkedin: configuredValue(process.env.LINKEDIN_URL),
  phone: configuredValue(process.env.PHONE_NUMBER),
  cv: configuredValue(process.env.CV_URL),
};
