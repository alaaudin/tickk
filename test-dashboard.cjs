const puppeteer = require('./scratch/node_modules/puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('BROWSER CONSOLE:', msg.text()));
  page.on('pageerror', err => console.log('BROWSER ERROR:', err.message));
  
  try {
    await page.goto('http://localhost:3000/#', { waitUntil: 'networkidle2', timeout: 10000 });
    console.log("Page loaded");
  } catch (e) {
    console.log("Navigation error:", e.message);
  }
  
  await browser.close();
})();
