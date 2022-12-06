const puppeteer = require("puppeteer");

async function execute() {
  const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();
  await page.goto("https://leviathancommander.wixsite.com/home/reports");

  let urlsArray = [];
  await page.waitForTimeout(4000);
  page.evaluate(() => document.querySelector("a.gwgQCb.IEV8qS")?.click());

  while (await page.$("a.gwgQCb.IEV8qS")) {
    const pageUrls = await page.evaluate(() =>
      Array.from(
        document.querySelectorAll("a.has-custom-focus"),
        (element) => element.href
      )
    );
    pageUrls.forEach((url) => urlsArray.push(url));
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
  console.log(urlsArray.length);
  return urlsArray;
}

module.exports = {
  execute,
};
