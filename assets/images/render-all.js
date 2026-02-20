const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

async function renderSvgToPng(svgFile, pngFile) {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 675, deviceScaleFactor: 2 });
  
  const svgContent = fs.readFileSync(svgFile, 'utf8');
  const html = `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<style>
* { margin: 0; padding: 0; }
body { background: #0a0a0a; width: 1200px; height: 675px; overflow: hidden; }
svg { display: block; width: 1200px; height: 675px; }
</style>
<link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet">
</head>
<body>${svgContent}</body>
</html>`;
  
  await page.setContent(html, { waitUntil: 'networkidle0', timeout: 30000 });
  await page.evaluateHandle('document.fonts.ready');
  await new Promise(r => setTimeout(r, 500));
  
  await page.screenshot({ 
    path: pngFile, 
    type: 'png',
    clip: { x: 0, y: 0, width: 1200, height: 675 }
  });
  await browser.close();
  console.log('Created:', path.basename(pngFile));
}

const files = [
  'image-1-conversion-funnel',
  'image-2-financial-impact',
  'image-3-email-timeline',
  'image-4-branching-logic',
  'image-5-sms-alignment',
  'image-6-dashboard'
];

(async () => {
  for (const f of files) {
    await renderSvgToPng(`svg/${f}.svg`, `png/${f}.png`);
  }
  console.log('All done!');
})();
