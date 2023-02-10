const puppeteer = require("puppeteer");

const urlsArray = [];

// let cov_2jmyuny2tf;

async function execute() {
    const browser = await puppeteer.launch({
        headless: true,
        args: ["--no-sandbox", "--disable-setuid-sandbox", "--start-maximized"],
        defaultViewport: null,
        waitUntil: "load",
    });
    const page = await browser.newPage();
    await page.setUserAgent(
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36"
    );
    await page.setViewport({ width: 1440, height: 1024 });
    await page.goto("https://leviathancommander.wixsite.com/home/reports", {
        waitUntil: "load",
        timeout: 0,
    });

    await page.waitForTimeout(4000);
    while (await page.$("a.gwgQCb.IEV8qS")) {
        await getPageUrls(page);

        // eslint-disable-next-line no-loop-func, no-undef
        page.evaluate(() => document.querySelector("a.gwgQCb.IEV8qS")?.click());
    }
    await getPageUrls(page);
    await browser.close();

    return urlsArray;
}

async function getPageUrls(page) {
    await page.waitForTimeout(4000);

    let hrefs = await page.$$eval("a.has-custom-focus", (as) =>
        as.map((a) => a.href)
    );
    hrefs = hrefs.filter((item) =>
        item.includes("https://leviathancommander.wixsite.com/home/post")
    );
    hrefs.forEach((url) => urlsArray.push(url));
}

module.exports = {
    execute,
};
