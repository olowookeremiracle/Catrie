const fs = require('fs');
const path = require('path');

const FONTS = path.join(__dirname, 'fonts');
const css = fs.readFileSync(path.join(FONTS, 'fonts.css'), 'utf8');
const blocks = css.split('}');

function latinUrl(family) {
  for (const b of blocks) {
    if (!b.includes(`font-family: '${family}'`)) continue;
    if (!/U\+0000-00FF/.test(b)) continue;
    const m = b.match(/url\((\.\/[^)]+)\)/);
    if (m) return path.join(FONTS, m[1].replace('./', ''));
  }
  throw new Error(`Missing latin face for ${family}`);
}

const kaushan = `data:font/woff2;base64,${fs.readFileSync(latinUrl('Kaushan Script')).toString('base64')}`;

const ORANGE = '#E86A17';
const CHOCOLATE = '#3B2415';
const CREAM = '#FFF7EC';

function wordmark(trie) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 170" width="480" height="170" role="img" aria-label="Catrie">
  <defs>
    <style>
      @font-face { font-family: 'Kaushan'; src: url("${kaushan}") format('woff2'); font-weight: 400; font-style: normal; }
      .word { font-family: 'Kaushan', cursive; font-size: 160px; letter-spacing: -1.6px; }
    </style>
  </defs>
  <text class="word" x="246" y="140" text-anchor="middle"><tspan fill="${ORANGE}">Ca</tspan><tspan fill="${trie}">trie</tspan></text>
</svg>
`;
}

const mark = (bg, letter, border) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512" role="img" aria-label="Catrie">
  <defs>
    <style>
      @font-face { font-family: 'Kaushan'; src: url("${kaushan}") format('woff2'); font-weight: 400; font-style: normal; }
      .c { font-family: 'Kaushan', cursive; font-size: 368px; }
    </style>
  </defs>
  <rect width="512" height="512" rx="133" fill="${bg}"${border ? ` stroke="${border}" stroke-width="8"` : ''} />
  <text class="c" x="256" y="379" text-anchor="middle" fill="${letter}">C</text>
</svg>
`;

const write = (name, content) => {
  fs.writeFileSync(path.join(__dirname, name), content);
  console.log(`${name}  ${(Buffer.byteLength(content) / 1024).toFixed(1)} KB`);
};

write('catrie-logo.svg', wordmark(CHOCOLATE));
write('catrie-logo-dark.svg', wordmark(CREAM));
write('catrie-mark.svg', mark(ORANGE, CREAM, null));
write('catrie-mark-reverse.svg', mark(CREAM, ORANGE, '#E6D8C4'));

const redundant = path.join(__dirname, 'catrie-wordmark.svg');
if (fs.existsSync(redundant)) {
  fs.unlinkSync(redundant);
  console.log('removed catrie-wordmark.svg (logo is now wordmark-only)');
}
