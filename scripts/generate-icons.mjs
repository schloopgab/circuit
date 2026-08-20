// One-off icon generator: draws the app's ring motif (dark square, accent
// ring — echoing "Circuit") at each size the manifest/iOS need. Pure-JS
// (pngjs), no native deps, so it runs anywhere Node runs. Not part of the
// build — run manually if the icon design ever needs to change, then the
// pngjs devDependency can be dropped again.
import { PNG } from "pngjs";
import { writeFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, "..", "public", "icons");
mkdirSync(outDir, { recursive: true });

const BG = [0x14, 0x18, 0x1a]; // colors.bg
const ACCENT = [0xcc, 0xe0, 0x00]; // colors.accent

// Renders at 4x then box-downsamples for anti-aliased edges without a real
// rasterizer.
function drawIcon(size, { outerFrac, innerFrac }) {
  const S = size * 4;
  const cx = S / 2;
  const cy = S / 2;
  const outerR = S * outerFrac;
  const innerR = S * innerFrac;
  const big = new Float32Array(S * S * 3);
  for (let y = 0; y < S; y++) {
    for (let x = 0; x < S; x++) {
      const dx = x - cx;
      const dy = y - cy;
      const d = Math.sqrt(dx * dx + dy * dy);
      const inRing = d <= outerR && d >= innerR;
      const c = inRing ? ACCENT : BG;
      const i = (y * S + x) * 3;
      big[i] = c[0];
      big[i + 1] = c[1];
      big[i + 2] = c[2];
    }
  }
  const png = new PNG({ width: size, height: size });
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      let r = 0, g = 0, b = 0;
      for (let sy = 0; sy < 4; sy++) {
        for (let sx = 0; sx < 4; sx++) {
          const i = ((y * 4 + sy) * S + (x * 4 + sx)) * 3;
          r += big[i];
          g += big[i + 1];
          b += big[i + 2];
        }
      }
      const idx = (size * y + x) << 2;
      png.data[idx] = Math.round(r / 16);
      png.data[idx + 1] = Math.round(g / 16);
      png.data[idx + 2] = Math.round(b / 16);
      png.data[idx + 3] = 255;
    }
  }
  return PNG.sync.write(png);
}

// "any" purpose icons: ring runs closer to the edge.
for (const size of [192, 512]) {
  writeFileSync(join(outDir, `icon-${size}.png`), drawIcon(size, { outerFrac: 0.42, innerFrac: 0.3 }));
}
// "maskable" icons: kept inside the ~80% safe zone so OS-applied masks
// (circle, squircle, etc.) don't clip the ring.
for (const size of [192, 512]) {
  writeFileSync(join(outDir, `icon-${size}-maskable.png`), drawIcon(size, { outerFrac: 0.34, innerFrac: 0.24 }));
}
// iOS home-screen icon (Safari ignores the manifest and wants this specifically).
writeFileSync(join(outDir, "apple-touch-icon.png"), drawIcon(180, { outerFrac: 0.42, innerFrac: 0.3 }));
// Browser-tab favicon.
writeFileSync(join(outDir, "favicon-32.png"), drawIcon(32, { outerFrac: 0.42, innerFrac: 0.28 }));

console.log("Icons written to", outDir);
