import { Plate, PreviewRoot } from "./kit";

/* Ironwood — commercial construction. Structural grid, mono data, steel palette. */

const graphite = "#101211";
const steel = "#c9ccd1";
const amber = "#e0a324";
const display = "var(--font-karla), sans-serif";
const sans = "var(--font-karla), system-ui, sans-serif";
const mono = "var(--font-azeret), ui-monospace, monospace";

export function Desktop() {
  return (
    <PreviewRoot bg={graphite} color={steel} font={sans}>
      <header
        className="flex items-center justify-between px-14 py-6"
        style={{ borderBottom: "1px solid rgba(201,204,209,0.16)" }}
      >
        <span
          style={{
            fontFamily: display,
            fontSize: 18,
            fontWeight: 700,
            letterSpacing: "0.04em",
            textTransform: "uppercase",
            color: "#fff",
          }}
        >
          Ironwood
        </span>
        <nav
          className="flex gap-10"
          style={{ fontFamily: mono, fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", opacity: 0.7 }}
        >
          {["Sectors", "Projects", "Safety", "Careers"].map((i) => (
            <span key={i}>{i}</span>
          ))}
        </nav>
        <span
          style={{
            background: amber,
            color: graphite,
            fontFamily: mono,
            fontSize: 11,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            padding: "12px 22px",
          }}
        >
          Request a bid
        </span>
      </header>

      <div className="grid grid-cols-[1.15fr_1fr]">
        <div className="px-14 py-16">
          <span
            style={{
              fontFamily: mono,
              fontSize: 11,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: amber,
            }}
          >
            Commercial · Industrial · Institutional
          </span>
          <p
            style={{
              fontFamily: display,
              fontSize: 82,
              fontWeight: 700,
              lineHeight: 0.92,
              letterSpacing: "-0.04em",
              textTransform: "uppercase",
              color: "#fff",
              marginTop: 26,
            }}
          >
            Built to
            <br />
            spec. Built
            <br />
            to last.
          </p>
          <p style={{ fontSize: 16, lineHeight: 1.65, marginTop: 24, maxWidth: 420, opacity: 0.62 }}>
            General contracting and design-build delivery for owners who need a
            schedule they can plan around.
          </p>

          <div className="mt-12 grid grid-cols-3" style={{ borderTop: "1px solid rgba(201,204,209,0.16)" }}>
            {[
              ["01", "Preconstruction"],
              ["02", "Design-Build"],
              ["03", "Self-Perform"],
            ].map(([n, label]) => (
              <div key={n} style={{ paddingTop: 16, paddingRight: 20 }}>
                <span style={{ fontFamily: mono, fontSize: 11, color: amber }}>{n}</span>
                <p style={{ fontFamily: display, fontSize: 16, fontWeight: 600, marginTop: 8, color: "#fff" }}>
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>

        <Plate a="#3c4147" b="#0c0e0d" c="#7b828a" variant="ridge" className="h-full min-h-[560px]">
          <div className="absolute bottom-9 left-9 right-9">
            <div
              style={{
                background: "rgba(16,18,17,0.82)",
                padding: "20px 24px",
                fontFamily: mono,
                fontSize: 11,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: steel,
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <span>Harbor Point Logistics</span>
              <span style={{ color: amber }}>410,000 SF</span>
            </div>
          </div>
        </Plate>
      </div>

      <div
        className="flex items-center justify-between px-14 py-7"
        style={{ borderTop: "1px solid rgba(201,204,209,0.16)", fontFamily: mono, fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", opacity: 0.6 }}
      >
        <span>Licensed &amp; bonded</span>
        <span>Design-build</span>
        <span>Self-perform concrete</span>
        <span>Safety-first culture</span>
      </div>
    </PreviewRoot>
  );
}

export function Mobile() {
  return (
    <PreviewRoot bg={graphite} color={steel} font={sans}>
      <div
        className="flex items-center justify-between px-6 pb-4 pt-11"
        style={{ borderBottom: "1px solid rgba(201,204,209,0.16)" }}
      >
        <span
          style={{
            fontFamily: display,
            fontSize: 14,
            fontWeight: 700,
            letterSpacing: "0.05em",
            textTransform: "uppercase",
            color: "#fff",
          }}
        >
          Ironwood
        </span>
        <span aria-hidden="true" className="flex flex-col gap-[5px]">
          <span className="block h-px w-5" style={{ background: steel }} />
          <span className="block h-px w-5" style={{ background: steel }} />
        </span>
      </div>

      <div className="px-6 pt-9">
        <span
          style={{
            fontFamily: mono,
            fontSize: 9,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: amber,
          }}
        >
          Commercial · Industrial
        </span>
        <p
          style={{
            fontFamily: display,
            fontSize: 46,
            fontWeight: 700,
            lineHeight: 0.92,
            letterSpacing: "-0.04em",
            textTransform: "uppercase",
            color: "#fff",
            marginTop: 14,
          }}
        >
          Built to spec. Built to last.
        </p>
        <span
          className="mt-7 inline-block"
          style={{
            background: amber,
            color: graphite,
            fontFamily: mono,
            fontSize: 10,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            padding: "13px 24px",
          }}
        >
          Request a bid
        </span>
      </div>

      <Plate a="#3c4147" b="#0c0e0d" c="#7b828a" variant="ridge" className="mt-8 h-[250px] w-full" />

      <div className="grid grid-cols-2 px-6 pt-7" style={{ gap: 14 }}>
        {[
          ["01", "Preconstruction"],
          ["02", "Design-Build"],
        ].map(([n, label]) => (
          <div key={n} style={{ borderTop: "1px solid rgba(201,204,209,0.16)", paddingTop: 12 }}>
            <span style={{ fontFamily: mono, fontSize: 10, color: amber }}>{n}</span>
            <p style={{ fontFamily: display, fontSize: 14, fontWeight: 600, marginTop: 6, color: "#fff" }}>
              {label}
            </p>
          </div>
        ))}
      </div>
    </PreviewRoot>
  );
}
