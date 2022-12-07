const puppeteer = require("puppeteer");

async function execute() {
  const browser = await puppeteer.launch({
    headless: false,
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--start-maximized"],
    defaultViewport: null,
  });
  const page = await browser.newPage();
  await page.goto("https://leviathancommander.wixsite.com/home/reports");

  let urlsArray = [];
  await page.waitForTimeout(4000);
  page.evaluate(() => document.querySelector("a.gwgQCb.IEV8qS")?.click());

  while (await page.$("a.gwgQCb.IEV8qS")) {
    let hrefs = await page.$$eval("a.has-custom-focus", (as) =>
      as.map((a) => a.href)
    );
    hrefs = hrefs.filter((item) =>
      item.includes("https://leviathancommander.wixsite.com/home/post")
    );
    hrefs.forEach((url) => urlsArray.push(url));
    console.log("loading", urlsArray.length);
    await page.waitForTimeout(4000);
    page.evaluate(() => document.querySelector("a.gwgQCb.IEV8qS")?.click());
  }
  const pageUrls = await page.evaluate(() =>
    Array.from(
      document.querySelectorAll("a.has-custom-focus"),
      (element) => element.href
    )
  );
  pageUrls.forEach((url) => urlsArray.push(url));

  await browser.close();

  return urlsArray;
}

module.exports = {
  execute,
};
