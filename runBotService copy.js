const puppeteer = require("puppeteer");
const Models = require("./src/models/index");

async function execute() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto("https://leviathancommander.wixsite.com/home/reports");

  let commanders = [];
  let count = 0;

  let urls = [];
  while (await page.$("a.gwgQCb.IEV8qS")) {
    const pageUrls = await page.evaluate(() =>
      Array.from(
        document.querySelectorAll(
          "a.O16KGI.pu51Xe.lyd6fK.xs2MeC.has-custom-focus.i6wKmL"
        ),
        (element) => element.href
      )
    );
    pageUrls.forEach((url) => urls.push(url));
    console.log(pageUrls);
    await page.waitForTimeout(4000);
    await page.click("a.gwgQCb.IEV8qS");
  }
  const pageUrls = await page.evaluate(() =>
    Array.from(
      document.querySelectorAll("a.has-custom-focus"),
      (element) => element.href
    )
  );
  pageUrls.forEach((url) =>
    !url.includes("wix.com") &&
    url !==
      "https://leviathancommander.wixsite.com/home/post/leviathan-team-battle"
      ? urls.push(url)
      : ""
  );

  await page.waitForTimeout(4000);
  await newFunction();
  async function newFunction() {
    for (let i = 0, total_urls = urls.length; i < total_urls; i++) {
      await page.goto(urls[i]);
      console.log(page.url());

      await page.waitForSelector("p.mm8Nw");

      const podium = await page.$$eval("p.mm8Nw ", (elements) =>
        elements.map((item) => item.textContent)
      );

      let location = podium.find((item) => item.includes("City"));
      if (location) {
        location = location.replace("Country/City: ", "");
      }

      let date = podium.find((item) => item.includes("Data"));
      if (date) {
        date = date.replace("Data:  ", "");
      }

      let nbPlayers = podium.find((item) => item.includes("Nb"));
      if (nbPlayers) {
        nbPlayers = nbPlayers.replace("Nb of players: ", "");
        nbPlayers = nbPlayers.replace("Nb of players*: ", "");
      }

      let champion = podium.find(
        (item) =>
          !item.includes("Nb") &&
          !item.includes("Data") &&
          (item[0] == 1 || item[1] == 1) &&
          (item.includes("1.") ||
            item.includes("1)") ||
            item.includes("1-") ||
            item.includes("1"))
      );
      if (champion !== undefined) {
        remove_before = champion.includes("-")
          ? champion.indexOf("-")
          : champion.indexOf(")");
        champion = champion.substring(remove_before + 2, champion.length - 1);
      }

      let second = podium.find(
        (item) =>
          !item.includes("Nb") &&
          !item.includes("Data") &&
          item[0] == 2 &&
          (item.includes("2.") ||
            item.includes("2)") ||
            item.includes("2-") ||
            item.includes("2"))
      );
      if (second !== undefined) {
        remove_before = second.includes("-")
          ? second.indexOf("-")
          : second.indexOf(")");
        second = second.substring(remove_before + 2, second.length - 1);
      }

      let third = podium.find(
        (item) =>
          !item.includes("Nb") &&
          !item.includes("Data") &&
          item[0] == 3 &&
          (item.includes("3.") ||
            item.includes("3)") ||
            item.includes("3-") ||
            item.includes("3"))
      );
      if (third !== undefined) {
        remove_before = third.includes("-")
          ? third.indexOf("-")
          : third.indexOf(")");
        third = third.substring(remove_before + 2, third.length - 1);
      }

      let fourth = podium.find(
        (item) =>
          !item.includes("Nb") &&
          !item.includes("Data") &&
          item[0] == 4 &&
          (item.includes("4.") ||
            item.includes("4)") ||
            item.includes("4-") ||
            item.includes("4"))
      );
      if (fourth !== undefined) {
        remove_before = fourth.includes("-")
          ? fourth.indexOf("-")
          : fourth.indexOf(")");
        fourth = fourth.substring(remove_before + 2, fourth.length);
      }

      if (fourth !== undefined && fourth.includes("5")) {
        remove_after = fourth.indexOf("5");
        fourth = fourth.slice(0, remove_after);
      }

      if (!champion) {
        champion = await page.$$eval(
          "h3._3qMKZ._1j-51._1FoOD._3M0Fe.Z63qyL",
          (elements) => elements.map((item) => item.textContent)
        );
        champion = champion.filter(item => item.includes('1'))

        if (!champion || champion.length < 1) {
          champion = await page.$$eval(
            "ol.public-DraftStyleDefault-ol",
            (elements) => elements.map((item) => item.textContent)
          );
          console.log(champion);
        }
        champion[0] = champion.length > 1 ? champion[1] : champion[0];

        remove_before = champion[0].includes("-")
          ? champion[0].indexOf("-")
          : champion[0].indexOf(")");
        champion = champion[0].substring(
          remove_before + 2,
          champion[0].length - 1
        );
      }

      let championship = {
        id: i,
        location: location,
        date: date,
        players: nbPlayers,
        champion: champion,
        top4: champion + " - " + second + " - " + third + " - " + fourth,
      };

      console.log(championship);
      await Models.Championships.create(championship);
      await page.waitForTimeout(4000);
    }
  }
  await browser.close();
}

execute();
