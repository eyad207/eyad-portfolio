import "server-only";

import Image from "next/image";
import { existsSync } from "node:fs";
import path from "node:path";

const photoPath = path.join(process.cwd(), "public", "images", "profile.jpg");
const frame =
  "aspect-[0.95] w-full overflow-hidden rounded-xl border border-border bg-surface shadow-sm md:aspect-[0.85]";
const image = "size-full object-cover";

export function ProfilePhoto({ className = "" }: { className?: string }) {
  if (existsSync(photoPath)) {
    return (
      <div className={`${frame} ${className}`}>
        <Image
          className={image}
          src="/images/profile.jpg"
          alt="Eyad Lazkani"
          width={480}
          height={560}
          priority
        />
      </div>
    );
  }

  return (
    <div
      className={`${frame} flex flex-col items-center justify-center gap-3.5 text-[#545c67] ${className}`}
      role="img"
      aria-label="Profile photo placeholder. Add your portrait at public/images/profile.jpg."
    >
      <Image
        className={image}
        src="https://res.cloudinary.com/ik4jziqc/image/upload/v1791406857/1755542449775.jpg"
        alt="Profile photo placeholder"
        width={480}
        height={560}
        priority
      />
    </div>
  );
}
