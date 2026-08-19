"use client";

import { useInView } from "@/components/ui/useInView";
import { cn } from "@/lib/utils";

/**
 * One diagram per service.
 *
 * Each is drawn rather than illustrated: hairlines, blocks, and monospace
 * labels on the same grid the rest of the site uses. They are technical
 * diagrams of what the service actually does, not icons standing in for it —
 * so the wireframe really does resolve into an interface, and the pipeline
 * really does run left to right in the order the work happens.
 *
 * Everything animates on transform, opacity, or width, once, on entry.
 * Decorative throughout: the surrounding copy carries the meaning.
 */

const EASE = "cubic-bezier(0.16,1,0.3,1)";

function Panel({
  children,
  caption,
  className,
}: {
  children: React.ReactNode;
  caption: string;
  className?: string;
}) {
  return (
    <figure className={cn("w-full", className)}>
      <div className="relative aspect-16/11 overflow-hidden rounded-lg border border-line bg-card">
        {children}
      </div>
      <figcaption className="label-mono-sm mt-3 text-dim">{caption}</figcaption>
    </figure>
  );
}

/** DS — a wireframe resolving into a finished interface. */
function DesignVisual({ on }: { on: boolean }) {
  const blocks = [
    { x: 8, y: 10, w: 84, h: 9 },
    { x: 8, y: 25, w: 46, h: 30 },
    { x: 58, y: 25, w: 34, h: 30 },
    { x: 8, y: 61, w: 26, h: 28 },
    { x: 38, y: 61, w: 26, h: 28 },
    { x: 68, y: 61, w: 24, h: 28 },
  ];

  return (
    <Panel caption="Wireframe → finished interface">
      <div className="absolute inset-0">
        {blocks.map((b, i) => (
          <div
            key={i}
            className={cn(
              "absolute rounded-[2px] border transition-all duration-[900ms]",
              on
                ? "border-transparent bg-chalk/85"
                : "border-dashed border-accent/50 bg-transparent",
            )}
            style={{
              left: `${b.x}%`,
              top: `${b.y}%`,
              width: `${b.w}%`,
              height: `${b.h}%`,
              transitionDelay: `${i * 110}ms`,
              transitionTimingFunction: EASE,
            }}
          />
        ))}
      </div>
    </Panel>
  );
}

/** MB — the same interface at two widths, drawn side by side. */
function MobileVisual({ on }: { on: boolean }) {
  return (
    <Panel caption="One design, two widths">
      <div className="absolute inset-0 flex items-center justify-center gap-5 px-6">
        <div
          className="h-[62%] w-[58%] rounded-[4px] border border-line-hard bg-void p-2 transition-all duration-[800ms]"
          style={{
            transitionTimingFunction: EASE,
            opacity: on ? 1 : 0,
            transform: on ? "none" : "translateX(-10px)",
          }}
        >
          <span className="block h-1.5 w-1/3 rounded-full bg-white/20" />
          <span className="mt-2 block h-[38%] w-full rounded-[2px] bg-white/10" />
          <span className="mt-1.5 flex gap-1.5">
            {[0, 1, 2].map((i) => (
              <span key={i} className="block h-4 flex-1 rounded-[2px] bg-white/8" />
            ))}
          </span>
        </div>

        <span
          aria-hidden="true"
          className="label-mono-sm shrink-0 text-accent-lift transition-opacity duration-700"
          style={{ opacity: on ? 1 : 0, transitionDelay: "300ms" }}
        >
          →
        </span>

        <div
          className="h-[76%] w-[19%] rounded-[7px] border border-accent/50 bg-void p-1.5 transition-all duration-[900ms]"
          style={{
            transitionTimingFunction: EASE,
            transitionDelay: "220ms",
            opacity: on ? 1 : 0,
            transform: on ? "none" : "scale(0.86) translateX(14px)",
          }}
        >
          <span className="block h-1 w-2/3 rounded-full bg-white/20" />
          <span className="mt-1.5 block h-[34%] w-full rounded-[2px] bg-white/10" />
          <span className="mt-1 block h-[14%] w-full rounded-[2px] bg-white/8" />
          <span className="mt-1 block h-[14%] w-full rounded-[2px] bg-white/8" />
        </div>
      </div>
    </Panel>
  );
}

