import type { Project } from "@/data/projects";
import { cn } from "@/lib/utils";

/**
 * Honest labelling. Client work is marked as client work and concept work is
 * marked as a concept — on every card, every showcase, and every project page.
 * The tag is never omitted and never softened.
 */
export default function StatusTag({
  project,
  className,
}: {
  project: Project;
  className?: string;
}) {
  const isConcept = project.status === "concept";

  return (
    <span
      className={cn(
        "label-mono-sm inline-flex items-center gap-2 whitespace-nowrap",
        isConcept ? "text-dim" : "text-accent-lift",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn("block h-1.5 w-1.5", isConcept ? "bg-dim" : "bg-accent")}
      />
      {isConcept ? "Concept" : "Client"}
    </span>
  );
}
