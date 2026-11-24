const fs = require('fs');
const path = require('path');
const https = require('https');

const CSS_URL = 'https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400..700&family=Kaushan+Script&family=Grand+Hotel&family=Yellowtail&family=Alex+Brush&family=Fraunces:opsz,wght@9..144,300..700&family=Poppins:wght@400;500;600&display=swap';
const OUT = path.resolve(__dirname, '..', 'brand', 'fonts');

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36';

function get(url, redirects = 0) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': UA } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location && redirects < 5) {
        res.resume();
        resolve(get(new URL(res.headers.location, url).toString(), redirects + 1));
        return;
      }
      if (res.statusCode !== 200) {
        res.resume();
        reject(new Error(`HTTP ${res.statusCode} for ${url}`));
        return;
      }
      const chunks = [];
      res.on('data', (c) => chunks.push(c));
      res.on('end', () => resolve(Buffer.concat(chunks)));
    }).on('error', reject);
  });
}

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  let css = (await get(CSS_URL)).toString('utf8');
  const urls = [...new Set([...css.matchAll(/url\((https:\/\/fonts\.gstatic\.com\/[^)]+)\)/g)].map((m) => m[1]))];

  const names = new Map();
  for (const u of urls) {
    const name = u.split('/').slice(-2).join('-');
    names.set(u, name);
    const buf = await get(u);
    fs.writeFileSync(path.join(OUT, name), buf);
    console.log(`${name}  ${(buf.length / 1024).toFixed(1)} KB`);
  }

  css = css.replace(/url\((https:\/\/fonts\.gstatic\.com\/[^)]+)\)/g, (_m, u) => `url(./${names.get(u)})`);
  fs.writeFileSync(path.join(OUT, 'fonts.css'), css);
  console.log(`\nfonts saved: ${urls.length}`);
})().catch((e) => { console.error(e); process.exit(1); });
