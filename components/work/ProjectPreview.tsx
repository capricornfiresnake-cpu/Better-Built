import Image from "next/image";

import { ScaledPreview } from "@/components/mockups/Frames";
import { previews, PREVIEW_DESKTOP, PREVIEW_MOBILE } from "@/components/previews/registry";
import { previewLabel, type Project } from "@/data/projects";
import { cn } from "@/lib/utils";

type Device = "desktop" | "mobile";

/**
 * Renders a project's cover.
 *
 * Client work uses a real screenshot of the live site (captured by
 * `npm run capture:covers`). Concept work has no live site to photograph, so it
 * renders its miniature website in code instead. Both land on the same aspect
 * ratio, so the two kinds sit side by side in a grid without drifting.
 */
export default function ProjectPreview({
  project,
  device = "desktop",
  priority = false,
  sizes,
  className,
}: {
  project: Project;
  device?: Device;
  /** Set on the first cover above the fold so it is not lazy-loaded. */
  priority?: boolean;
  sizes?: string;
  className?: string;
}) {
  const { width, height } = device === "desktop" ? PREVIEW_DESKTOP : PREVIEW_MOBILE;
  const label = previewLabel(project, device);
  const cover = project.cover?.[device];

  if (cover) {
    return (
      <div
        className={cn("relative overflow-hidden bg-fog-200", className)}
        style={{ aspectRatio: `${width} / ${height}` }}
      >
        <Image
          src={cover}
          alt={label}
          fill
          sizes={sizes ?? "100vw"}
          priority={priority}
          quality={90}
          className="object-cover object-top"
        />
      </div>
    );
  }

  const Rendered =
    previews[project.slug]?.[device === "desktop" ? "Desktop" : "Mobile"];

  return (
    <ScaledPreview
      designWidth={width}
      designHeight={height}
      label={label}
      className={className}
    >
      {Rendered ? <Rendered /> : null}
    </ScaledPreview>
  );
}