/** CV — the path a visitor takes, ending on the action. */
function ConversionVisual({ on }: { on: boolean }) {
  const nodes = ["Landing", "Trust", "Action"];

  return (
    <Panel caption="Landing → trust → action">
      <div className="absolute inset-0 flex items-center px-6">
        <div className="relative w-full">
          <span aria-hidden="true" className="absolute left-0 right-0 top-[7px] h-px bg-line" />
          <span
            aria-hidden="true"
            className="absolute left-0 top-[7px] h-px origin-left bg-accent transition-transform duration-[1100ms]"
            style={{
              width: "100%",
              transform: on ? "scaleX(1)" : "scaleX(0)",
              transitionTimingFunction: EASE,
            }}
          />
          <ul className="relative flex justify-between">
            {nodes.map((node, i) => (
              <li key={node} className="flex flex-col items-center gap-3">
                <span
                  className={cn(
                    "block h-[15px] w-[15px] rounded-full border-2 transition-colors duration-500",
                    on && i === nodes.length - 1
                      ? "border-accent bg-accent"
                      : on
                        ? "border-accent bg-card"
                        : "border-line-hard bg-card",
                  )}
                  style={{ transitionDelay: `${300 + i * 300}ms` }}
                />
                <span
                  className={cn(
                    "label-mono-sm transition-colors duration-500",
                    on && i === nodes.length - 1 ? "text-accent-lift" : "text-dim",
                  )}
                  style={{ transitionDelay: `${300 + i * 300}ms` }}
                >
                  {node}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Panel>
  );
}

/** SE — the structure a crawler reads. */
function SeoVisual({ on }: { on: boolean }) {
  const leaves = ["Services", "Work", "Contact"];

  return (
    <Panel caption="Structure a crawler can read">
      <svg
        viewBox="0 0 200 130"
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
        fill="none"
      >
        <g stroke="currentColor" className="text-line-hard" strokeWidth="1">
          <path
            d="M100 44 V62 M40 62 H160 M40 62 V78 M100 62 V78 M160 62 V78"
            className="transition-[stroke-dashoffset] duration-[1200ms]"
            style={{
              stroke: "rgb(108 99 255 / 0.7)",
              strokeDasharray: 260,
              strokeDashoffset: on ? 0 : 260,
              transitionTimingFunction: EASE,
            }}
          />
        </g>
        <rect
          x="74"
          y="26"
          width="52"
          height="18"
          rx="2"
          className="fill-void stroke-line-hard"
          strokeWidth="1"
          style={{
            opacity: on ? 1 : 0,
            transition: `opacity 600ms ${EASE}`,
          }}
        />
        <text
          x="100"
          y="38"
          textAnchor="middle"
          className="fill-chalk font-mono"
          style={{ fontSize: 7, letterSpacing: 1, opacity: on ? 1 : 0, transition: `opacity 600ms ${EASE} 120ms` }}
        >
          HOME
        </text>
        {leaves.map((leaf, i) => (
          <g key={leaf}>
            <rect
              x={14 + i * 60}
              y="78"
              width="52"
              height="18"
              rx="2"
              className="fill-void stroke-line-hard"
              strokeWidth="1"
              style={{
                opacity: on ? 1 : 0,
                transition: `opacity 600ms ${EASE} ${400 + i * 150}ms`,
              }}
            />
            <text
              x={40 + i * 60}
              y="90"
              textAnchor="middle"
              className="fill-slate font-mono"
              style={{
                fontSize: 6.5,
                letterSpacing: 0.8,
                opacity: on ? 1 : 0,
                transition: `opacity 600ms ${EASE} ${480 + i * 150}ms`,
              }}
            >
              {leaf.toUpperCase()}
            </text>
          </g>
        ))}
      </svg>
    </Panel>
  );
}

/** LN — the pipeline, run once, left to right. */
function LaunchVisual({ on }: { on: boolean }) {
  const stages = ["Design", "Build", "Deploy", "Live"];

  return (
    <Panel caption="Design → build → deploy → live">
      <div className="absolute inset-0 flex flex-col justify-center gap-4 px-6">
        {stages.map((stage, i) => (
          <div key={stage} className="flex items-center gap-4">
            <span
              className={cn(
                "label-mono-sm w-14 shrink-0 transition-colors duration-500",
                on && i === stages.length - 1 ? "text-accent-lift" : "text-dim",
              )}
              style={{ transitionDelay: `${i * 220}ms` }}
            >
              {stage}
            </span>
            <span className="relative h-[3px] flex-1 overflow-hidden rounded-full bg-white/6">
              <span
                className="absolute inset-y-0 left-0 origin-left rounded-full transition-transform duration-[900ms]"
                style={{
                  width: "100%",
                  backgroundColor:
                    i === stages.length - 1 ? "var(--color-accent)" : "rgb(255 255 255 / 0.25)",
                  transform: on ? "scaleX(1)" : "scaleX(0)",
                  transitionDelay: `${i * 220}ms`,
                  transitionTimingFunction: EASE,
                }}
              />
            </span>
          </div>
        ))}
      </div>
    </Panel>
  );
}

/** UP — the same site, revised, with the newest revision current. */
function UpdatesVisual({ on }: { on: boolean }) {
  const revisions = ["Launch", "Revision", "Current"];

  return (
    <Panel caption="The same site, kept current">
      <div className="absolute inset-0 flex items-center justify-center px-6">
        <div className="relative h-[70%] w-full">
          {revisions.map((revision, i) => {
            const current = i === revisions.length - 1;
            return (
              <div
                key={revision}
                className={cn(
                  "absolute rounded-[4px] border bg-void transition-all duration-[900ms]",
                  current ? "border-accent/60" : "border-line",
                )}
                style={{
                  left: `${i * 13}%`,
                  top: `${i * 9}%`,
                  width: "62%",
                  height: "74%",
                  transitionDelay: `${i * 180}ms`,
                  transitionTimingFunction: EASE,
                  opacity: on ? (current ? 1 : 0.45) : 0,
                  transform: on ? "none" : "translateY(10px)",
                }}
              >
                <span className="absolute left-2.5 top-2 block h-1 w-1/4 rounded-full bg-white/25" />
                <span className="absolute left-2.5 right-2.5 top-5 block h-[42%] rounded-[2px] bg-white/8" />
                <span
                  className={cn(
                    "label-mono-sm absolute bottom-2 left-2.5",
                    current ? "text-accent-lift" : "text-dim",
                  )}
                >
                  {revision}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </Panel>
  );
}

const visuals: Record<string, (props: { on: boolean }) => React.ReactElement> = {
  design: DesignVisual,
  mobile: MobileVisual,
  conversion: ConversionVisual,
  seo: SeoVisual,
  launch: LaunchVisual,
  updates: UpdatesVisual,
};

export default function ServiceVisual({ id }: { id: string }) {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.35 });
  const Visual = visuals[id];

  if (!Visual) return null;

  return (
    <div ref={ref} aria-hidden="true">
      <Visual on={inView} />
    </div>
  );
}
