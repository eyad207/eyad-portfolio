import "server-only";

import Image from "next/image";
import { existsSync } from "node:fs";
import path from "node:path";

const photoPath = path.join(process.cwd(), "public", "images", "profile.jpg");

export function ProfilePhoto() {
  if (existsSync(photoPath)) {
    return (
      <div className="profile-photo">
        <Image
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
      className="profile-photo profile-photo-placeholder"
      role="img"
      aria-label="Profile photo placeholder. Add your portrait at public/images/profile.jpg."
    >
      <span className="profile-initials" aria-hidden="true">EL</span>
      <span className="profile-photo-note">Add portrait<br />at public/images/profile.jpg</span>
    </div>
  );
}
