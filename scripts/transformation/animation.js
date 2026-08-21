/**
 * BETTER BUILT — WEBSITE TRANSFORMATION
 * =====================================
 *
 * Ironwood Construction's 2004 site rebuilt into its 2026 site, in five
 * seconds. Both pages are the supplied screenshots, untouched: the animation
 * only ever clips, moves and fades them. No pixel of either page is redrawn,
 * recoloured or reinterpreted, and no text is invented — everything readable
 * in the video is readable in the sources.
 *
 * The whole thing is a pure function of time. `seek(t)` with t in 0..1 sets
 * every style from scratch, so frame 74 looks the same whether it was reached
 * by playing or by stepping. That is what lets the renderer capture it exactly.
 *
 * The cut follows the pages' own structure: `bands.json` holds the section
 * boundaries measured from the images themselves, so the rebuild happens along
 * the seams a designer would actually work to — header, nav, hero, body,
 * features, footer — rather than on an arbitrary grid.
 */

(function (global) {
  const STAGE_W = 1920;
  const STAGE_H = 1080;
  const PAGE_H = 970; // native height of both sources; avoids resampling

  /**
   * Total running time. The rebuild itself accounts for 2.8s of it; the rest
   * is the two held frames, kept deliberately short.
   *
   * This loops on a card, where a full second of a motionless old page at the
   * top reads as the video having stalled. The cascade covers for the short
   * holds either way: for the first second only the top band is moving, so the
   * old page is still plainly legible, and the new one is all but complete
   * well before the final hold begins.
   */
  const DURATION_S = 3.2;

  /* Timeline, in fractions of the running time. */
  const HOLD_OLD = 0.031; // 0.00–0.10s   the old site, still
  const FIRST_BAND = 0.031; // 0.10s      the rebuild starts
  const LAST_BAND = 0.625; // 2.00s       the final band begins
  const BAND_DUR = 0.281; // 0.90s        one band, start to finish
  const HOLD_NEW = LAST_BAND + BAND_DUR; // 0.906 → 2.90s, the new site, still

  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const easeInOut = (p) => (p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2);
  const easeOut = (p) => 1 - Math.pow(1 - p, 3);

  /** Ramps 0→1→0 across a window, for things that only exist mid-rebuild. */
  function arc(t, start, end) {
    if (t <= start || t >= end) return 0;
    const p = (t - start) / (end - start);
    return Math.sin(p * Math.PI);
  }

  /**
   * When band `i` starts. The gaps tighten as it goes, so the rebuild reads as
   * accelerating: the first section is deliberate, the last few overlap.
   */
  function bandStart(i, count) {
    const n = count > 1 ? i / (count - 1) : 0;
    return FIRST_BAND + (LAST_BAND - FIRST_BAND) * Math.pow(n, 0.72);
  }

  /**
   * The two screenshots are different sizes, so each gets its own geometry
   * rather than being squeezed onto a shared one.
   *
   * Every number below is rounded to a whole pixel. Centring an odd-width
   * image in an even-width stage the obvious way — left:50% with a -50%
   * translate — lands it on a half pixel, and the browser then resamples it;
   * on a 2004 page rendered at 11px that softening is plainly visible. Half a
   * pixel off centre is not.
   *
   * Slicing each layer from its own natural height also means each rebuilds
   * contiguously: band edges are shared boundaries, so no seam can open up
   * between them when the page is being held still.
   */
  const SOURCES = {
    old: { src: "../../old.jpg", w: 679, h: 970 },
    new: { src: "../../new.jpg", w: 837, h: 971 },
  };

  function layerGeometry(source, bands) {
    const left = Math.floor((STAGE_W - source.w) / 2);
    const top = Math.floor((STAGE_H - source.h) / 2);
    const edges = bands.map((b) => Math.round(b.top * source.h));
    edges.push(source.h);
    return { left, top, edges };
  }

  function build(root, bands) {
    root.innerHTML = "";
    root.className = "bb-stage";

    const sheet = document.createElement("div");
    sheet.className = "bb-sheet";
    root.appendChild(sheet);

    /* The drafting grid, only present while the page is in pieces. */
    const grid = document.createElement("div");
    grid.className = "bb-grid";
    sheet.appendChild(grid);

    const geo = {
      old: layerGeometry(SOURCES.old, bands),
      new: layerGeometry(SOURCES.new, bands),
    };

    const built = bands.map((band, i) => {
      const made = {};

      for (const which of ["old", "new"]) {
        const source = SOURCES[which];
        const g = geo[which];
        const sliceTop = g.edges[i];
        const sliceHeight = g.edges[i + 1] - sliceTop;

        const layer = document.createElement("div");
        layer.className = "bb-layer bb-" + which;
        layer.style.top = g.top + sliceTop + "px";
        layer.style.height = sliceHeight + "px";

        const img = document.createElement("img");
        img.src = source.src;
        img.draggable = false;
        img.width = source.w;
        img.height = source.h;
        img.style.left = g.left + "px";
        img.style.top = -sliceTop + "px";
        layer.appendChild(img);

        sheet.appendChild(layer);
        made[which] = layer;
      }

      /* The line the rebuild travels behind — a designer's straight edge. */
      const edge = document.createElement("div");
      edge.className = "bb-edge";
      edge.style.top = geo.new.top + geo.new.edges[i] + "px";
      edge.style.height = geo.new.edges[i + 1] - geo.new.edges[i] + "px";
      sheet.appendChild(edge);

      return { old: made.old, new: made.new, edge, dir: i % 2 === 0 ? 1 : -1 };
    });

    /* One horizontal rule descending the page, just ahead of the rebuild. */
    const scan = document.createElement("div");
    scan.className = "bb-scan";
    sheet.appendChild(scan);

    return { sheet, grid, scan, bands: built };
  }

  function create(root, bands) {
    const parts = build(root, bands);

    function seek(t) {
      t = clamp(t, 0, 1);

      parts.bands.forEach((band, i) => {
        const start = bandStart(i, parts.bands.length);
        const raw = clamp((t - start) / BAND_DUR, 0, 1);
        const p = easeInOut(raw);
        const pct = p * 100;

        /* Old recedes and new arrives across the same moving edge, so one
           page is genuinely replacing the other rather than dissolving into
           it. Direction alternates so the page reads as being worked on
           section by section. */
        if (band.dir === 1) {
          band.old.style.clipPath = `inset(0 0 0 ${pct}%)`;
          band.new.style.clipPath = `inset(0 ${100 - pct}% 0 0)`;
          band.edge.style.left = pct + "%";
        } else {
          band.old.style.clipPath = `inset(0 ${pct}% 0 0)`;
          band.new.style.clipPath = `inset(0 0 0 ${100 - pct}%)`;
          band.edge.style.left = 100 - pct + "%";
        }

        /* Only while it is actually moving: a touch of blur standing in for
           shutter, and the incoming section settling the last half-percent
           into place. Both drop to exactly none at either end, so a held
           frame is the untouched screenshot and nothing is resampled. */
        const moving = arc(raw, 0, 1);
        const blur = moving > 0.001 ? `blur(${(moving * 2.2).toFixed(2)}px)` : "none";
        band.old.style.filter = blur;
        band.new.style.filter = blur;
        band.new.style.transform =
          raw > 0 && raw < 1 ? `scale(${(0.994 + 0.006 * easeOut(raw)).toFixed(4)})` : "none";
        band.edge.style.opacity = raw > 0 && raw < 1 ? moving.toFixed(3) : "0";
      });

      const mid = arc(t, HOLD_OLD, HOLD_NEW);
      parts.grid.style.opacity = (mid * 0.5).toFixed(3);

      /* The scan line runs the height of the page across the rebuild, then
         leaves. It is never present while either page is being held. */
      if (t > HOLD_OLD && t < HOLD_NEW) {
        const p = (t - HOLD_OLD) / (HOLD_NEW - HOLD_OLD);
        parts.scan.style.opacity = (arc(t, HOLD_OLD, HOLD_NEW) * 0.85).toFixed(3);
        parts.scan.style.top = (easeInOut(p) * PAGE_H).toFixed(1) + "px";
      } else {
        parts.scan.style.opacity = "0";
      }
    }

    return { seek, parts };
  }

  global.BBTransformation = {
    create,
    DURATION_S,
    STAGE_W,
    STAGE_H,
    PAGE_H,
    HOLD_OLD,
    HOLD_NEW,
  };
})(typeof window !== "undefined" ? window : globalThis);
