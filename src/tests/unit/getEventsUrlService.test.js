const puppeteer = require("puppeteer");
const getEventsUrlService = require("../../services/bot/getEventsUrlService");

jest.mock("puppeteer", () => {
    return {
        launch: jest.fn().mockResolvedValue({
            newPage: jest.fn().mockResolvedValue({
                setUserAgent: jest.fn().mockResolvedValue(),
                setViewport: jest.fn().mockResolvedValue(),
                goto: jest.fn().mockResolvedValue(),
                waitForTimeout: jest.fn().mockResolvedValue(),
                $$eval: jest
                    .fn()
                    .mockReturnValueOnce([
                        "https://leviathancommander.wixsite.com/home/post1",
                        "https://leviathancommander.wixsite.com/home/post2",
                        "https://badurl.com",
                    ])
                    .mockReturnValueOnce([
                        "https://leviathancommander.wixsite.com/home/post3",
                        "https://leviathancommander.wixsite.com/home/post4",
                        "https://badurl2.com",
                    ])
                    .mockReturnValueOnce([
                        "https://leviathancommander.wixsite.com/home/post5",
                        "https://leviathancommander.wixsite.com/home/post6",
                        "https://badurl3.com",
                    ]),
                close: jest.fn().mockResolvedValue(),
                $: jest
                    .fn()
                    .mockReturnValueOnce(true)
                    .mockReturnValueOnce(true)
                    .mockReturnValueOnce(false),
                evaluate: jest.fn().mockResolvedValue(),
            }),
            close: jest.fn().mockResolvedValue(),
        }),
    };
});
let browser;
let page;

describe("Test the getEventsUrlService", () => {
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
    it("returns an array of URLs including the string post", async () => {
        const urls = await getEventsUrlService.execute();
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
        expect(page.goto).toHaveBeenCalledWith(
            "https://leviathancommander.wixsite.com/home/reports",
            {
                waitUntil: "load",
                timeout: 0,
            }
        );
        expect(urls).toEqual([
            "https://leviathancommander.wixsite.com/home/post1",
            "https://leviathancommander.wixsite.com/home/post2",
            "https://leviathancommander.wixsite.com/home/post3",
            "https://leviathancommander.wixsite.com/home/post4",
            "https://leviathancommander.wixsite.com/home/post5",
            "https://leviathancommander.wixsite.com/home/post6",
        ]);
        expect(browser.close).toHaveBeenCalled();
    });
});
