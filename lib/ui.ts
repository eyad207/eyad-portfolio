const container =
  "mx-auto w-[calc(100%-40px)] md:w-[min(1140px,calc(100%-56px))] lg:w-[min(1160px,calc(100%-80px))]";

const button =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-transparent px-4 text-xs font-bold transition-colors";

export const ui = {
  container,
  pageMain: `${container} min-h-[70vh] pt-14 pb-[72px] md:pt-[76px] md:pb-[96px]`,
  loading: "pt-2.5 text-xs text-muted",
  eyebrow:
    "font-mono text-[10px] leading-normal font-medium tracking-[0.08em] text-subtle uppercase",
  pageTitle:
    "text-[clamp(38px,5vw,58px)] leading-[1.1] font-bold tracking-[-0.06em]",
  heroTitle:
    "text-[clamp(43px,11vw,62px)] leading-[1.04] font-extrabold tracking-[-0.07em] md:text-[clamp(44px,5.7vw,72px)]",
  sectionTitle:
    "text-[clamp(27px,3vw,36px)] leading-[1.15] font-bold tracking-[-0.055em]",
  blockTitle:
    "text-[21px] leading-[1.2] font-bold tracking-[-0.045em] md:text-[23px]",
  introDescription: "max-w-[590px] text-[15px] leading-[1.8] text-muted",
  sectionCopy: "text-[13px] leading-[1.85] text-muted",
  section:
    "border-t border-border pt-14 pb-16 md:pt-20 md:pb-[84px]",
  sectionHeading:
    "mb-[22px] flex flex-col items-start gap-3 md:mb-[29px] md:flex-row md:items-end md:justify-between md:gap-8",
  button,
  buttonPrimary: `${button} bg-accent text-white shadow-sm hover:bg-[var(--accent-strong)]`,
  buttonSecondary: `${button} border-border bg-white text-foreground hover:border-accent/30 hover:bg-surface`,
  textLink:
    "inline-flex items-center gap-1.5 text-xs font-bold text-accent underline decoration-accent/25 underline-offset-4 transition-colors hover:text-[var(--accent-strong)] hover:decoration-accent",
  projectGrid:
    "grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-[18px] lg:grid-cols-3",
  projectGridSecondary:
    "grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-[18px]",
  detailList:
    "grid list-disc gap-[7px] pl-[19px] text-xs leading-[1.7] text-muted marker:text-accent",
  twoColumn:
    "grid items-start gap-[23px] md:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)] md:gap-[42px] lg:gap-[90px]",
  splitBlock:
    "grid gap-3.5 border-t border-border py-6 pb-[26px] md:gap-[35px] md:py-8 md:pb-[34px] md:grid-cols-[minmax(210px,0.65fr)_minmax(0,1fr)] lg:gap-[65px]",
  blockParagraph: "mt-[7px] text-xs leading-[1.8] text-muted [&+p]:mt-3",
  timeline: "border-t border-border",
  timelineEntry:
    "grid gap-2.5 border-b border-border pt-[21px] pb-[25px] md:grid-cols-[minmax(175px,0.45fr)_minmax(0,1fr)] md:gap-[55px] md:pt-7 md:pb-8",
  timelineDate: "font-mono text-[10px] leading-[1.7] text-muted",
  detailSection: "mb-[34px]",
  detailHeading: "mb-[11px] text-[17px] font-[560] tracking-[-0.025em]",
  detailParagraph: "max-w-[700px] text-[13px] leading-[1.85] text-muted",
  card: "rounded-xl border border-border bg-white",
} as const;
