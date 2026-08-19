import { Plate, PreviewRoot } from "./kit";

/* Clearwater — plumbing & heating. Friendly, high-clarity, phone-number-forward. */

const white = "#ffffff";
const ink = "#12212b";
const blue = "#1668a8";
const wash = "#eef4f8";
const display = "var(--font-karla), sans-serif";
const sans = "var(--font-karla), system-ui, sans-serif";

const services = [
  ["Emergency repairs", "Burst pipes, leaks, no hot water."],
  ["Water heaters", "Repair, replace, tankless upgrades."],
  ["Drains & sewer", "Camera inspection and clearing."],
  ["Fixtures", "Taps, toilets, full bathroom fit-outs."],
];

export function Desktop() {
  return (
    <PreviewRoot bg={white} color={ink} font={sans}>
      <div
        className="flex items-center justify-between px-14"
        style={{ background: ink, color: white, fontSize: 12.5, padding: "10px 56px" }}
      >
        <span>Serving the tri-county area · Licensed &amp; insured</span>
        <span style={{ fontWeight: 600 }}>(555) 014-2200</span>
      </div>

      <header className="flex items-center justify-between px-14 py-6">
        <span
          style={{
            fontFamily: display,
            fontSize: 20,
            fontWeight: 700,
            letterSpacing: "-0.03em",
          }}
        >
          Clearwater
          <span style={{ color: blue }}> Plumbing</span>
        </span>
        <nav className="flex gap-9" style={{ fontSize: 14, color: "rgba(18,33,43,0.7)" }}>
          {["Services", "Areas", "Financing", "Reviews"].map((i) => (
            <span key={i}>{i}</span>
          ))}
        </nav>
        <span
          style={{
            background: blue,
            color: white,
            fontSize: 14,
            fontWeight: 600,
            padding: "13px 26px",
            borderRadius: 6,
          }}
        >
          Book online
        </span>
      </header>

      <div style={{ background: wash }}>
        <div className="grid grid-cols-[1.1fr_1fr] items-center gap-14 px-14 py-14">
          <div>
            <p
              style={{
                fontFamily: display,
                fontSize: 64,
                fontWeight: 700,
                lineHeight: 0.98,
                letterSpacing: "-0.04em",
              }}
            >
              Same-day plumbing,
              <br />
              done properly.
            </p>
            <p style={{ fontSize: 17, lineHeight: 1.65, marginTop: 20, maxWidth: 440, color: "rgba(18,33,43,0.7)" }}>
              Upfront pricing before we start. Clean workspaces. A technician who
              explains what they found.
            </p>
            <div className="mt-8 flex items-center gap-4">
              <span
                style={{
                  background: ink,
                  color: white,
                  fontSize: 15,
                  fontWeight: 600,
                  padding: "16px 30px",
                  borderRadius: 6,
                }}
              >
                Call (555) 014-2200
              </span>
              <span
                style={{
                  border: `1px solid rgba(18,33,43,0.25)`,
                  fontSize: 15,
                  padding: "16px 28px",
                  borderRadius: 6,
                }}
              >
                Request a quote
              </span>
            </div>
          </div>
          <Plate a="#6aa7cc" b="#12212b" c="#c6dcea" variant="arc" className="h-[300px]" style={{ borderRadius: 8 }} />
        </div>
      </div>

      <div className="grid grid-cols-4 gap-6 px-14 py-12">
        {services.map(([title, copy]) => (
          <div
            key={title}
            style={{ border: "1px solid rgba(18,33,43,0.12)", borderRadius: 8, padding: "22px 20px" }}
          >
            <span
              aria-hidden="true"
              style={{ display: "block", width: 26, height: 3, background: blue, marginBottom: 16 }}
            />
            <p style={{ fontFamily: display, fontSize: 17, fontWeight: 600, letterSpacing: "-0.02em" }}>
              {title}
            </p>
            <p style={{ fontSize: 13.5, lineHeight: 1.6, marginTop: 8, color: "rgba(18,33,43,0.62)" }}>
              {copy}
            </p>
          </div>
        ))}
      </div>
    </PreviewRoot>
  );
}

export function Mobile() {
  return (
    <PreviewRoot bg={white} color={ink} font={sans}>
      <div
        style={{ background: ink, color: white, fontSize: 10.5, padding: "8px 24px", textAlign: "center" }}
        className="pt-9"
      >
        Licensed &amp; insured · (555) 014-2200
      </div>

      <div className="flex items-center justify-between px-6 py-4">
        <span style={{ fontFamily: display, fontSize: 15, fontWeight: 700, letterSpacing: "-0.03em" }}>
          Clearwater<span style={{ color: blue }}> Plumbing</span>
        </span>
        <span aria-hidden="true" className="flex flex-col gap-[5px]">
          <span className="block h-px w-5" style={{ background: ink }} />
          <span className="block h-px w-5" style={{ background: ink }} />
        </span>
      </div>

      <div style={{ background: wash }} className="px-6 py-8">
        <p
          style={{
            fontFamily: display,
            fontSize: 38,
            fontWeight: 700,
            lineHeight: 1,
            letterSpacing: "-0.04em",
          }}
        >
          Same-day plumbing, done properly.
        </p>
        <p style={{ fontSize: 13.5, lineHeight: 1.6, marginTop: 12, color: "rgba(18,33,43,0.7)" }}>
          Upfront pricing before we start.
        </p>
        <div
          style={{
            background: ink,
            color: white,
            fontSize: 13,
            fontWeight: 600,
            padding: "14px 22px",
            borderRadius: 6,
            marginTop: 18,
            textAlign: "center",
          }}
        >
          Call (555) 014-2200
        </div>
      </div>

      <Plate a="#6aa7cc" b="#12212b" c="#c6dcea" variant="arc" className="h-[180px] w-full" />

      <div className="px-6 pt-6">
        {services.slice(0, 2).map(([title, copy]) => (
          <div
            key={title}
            style={{
              border: "1px solid rgba(18,33,43,0.12)",
              borderRadius: 8,
              padding: "16px 16px",
              marginBottom: 12,
            }}
          >
            <span
              aria-hidden="true"
              style={{ display: "block", width: 22, height: 3, background: blue, marginBottom: 12 }}
            />
            <p style={{ fontFamily: display, fontSize: 15, fontWeight: 600 }}>{title}</p>
            <p style={{ fontSize: 12.5, marginTop: 5, color: "rgba(18,33,43,0.62)" }}>{copy}</p>
          </div>
        ))}
      </div>
    </PreviewRoot>
  );
}
