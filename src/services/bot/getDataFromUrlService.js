const puppeteer = require("puppeteer");
const Models = require("../../models/index");

async function execute(fetchedUrl) {
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

    await page.goto(fetchedUrl, {
        waitUntil: "load",
        timeout: 0,
    });
    // console.log(page.url());
    let [event, standings] = await getEventData(page, fetchedUrl);
    if (!event.name) {
        [event, standings] = await getEventData(page, fetchedUrl);
    }
    const createdEvent = await Models.Event.create(event);

    const deckLists = await page.$$eval("p.mm8Nw a", (as) =>
        as.map((a) => {
            return { url: a.href, commander: a.text };
        })
    );
    const decks = getDecksData(createdEvent, standings, deckLists);

    for (let i = 0; i < decks.length; i++) {
        await Models.Deck.create(decks[i]);
    }

    await browser.close();
}

async function getEventData(page, fetchedUrl) {
    const title = await page.$$eval("h1.UbhFJ7 ", (elements) =>
        elements.map((item) => item.textContent)
    );

    let eventData = await page.$$eval(
        "span.public-DraftStyleDefault-ltr  ",
        (elements) => elements.map((item) => item.textContent)
    );
    // console.log(eventData);
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
        location = location.replace("Country/City*: ", "");
    }

    let date = eventData.find((item) => item.includes("Data"));
    if (date) {
        date = getDateFromSpecialCases(fetchedUrl, date);

        const index = date.indexOf(":");
        if (index > -1) {
            date = date.substring(index + 1, date.length);
        }
        date = new Date(date).toLocaleDateString();
        const [day, month, year] = date.split("/");
        date = [year, month, day].join("-");
    }

    let nbPlayers = eventData.find((item) => item.includes("Nb"));
    if (nbPlayers) {
        nbPlayers = nbPlayers.replace("Nb of players: ", "");
        nbPlayers = nbPlayers.replace("Nb of players*: ", "");
    }

    const event = {
        name: title[0],
        location,
        date,
        numberOfPlayers: nbPlayers,
        url: fetchedUrl,
    };

    return [event, standings];
}

function getDateFromSpecialCases(fetchedUrl, date) {
    const fixedDates = {
        "https://leviathancommander.wixsite.com/home/post/poland-leviathan-league-apr-may-poland":
            "2022-4-1",
        "https://leviathancommander.wixsite.com/home/post/krakenfest-on-line-2-aug-10-sep-4-cockatrice":
            "2022-8-10",
        "https://leviathancommander.wixsite.com/home/post/leviathan-team-battle-1-2022":
            "2022-2-1",
        "https://leviathancommander.wixsite.com/home/post/krakenfest-on-line-1-june13-july-10-cockatrice":
            "2022-6-13",
        "https://leviathancommander.wixsite.com/home/post/krakenfest-on-line-3-nov-1-17-cockatrice":
            "2022-11-1",
        "https://leviathancommander.wixsite.com/home/post/sea-king-tournament-report":
            "2019-7-6",
        default: date,
    };
    return fixedDates[fetchedUrl] || fixedDates.default;
}

function getDecksData(createdEvent, standings, deckLists) {
    const decks = standings.map((item) => {
        const position = Number.isNaN(item[1]) ? item[0] : item[0] + item[1];
        let indexOfStringDivision;
        if (item.includes("-")) {
            indexOfStringDivision = item.indexOf("-");
        }
        if (item.includes("–")) {
            indexOfStringDivision = item.indexOf("–");
        }
        let commander = item.substring(indexOfStringDivision + 2, item.length);

        commander =
            commander[commander.length - 1] === " "
                ? commander.slice(0, commander.length - 1)
                : commander;
        const list = deckLists.find((i) => i.commander === commander);

        let arr = [];
        const index = commander.indexOf("//");
        if (index > -1) {
            arr.push(commander.substring(0, index));
            arr.push(commander.substring(index + 2, commander.length));
            arr = arr.sort();
            commander = `${arr[0]}//${arr[1]}`;
        }

        const obj = {
            eventId: createdEvent.id,
            position,
            commander,
            decklist: typeof list === "object" ? list.url : undefined,
        };

        const indexOfList = deckLists.indexOf(list);
        if (indexOfList > -1) {
            deckLists.splice(indexOfList, 1);
        }
        return obj;
    });
    return decks;
}

module.exports = {
    execute,
};
