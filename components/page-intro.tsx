import { ui } from "@/lib/ui";

type PageIntroProps = {
  eyebrow: string;
  title: string;
  description?: string;
  className?: string;
};

export function PageIntro({
  eyebrow,
  title,
  description,
  className = "mb-[29px] md:mb-10",
}: PageIntroProps) {
  return (
    <div className={`max-w-[680px] ${className}`}>
      <p className={`${ui.eyebrow} mb-3.5`}>{eyebrow}</p>
      <h1 className={ui.pageTitle}>{title}</h1>
      {description && (
        <p className={`${ui.introDescription} mt-[13px]`}>{description}</p>
      )}
    </div>
  );
}
