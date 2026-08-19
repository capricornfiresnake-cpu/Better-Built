"use client";

import type { CSSProperties, ReactNode } from "react";
import { AT, DONE } from "./useBuildPhases";
import { cn } from "@/lib/utils";

/**
 * THE SIGNATURE
 * =============
 *
 * A website being built, inside the browser frame that will hold the finished
 * one: the drafting grid rules itself, the components arrive as labelled
 * outlines, the outlines take on type and colour, a pointer tests the primary
 * action, the layout reports itself responsive, and the whole wireframe then
 * dissolves into a real client site.
 *
 * It is the studio's one claim — we don't decorate websites, we build them —
 * expressed as the thing itself. The payoff is always real client work, never
 * a rendering.
 *
 * Every element is positioned in percentages of the frame, so the scene scales
 * with its container and needs no breakpoint of its own. Only `opacity` and
 * `transform` animate.
 */

const EASE = "cubic-bezier(0.16,1,0.3,1)";

/** Fades and lifts an element in at a given phase. */
function at(phase: number, from: number, delay = 0): CSSProperties {
  const on = phase >= from;
  return {
    opacity: on ? 1 : 0,
    transform: on ? "none" : "translateY(6px)",
    transition: `opacity 520ms ${EASE} ${delay}ms, transform 520ms ${EASE} ${delay}ms`,
  };
}

/** A run of type inside a block: a bar that grows to its width. */
function Line({
  phase,
  w,
  delay = 0,
  tone = "chalk",
  h = 6,
}: {
  phase: number;
  w: number;
  delay?: number;
  tone?: "chalk" | "mute";
  h?: number;
}) {
  const on = phase >= AT.design;
  return (
    <span
      className={cn(
        "block origin-left rounded-full",
        tone === "chalk" ? "bg-white/80" : "bg-white/25",
      )}
      style={{
        width: `${w}%`,
        height: h,
        transform: on ? "scaleX(1)" : "scaleX(0)",
        opacity: on ? 1 : 0,
        transition: `transform 620ms ${EASE} ${delay}ms, opacity 300ms linear ${delay}ms`,
      }}
    />
  );
}

/**
 * A component of the page under construction: an outline during BUILD, a
 * surface from DESIGN onward, with its name shown only while it is still a
 * drawing.
 */
function Block({
  phase,
  label,
  x,
  y,
  w,
  h,
  delay = 0,
  children,
}: {
  phase: number;
  label: string;
  x: number;
  y: number;
  w: number;
  h: number;
  delay?: number;
  children?: ReactNode;
}) {
  const drawn = phase >= AT.build;
  const built = phase >= AT.design;

  return (
    <div
      className="absolute"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        width: `${w}%`,
        height: `${h}%`,
        opacity: drawn ? 1 : 0,
        transform: drawn ? "none" : "scale(0.985)",
        transition: `opacity 460ms ${EASE} ${delay}ms, transform 460ms ${EASE} ${delay}ms`,
      }}
    >
      <div
        className="absolute inset-0 rounded-[3px] border"
        style={{
          borderColor: built ? "rgb(255 255 255 / 0.09)" : "rgb(108 99 255 / 0.5)",
          borderStyle: built ? "solid" : "dashed",
          background: built ? "rgb(255 255 255 / 0.045)" : "rgb(108 99 255 / 0.05)",
          transition: `border-color 620ms ${EASE}, background 620ms ${EASE}, border-style 0ms linear 300ms`,
        }}
      />

      {/* The component's name, while it is still a drawing. */}
      <span
        className="absolute left-1.5 top-1 font-mono text-[7px] uppercase leading-none tracking-[0.18em] text-accent-lift sm:text-[8px]"
        style={{
          opacity: drawn && !built ? 1 : 0,
          transition: `opacity 380ms ${EASE} ${delay}ms`,
        }}
      >
        {label}
      </span>

      {children ? <div className="absolute inset-0">{children}</div> : null}
    </div>
  );
}

