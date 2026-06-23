// Generate raster favicons from src/app/icon.svg using sharp (no ImageMagick needed).
// Run: node scripts/gen-favicons.mjs
import sharp from 'sharp';
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const svg = readFileSync(join(root, 'src/app/icon.svg'));
const SLATE = '#1e293b';

// Oversample the SVG (high density) then downscale → crisp at every size.
async function png(size) {
  return sharp(svg, { density: Math.ceil(size * 4.5) })
    .resize(size, size)
    .flatten({ background: SLATE }) // no transparent corners (clean on iOS)
    .png()
    .toBuffer();
}

// Wrap a 32x32 PNG in a minimal ICO container (PNG-in-ICO, supported everywhere modern).
function pngToIco(pngBuf) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type = icon
  header.writeUInt16LE(1, 4); // image count
  const entry = Buffer.alloc(16);
  entry.writeUInt8(32, 0); // width
  entry.writeUInt8(32, 1); // height
  entry.writeUInt8(0, 2); // palette
  entry.writeUInt8(0, 3); // reserved
  entry.writeUInt16LE(1, 4); // color planes
  entry.writeUInt16LE(32, 6); // bits per pixel
  entry.writeUInt32LE(pngBuf.length, 8); // image size
  entry.writeUInt32LE(22, 12); // offset = 6 + 16
  return Buffer.concat([header, entry, pngBuf]);
}

writeFileSync(join(root, 'src/app/apple-icon.png'), await png(180));
writeFileSync(join(root, 'public/icon-192.png'), await png(192));
writeFileSync(join(root, 'public/icon-512.png'), await png(512));
writeFileSync(join(root, 'src/app/favicon.ico'), pngToIco(await png(32)));

console.log('Favicons generated: icon.svg → favicon.ico, apple-icon.png, icon-192.png, icon-512.png');
