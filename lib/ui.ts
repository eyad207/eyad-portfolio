const container =
  "mx-auto w-[calc(100%-40px)] md:w-[min(1080px,calc(100%-48px))] lg:w-[min(1080px,calc(100%-64px))]";

const button =
  "inline-flex min-h-[42px] items-center justify-center gap-2.5 rounded border border-transparent px-[15px] text-xs font-[550] transition-colors";

export const ui = {
  container,
  pageMain: `${container} min-h-[70vh] pt-12 pb-[65px] md:pt-[65px] md:pb-[90px]`,
  loading: "pt-2.5 text-xs text-muted",
  eyebrow:
    "font-mono text-[10px] leading-normal font-medium tracking-[0.055em] text-subtle uppercase",
  pageTitle:
    "text-[clamp(38px,5vw,54px)] leading-[1.12] font-[560] tracking-[-0.067em]",
  heroTitle:
    "text-[clamp(43px,11vw,58px)] leading-[1.06] font-[560] tracking-[-0.067em] md:text-[clamp(42px,5.7vw,68px)]",
  sectionTitle:
    "text-[clamp(26px,3vw,34px)] leading-[1.2] font-[540] tracking-[-0.055em]",
  blockTitle:
    "text-[21px] leading-[1.2] font-[550] tracking-[-0.045em] md:text-[23px]",
  introDescription: "max-w-[570px] text-sm leading-[1.8] text-muted",
  sectionCopy: "text-[13px] leading-[1.8] text-muted",
  section:
    "border-t border-border pt-[51px] pb-14 md:pt-[68px] md:pb-[73px]",
  sectionHeading:
    "mb-[22px] flex flex-col items-start gap-3 md:mb-[29px] md:flex-row md:items-end md:justify-between md:gap-8",
  button,
  buttonPrimary: `${button} bg-accent text-white hover:bg-blue-700`,
  buttonSecondary: `${button} border-border bg-white text-foreground hover:border-[#c8cdd5] hover:bg-[#fafbfc]`,
  textLink:
    "inline-flex items-center gap-1.5 text-xs font-medium text-accent underline decoration-[#c5d4f7] underline-offset-4 transition-colors hover:text-blue-700 hover:decoration-accent",
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
  card: "rounded-[3px] border border-border",
} as const;
