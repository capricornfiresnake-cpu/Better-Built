import { Plate, PreviewRoot } from "./kit";

/* Sable & Oak — chophouse. Candlelit, serif-led, centred and ceremonial. */

const ink = "#14120f";
const cream = "#f3ece0";
const gold = "#c08a3e";
const serif = "var(--font-newsreader), Georgia, serif";
const sans = "var(--font-karla), system-ui, sans-serif";

const nav = ["Menus", "Private Dining", "The Cellar", "Our Story"];

export function Desktop() {
  return (
    <PreviewRoot bg={ink} color={cream} font={serif}>
      <header
        className="flex items-center justify-between px-16 py-8"
        style={{ fontFamily: sans }}
      >
        <span
          style={{
            fontFamily: serif,
            fontSize: 22,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
          }}
        >
          Sable &amp; Oak
        </span>
        <nav
          className="flex gap-11"
          style={{ fontSize: 12.5, letterSpacing: "0.16em", textTransform: "uppercase", opacity: 0.72 }}
        >
          {nav.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </nav>
        <span
          style={{
            border: `1px solid ${gold}`,
            color: gold,
            fontSize: 12,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            padding: "11px 24px",
          }}
        >
          Reserve
        </span>
      </header>

      <div className="relative px-16">
        <Plate
          a="#3a2a17"
          b="#171410"
          c="#6b4a1f"
          variant="arc"
          className="h-[520px] w-full"
        >
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span
              style={{
                fontFamily: sans,
                fontSize: 12,
                letterSpacing: "0.34em",
                textTransform: "uppercase",
                color: gold,
              }}
            >
              Est. Downtown · Dinner Nightly
            </span>
            <p
              style={{
                fontFamily: serif,
                fontSize: 96,
                lineHeight: 0.98,
                letterSpacing: "-0.02em",
                marginTop: 26,
                color: cream,
              }}
            >
              Fire, salt,
              <br />
              and patience.
            </p>
            <p
              style={{
                fontFamily: sans,
                fontSize: 16.5,
                lineHeight: 1.6,
                maxWidth: 460,
                marginTop: 26,
                color: "rgba(243,236,224,0.72)",
              }}
            >
              A wood-fired chophouse serving dry-aged cuts, coastal seafood, and a
              cellar built over a decade.
            </p>
            <span
              style={{
                fontFamily: sans,
                background: gold,
                color: ink,
                fontSize: 12.5,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                padding: "15px 34px",
                marginTop: 34,
              }}
            >
              Book a Table
            </span>
          </div>
        </Plate>
      </div>

      <div className="grid grid-cols-3 gap-14 px-16 pt-16">
        {[
          ["The Grill", "Dry-aged 45 days over white oak."],
          ["The Cellar", "Four hundred labels, one long table."],
          ["The Room", "Forty seats, low light, no rush."],
        ].map(([title, copy]) => (
          <div key={title}>
            <span
              aria-hidden="true"
              className="mb-6 block h-px w-14"
              style={{ background: gold }}
            />
            <p style={{ fontFamily: serif, fontSize: 30, lineHeight: 1.1, letterSpacing: "-0.01em" }}>
              {title}
            </p>
            <p
              style={{
                fontFamily: sans,
                fontSize: 15,
                lineHeight: 1.65,
                marginTop: 12,
                color: "rgba(243,236,224,0.6)",
              }}
            >
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
    <PreviewRoot bg={ink} color={cream} font={serif}>
      <div
        className="flex items-center justify-between px-6 pb-4 pt-11"
        style={{ fontFamily: sans }}
      >
        <span
          style={{
            fontFamily: serif,
            fontSize: 14,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
          }}
        >
          Sable &amp; Oak
        </span>
        <span aria-hidden="true" className="flex flex-col gap-[5px]">
          <span className="block h-px w-5" style={{ background: cream }} />
          <span className="block h-px w-5" style={{ background: cream }} />
        </span>
      </div>

      <Plate a="#3a2a17" b="#171410" c="#6b4a1f" variant="arc" className="h-[420px] w-full">
        <div className="absolute inset-0 flex flex-col items-center justify-center px-7 text-center">
          <span
            style={{
              fontFamily: sans,
              fontSize: 9.5,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: gold,
            }}
          >
            Dinner Nightly
          </span>
          <p
            style={{
              fontFamily: serif,
              fontSize: 44,
              lineHeight: 1,
              marginTop: 14,
              color: cream,
            }}
          >
            Fire, salt,
            <br />
            and patience.
          </p>
          <span
            style={{
              fontFamily: sans,
              background: gold,
              color: ink,
              fontSize: 10.5,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              padding: "13px 28px",
              marginTop: 26,
            }}
          >
            Book a Table
          </span>
        </div>
      </Plate>

      <div className="px-6 pt-8">
        {[
          ["The Grill", "Dry-aged 45 days over white oak."],
          ["The Cellar", "Four hundred labels, one long table."],
        ].map(([title, copy]) => (
          <div key={title} className="pb-7">
            <span aria-hidden="true" className="mb-4 block h-px w-10" style={{ background: gold }} />
            <p style={{ fontFamily: serif, fontSize: 24, lineHeight: 1.1 }}>{title}</p>
            <p
              style={{
                fontFamily: sans,
                fontSize: 13,
                lineHeight: 1.6,
                marginTop: 7,
                color: "rgba(243,236,224,0.6)",
              }}
            >
              {copy}
            </p>
          </div>
        ))}
      </div>
    </PreviewRoot>
  );
}
