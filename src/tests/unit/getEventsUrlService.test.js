const getEventsUrlService = require("../../services/bot/getEventsUrlService");

describe("Test the get url event service", () => {
    jest.setTimeout(1500000);
    test("should return array with more than 300 urls", async () => {
        const response = await getEventsUrlService.execute();
        const containOnlyReports = response.every((item) =>
            item.includes("https://leviathancommander.wixsite.com/home/post")
        );
        expect(response.length).toBeGreaterThan(300);
        expect(containOnlyReports).toBeTruthy();
    });
});
