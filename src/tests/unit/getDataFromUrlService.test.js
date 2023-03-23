const puppeteer = require("puppeteer");
const getDataFromUrlService = require("../../services/bot/getDataFromUrlService");
const Models = require("../../models/index");

let browser;
let page;

jest.mock("puppeteer", () => {
    return {
        launch: jest.fn().mockResolvedValue({
            newPage: jest.fn().mockResolvedValue({
                setUserAgent: jest.fn().mockResolvedValue(),
                setViewport: jest.fn().mockResolvedValue(),
                goto: jest.fn().mockResolvedValue(),
                $$eval: jest
                    .fn()
                    .mockReturnValueOnce([
                        "Leviathan League Tournament #5, Jan 15, Peru, Lima",
                    ])
                    .mockReturnValueOnce([
                        "",
                        "",
                        "Country/City: Peru, Lima",
                        "Data:  Jan 15, 2023",
                        "Nb of players: 12",
                        "",
                        "",
                        "1. Justo Chacon - Thrasios//Tymna ",
                        "2. Armando Ojeda - Winota, Joiner Of Forces ",
                        "3. Jonathan Alvarado (Cachos)  – Yoshimaru//Bruse Tarl ",
                        "",
                    ])
                    .mockReturnValueOnce([
                        {
                            url: "https://www.moxfield.com/decks/w6AB42dhEE66tQEdMaUqOg",
                            commander: "Thrasios//Tymna",
                        },
                        {
                            url: "https://www.moxfield.com/decks/i-f343JFe0W6Hug7wKtXMw",
                            commander: "Winota, Joiner Of Forces",
                        },
                        {
                            url: "https://www.moxfield.com/decks/UGwqg9iATki1wtQftGCNnQ",
                            commander: "Yoshimaru//Bruse Tarl",
                        },
                    ]),

                close: jest.fn().mockResolvedValue(),
            }),
            close: jest.fn().mockResolvedValue(),
        }),
    };
});

jest.mock("../../models/index", () => {
    return {
        Event: {
            create: jest.fn().mockResolvedValue({ id: 1 }),
        },
        Deck: {
            create: jest.fn().mockResolvedValue(),
        },
    };
});

describe("Test the getDataFromUrlService", () => {
    beforeAll(async () => {
        browser = await puppeteer.launch({
            headless: true,
            args: [
                "--no-sandbox",
                "--disable-setuid-sandbox",
                "--start-maximized",
            ],
            defaultViewport: null,
        });
        page = await browser.newPage();
    });
    it("should correctly save the event and decks", async () => {
        const fetchedUrl =
            "https://leviathancommander.wixsite.com/home/post/leviathan-league-tournament-5-jan-15-peru-lima";

        await getDataFromUrlService.execute(fetchedUrl);

        expect(puppeteer.launch).toHaveBeenCalledWith({
            headless: true,
            args: [
                "--no-sandbox",
                "--disable-setuid-sandbox",
                "--start-maximized",
            ],
            defaultViewport: null,
        });
        expect(browser.newPage).toHaveBeenCalled();
        expect(page.setUserAgent).toHaveBeenCalledWith(
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36"
        );
        expect(page.setViewport).toHaveBeenCalledWith({
            width: 1440,
            height: 1024,
        });
        expect(page.goto).toHaveBeenCalledWith(fetchedUrl, {
            waitUntil: "load",
            timeout: 0,
        });
        expect(Models.Event.create).toHaveBeenCalledWith({
            date: "2023-01-15",
            location: "Peru, Lima",
            name: "Leviathan League Tournament #5, Jan 15, Peru, Lima",
            numberOfPlayers: "12",
            url: "https://leviathancommander.wixsite.com/home/post/leviathan-league-tournament-5-jan-15-peru-lima",
        });
        expect(Models.Deck.create).toHaveBeenCalledTimes(3);
        expect(Models.Deck.create).toHaveBeenCalledWith({
            commander: "Thrasios//Tymna",
            decklist: "https://www.moxfield.com/decks/w6AB42dhEE66tQEdMaUqOg",
            eventId: 1,
            position: "1",
        });
        expect(Models.Deck.create).toHaveBeenCalledWith({
            commander: "Winota, Joiner Of Forces",
            decklist: "https://www.moxfield.com/decks/i-f343JFe0W6Hug7wKtXMw",
            eventId: 1,
            position: "2",
        });
        expect(Models.Deck.create).toHaveBeenCalledWith({
            commander: "Bruse Tarl//Yoshimaru",
            decklist: "https://www.moxfield.com/decks/UGwqg9iATki1wtQftGCNnQ",
            eventId: 1,
            position: "3",
        });
        expect(browser.close).toHaveBeenCalled();
    });
});
