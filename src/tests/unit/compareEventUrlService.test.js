const compareEventUrlService = require("../../services/compareEventUrlService");

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
    test("should return reversed data", async () => {
        expect(
            await compareEventUrlService.execute(["1", "2", "3"])
        ).toMatchObject(["3", "2", "1"]);
    });
    test("should return good urls only", async () => {
        expect(await compareEventUrlService.execute(data)).toMatchObject([
            goodUrl2,
            goodUrl1,
        ]);
    });
    test("should return no repeated urls ", async () => {
        expect(
            await compareEventUrlService.execute([goodUrl2, goodUrl2, goodUrl2])
        ).toMatchObject([goodUrl2]);
    });
});
