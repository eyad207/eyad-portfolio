# Eyad Lazkani — Portfolio

Personal portfolio built with Next.js App Router, TypeScript, and a structured portfolio data layer.

## Run locally

```bash
npm install
npm run dev
```

The site uses the real portfolio information in `lib/portfolio-data.ts` until Supabase is configured. Copy `.env.example` to `.env.local` to add contact details; empty contact values are omitted from the site.

## Supabase

1. Create a Supabase project.
2. Run `supabase/migrations/202610070001_portfolio.sql` in the Supabase SQL editor.
3. Add `SUPABASE_URL` and `SUPABASE_ANON_KEY` to `.env.local`.

The site reads published portfolio content using the public/anon key and row-level security, with Next.js revalidating the cached portfolio data hourly. Do not add a service-role key to this application. The migration seeds the provided projects, experience, and events, and enables public read-only policies. Keep private repository credentials out of the public portfolio; GitHub repository integration is not implemented.

## Add a profile photo

Place your own portrait at `public/images/profile.jpg`. Until that file is present, the site displays a labeled initials placeholder instead of a generated or unrelated photo.

## Add a CV or contact details

Set `EMAIL_ADDRESS`, `LINKEDIN_URL`, `PHONE_NUMBER`, or `CV_URL` in `.env.local`. Only non-empty, configured values are displayed. No CV file or unprovided contact details are included.

## Checks

```bash
npm run lint
npx tsc --noEmit
npm run build
```
