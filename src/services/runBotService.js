const puppeteer = require("puppeteer");
const Models = require("../models/index");

async function execute(urlArray) {
  const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();

  await newFunction();
  async function newFunction() {
    for (let i = 0; i < urlArray.length; i++) {
      await page.goto(urlArray[i], {
        waitUntil: "load",
        // Remove the timeout
        timeout: 0,
      });
      console.log(page.url());

      const title = await page.$$eval("h1.UbhFJ7 ", (elements) =>
        elements.map((item) => item.textContent)
      );

      let eventData = await page.$$eval("p.mm8Nw ", (elements) =>
        elements.map((item) => item.textContent)
      );

      eventData = eventData.reduce((accumResult, item) => {
        if (item.includes("\n")) {
          const splittedItems = item.split("\n").map((str) => str.trim());
          accumResult.push(...splittedItems);
        } else {
          accumResult.push(item);
        }

        return accumResult;
      }, []);

      const standings = eventData.filter((item) => Number(item[0]));

      let location = eventData.find((item) => item.includes("City"));
      if (location) {
        location = location.replace("Country/City: ", "");
      }

      let date = eventData.find((item) => item.includes("Data"));
      if (date) {
        date = date.replace("Data:  ", "");
      }

      let nbPlayers = eventData.find((item) => item.includes("Nb"));
      if (nbPlayers) {
        nbPlayers = nbPlayers.replace("Nb of players: ", "");
        nbPlayers = nbPlayers.replace("Nb of players*: ", "");
      }

      let event = {
        name: title[0],
        location: location,
        date: date,
        numberOfPlayers: nbPlayers,
        url: urlArray[i],
      };

      const createdEvent = await Models.Event.create(event);

      const deckLists = await page.$$eval("p.mm8Nw a", (as) =>
        as.map((a) => {
          return { url: a.href, commander: a.text };
        })
      );

      const decks = standings.map((item, index) => {
        const position = isNaN(item[1]) ? item[0] : item[0] + item[1];
        const indexOfStringDivision = item.includes("-")
          ? item.indexOf("-")
          : item.indexOf(")");
        let commander = item.substring(indexOfStringDivision + 2, item.length);

        commander =
          commander[commander.length - 1] == " "
            ? commander.slice(0, commander.length - 1)
            : commander;
        let list = deckLists.find((item) => item.commander === commander);

        const obj = {
          eventId: createdEvent.id,
          position: position,
          commander: commander,
          decklist: typeof list == "object" ? list.url : undefined,
        };

        const indexOfList = deckLists.indexOf(list);
        if (indexOfList > -1) {
          // only splice array when item is found
          deckLists.splice(indexOfList, 1); // 2nd parameter means remove one item only
        }
        return obj;
      });
      decks.map(async (item) => await Models.Deck.create(item));

      await page.waitForTimeout(4000);
    }
  }
  await browser.close();
}

module.exports = {
  execute,
};
