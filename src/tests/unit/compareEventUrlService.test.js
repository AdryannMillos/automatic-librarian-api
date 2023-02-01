const compareEventUrlService = require("../../services/compareEventUrlService");
const eventRepository = require("../../repositories/eventRepository");

jest.mock("../../repositories/eventRepository");

const storedUrl1 =
    "https://leviathancommander.wixsite.com/home/post/leviathan-league-tournament-5-jan-15-peru-lima";
const storedUrl2 =
    "https://leviathancommander.wixsite.com/home/post/commander-leviathan-jan-15-brazil-teresina";
const badUrl1 =
    "https://leviathancommander.wixsite.com/home/post/leviathan-team-battle";
const badUrl2 =
    "https://leviathancommander.wixsite.com/home/post/sea-king-tournament-report";
const badUrl3 =
    "https://leviathancommander.wixsite.com/home/post/spring-edition-leviathan-commander-relation";
const goodUrl1 = "https://www.youtube.com/";
const goodUrl2 = "https://jestjs.io/docs/testing-frameworks";

const data = [goodUrl1, badUrl1, badUrl2, badUrl3, goodUrl2];

describe("Test the compare event service", () => {
    test("should return good urls only", async () => {
        eventRepository.findAll.mockResolvedValue([
            { url: storedUrl1 },
            { url: storedUrl2 },
        ]);
        expect(await compareEventUrlService.execute(data)).toMatchObject([
            goodUrl2,
            goodUrl1,
        ]);
    });
    test("should return no repeated urls ", async () => {
        eventRepository.findAll.mockResolvedValue([
            { url: storedUrl1 },
            { url: storedUrl2 },
        ]);
        expect(
            await compareEventUrlService.execute([goodUrl2, goodUrl2, goodUrl2])
        ).toMatchObject([goodUrl2]);
    });

    test("should return no urls ", async () => {
        eventRepository.findAll.mockResolvedValue([
            { url: storedUrl1 },
            { url: storedUrl2 },
        ]);
        expect(
            await compareEventUrlService.execute([
                storedUrl1,
                storedUrl2,
                badUrl1,
                badUrl2,
                badUrl3,
            ])
        ).toMatchObject([]);
    });
});
