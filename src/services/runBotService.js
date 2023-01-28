const puppeteer = require("puppeteer");
const Models = require("../models/index");

async function execute(urlArray) {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--start-maximized"],
    defaultViewport: null,
  });
  const page = await browser.newPage();
  await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36"
  );
  await page.setViewport({ width: 1440, height: 1024 });

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

      let eventData = await page.$$eval(
        "span.public-DraftStyleDefault-ltr  ",
        (elements) => elements.map((item) => item.textContent)
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
        let index = date.indexOf(":");
        if (index > -1) {
          date = date.substring(index + 1, date.length);
          if (date.includes("-")) {
            date = date;
          } else {
            date = new Date(date).toLocaleDateString();
            const [day, month, year] = date.split("/");

            date = [year, month, day].join("-");
          }
        }
        // stringDate = date.replace("Data:", "");
        // stringDate = date.replace("Data: ", "");
        // stringDate = date.replace("Data:  ", "");
        // stringDate = date.replace("Data*:  ", "");
        // date = stringDate.includes("-")
        //   ? stringDate
        //   : new Date(stringDate).toLocaleDateString();
        //   date =stringDate
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

      if (event.name == null) {
        await page.goto(urlArray[i], {
          waitUntil: "load",
          // Remove the timeout
          timeout: 0,
        });
        console.log(page.url());

        const title = await page.$$eval("h1.UbhFJ7 ", (elements) =>
          elements.map((item) => item.textContent)
        );

        let eventData = await page.$$eval(
          "span.public-DraftStyleDefault-ltr  ",
          (elements) => elements.map((item) => item.textContent)
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
          let index = date.indexOf(":");
          if (index > -1) {
            date = date.substring(index + 1, date.length);
            if (date.includes("-")) {
              date = date;
            } else {
              date = new Date(date).toLocaleDateString();
              const [day, month, year] = date.split("/");

              date = [year, month, day].join("-");
            }
          }
          // stringDate = date.replace("Data:", "");
          // stringDate = date.replace("Data: ", "");
          // stringDate = date.replace("Data:  ", "");
          // stringDate = date.replace("Data*:  ", "");
        }

        let nbPlayers = eventData.find((item) => item.includes("Nb"));
        if (nbPlayers) {
          nbPlayers = nbPlayers.replace("Nb of players: ", "");
          nbPlayers = nbPlayers.replace("Nb of players*: ", "");
        }

        event = {
          name: title[0],
          location: location,
          date: date,
          numberOfPlayers: nbPlayers,
          url: urlArray[i],
        };
      }
      if (
        page.url() ===
        "https://leviathancommander.wixsite.com/home/post/poland-leviathan-league-apr-may-poland"
      ) {
        event.date = "2022-4-1";
      }
      if (
        page.url() ===
        "https://leviathancommander.wixsite.com/home/post/krakenfest-on-line-2-aug-10-sep-4-cockatrice"
      ) {
        event.date = "2022-8-10";
      }
      if (
        page.url() ===
        "https://leviathancommander.wixsite.com/home/post/leviathan-team-battle-1-2022"
      ) {
        event.date = "2022-2-1";
      }
      if (
        page.url() ===
        "https://leviathancommander.wixsite.com/home/post/krakenfest-on-line-1-june13-july-10-cockatrice"
      ) {
        event.date = "2022-6-1";
      }
      if (
        page.url() ===
        "https://leviathancommander.wixsite.com/home/post/krakenfest-on-line-3-nov-1-17-cockatrice"
      ) {
        event.date = "2022-11-1";
      }
      if (
        page.url() ===
        "https://leviathancommander.wixsite.com/home/post/sea-king-tournament-report"
      ) {
        event.date = "2019-7-6";
      }
      const createdEvent = await Models.Event.create(event);
      const deckLists = await page.$$eval("p.mm8Nw a", (as) =>
        as.map((a) => {
          return { url: a.href, commander: a.text };
        })
      );

      const decks = standings.map((item, index) => {
        const position = isNaN(item[1]) ? item[0] : item[0] + item[1];
        let indexOfStringDivision;
        if (item.includes("-")) {
          indexOfStringDivision = item.indexOf("-");
        }
        if (item.includes(")")) {
          indexOfStringDivision = item.indexOf(")");
        }
        if (item.includes("–")) {
          indexOfStringDivision = item.indexOf("–");
        }
        commander = item.substring(indexOfStringDivision + 2, item.length);
        commander =
          commander[commander.length - 1] == " "
            ? commander.slice(0, commander.length - 1)
            : commander;
        let list = deckLists.find((item) => item.commander === commander);

        let arr = [];
        let index2 = commander.indexOf("//");
        if (index2 > -1) {
          arr.push(commander.substring(0, index2));
          arr.push(commander.substring(index2 + 2, commander.length));
          arr = arr.sort();
          commander = arr[0] + "//" + arr[1];
        }

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

      // await page.waitForTimeout(4000);
    }
  }
  await browser.close();
}

module.exports = {
  execute,
};