export default function BuildSequence({
  phase,
  children,
  className,
}: {
  /** -1 before start, 0–4 running, 5 finished. */
  phase: number;
  /** The finished website. Revealed at LAUNCH. */
  children: ReactNode;
  className?: string;
}) {
  const launched = phase >= AT.launch;
  const finished = phase >= DONE;

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {/* The finished website. */}
      <div
        style={{
          opacity: launched ? 1 : 0,
          transition: `opacity 640ms ${EASE}`,
        }}
      >
        {children}
      </div>

      {/* The construction. Removed from the DOM once it is done. */}
      {finished ? null : (
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-void"
          style={{
            opacity: launched ? 0 : 1,
            transition: `opacity 560ms ${EASE}`,
          }}
        >
          {/* Drafting grid */}
          <div className="absolute inset-0">
            {[20, 40, 60, 80].map((pct, i) => (
              <span
                key={`h${pct}`}
                className="absolute inset-x-0 h-px origin-left bg-accent/22"
                style={{
                  top: `${pct}%`,
                  transform: phase >= AT.build ? "scaleX(1)" : "scaleX(0)",
                  opacity: phase >= AT.design ? 0.35 : 1,
                  transition: `transform 560ms ${EASE} ${i * 55}ms, opacity 620ms ${EASE}`,
                }}
              />
            ))}
            {[25, 50, 75].map((pct, i) => (
              <span
                key={`v${pct}`}
                className="absolute inset-y-0 w-px origin-top bg-accent/22"
                style={{
                  left: `${pct}%`,
                  transform: phase >= AT.build ? "scaleY(1)" : "scaleY(0)",
                  opacity: phase >= AT.design ? 0.35 : 1,
                  transition: `transform 560ms ${EASE} ${90 + i * 55}ms, opacity 620ms ${EASE}`,
                }}
              />
            ))}
          </div>

          {/* Navigation */}
          <Block phase={phase} label="Nav" x={4} y={5} w={92} h={8}>
            <div className="flex h-full items-center gap-2 px-2.5">
              <span
                className="block h-2 w-2 rounded-[1px] bg-accent"
                style={at(phase, AT.design)}
              />
              <span className="ml-auto flex items-center gap-2.5">
                {[9, 7, 8, 6].map((w, i) => (
                  <span
                    key={i}
                    className="block h-[3px] rounded-full bg-white/40"
                    style={{ width: w * 2, ...at(phase, AT.design, 60 + i * 45) }}
                  />
                ))}
                <span
                  className="block h-3.5 w-10 rounded-[2px] bg-white/85"
                  style={at(phase, AT.design, 260)}
                />
              </span>
            </div>
          </Block>

          {/* Hero */}
          <Block phase={phase} label="Hero" x={4} y={17} w={52} h={36} delay={70}>
            <div className="flex h-full flex-col justify-center gap-2 px-3">
              <Line phase={phase} w={82} h={9} delay={80} />
              <Line phase={phase} w={64} h={9} delay={140} />
              <span className="block h-1" />
              <Line phase={phase} w={54} h={4} delay={220} tone="mute" />
              <Line phase={phase} w={44} h={4} delay={260} tone="mute" />
              <span className="mt-2 flex gap-2">
                <span
                  id="bb-primary-action"
                  className="block h-4 w-16 rounded-[2px] bg-white/90"
                  style={at(phase, AT.design, 340)}
                />
                <span
                  className="block h-4 w-12 rounded-[2px] border border-white/25"
                  style={at(phase, AT.design, 390)}
                />
              </span>
            </div>
          </Block>

          {/* Media */}
          <Block phase={phase} label="Media" x={59} y={17} w={37} h={36} delay={140}>
            <div
              className="absolute inset-[6%] rounded-[2px]"
              style={{
                background:
                  "linear-gradient(150deg, rgb(108 99 255 / 0.35), rgb(255 255 255 / 0.08))",
                ...at(phase, AT.design, 200),
              }}
            />
          </Block>

          {/* Cards */}
          {[4, 36, 68].map((x, i) => (
            <Block
              key={x}
              phase={phase}
              label="Card"
              x={x}
              y={58}
              w={28}
              h={30}
              delay={210 + i * 70}
            >
              <div className="flex h-full flex-col justify-end gap-1.5 p-2.5">
                <Line phase={phase} w={70} h={5} delay={300 + i * 60} />
                <Line phase={phase} w={90} h={3} delay={340 + i * 60} tone="mute" />
                <Line phase={phase} w={78} h={3} delay={370 + i * 60} tone="mute" />
              </div>
            </Block>
          ))}

          {/* The pointer tests the primary action. */}
          <span
            className="absolute z-[3]"
            style={{
              left: phase >= AT.motion ? "17%" : "46%",
              top: phase >= AT.motion ? "45%" : "70%",
              opacity: phase >= AT.motion && phase < AT.launch ? 1 : 0,
              transition: `left 760ms ${EASE}, top 760ms ${EASE}, opacity 380ms linear`,
            }}
          >
            <svg viewBox="0 0 12 14" className="h-3.5 w-3 drop-shadow-sm" aria-hidden="true">
              <path
                d="M1 1l9.2 6.6-4 .5-1.1 4.2z"
                fill="#F2F0EA"
                stroke="#08090B"
                strokeWidth="0.9"
                strokeLinejoin="round"
              />
            </svg>
            <span
              className="absolute -left-2 -top-2 block h-7 w-7 rounded-full border border-accent"
              style={{
                opacity: phase === AT.optimize ? 0 : phase >= AT.motion ? 0.7 : 0,
                transform: phase >= AT.optimize ? "scale(1.9)" : "scale(0.4)",
                transition: `transform 620ms ${EASE}, opacity 620ms ${EASE}`,
              }}
            />
          </span>

          {/* Responsive confirmation, at OPTIMIZE. */}
          <div
            className="absolute bottom-[3%] left-4 flex items-center gap-2.5"
            style={at(phase, AT.optimize)}
          >
            {["sm", "md", "lg"].map((size, i) => (
              <span
                key={size}
                className="flex items-center gap-1 font-mono text-[7px] uppercase tracking-[0.16em] text-accent-lift sm:text-[8px]"
                style={at(phase, AT.optimize, i * 110)}
              >
                <svg viewBox="0 0 10 10" className="h-2 w-2" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <path d="M1 5.4l2.6 2.6L9 2.2" strokeLinecap="square" />
                </svg>
                {size}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
