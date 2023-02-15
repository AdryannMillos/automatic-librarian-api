const Models = require("../../../models/index");
const eventRepository = require("../../../repositories/eventRepository");

jest.mock("../../../models/index", () => ({
    sequelize: {
        query: jest.fn().mockImplementation(() => {
            return Promise.resolve([
                { commander: "Ragavan", occurrence: 5 },
                { commander: "Leovold", occurrence: 3 },
                { commander: "Kykar", occurrence: 2 },
            ]);
        }),
        QueryTypes: {
            SELECT: "SELECT",
        },
    },
}));

describe("getMostTop4Decks", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    const location = "Teresina";
    const date = "2022";
    const initialDate = "2021-01-01";
    const finalDate = "2022-12-31";
    it("returns the top 4 commanders by occurrence with no params", async () => {
        const result = await eventRepository.getMostTop4Decks(
            null,
            null,
            null,
            null
        );

        expect(Models.sequelize.query).toHaveBeenCalledWith(
            `SELECT d."commander", COUNT(d."commander") AS "occurrence" FROM "Decks" as d INNER JOIN "Events" as e on e."id" = d."eventId"  WHERE position IN ('1', '2', '3', '4') GROUP BY "commander" ORDER BY "occurrence" DESC;`,
            {
                replacements: {
                    location: `%${null}%`,
                    date: `%${null}%`,
                    initialDate: null,
                    finalDate: null,
                },
                type: Models.sequelize.QueryTypes.SELECT,
            }
        );

        expect(result).toEqual([
            { commander: "Ragavan", occurrence: 5 },
            { commander: "Leovold", occurrence: 3 },
            { commander: "Kykar", occurrence: 2 },
        ]);
    });
    it("returns the top 4 commanders by occurrence with location", async () => {
        const result = await eventRepository.getMostTop4Decks(
            location,
            null,
            null,
            null
        );

        expect(Models.sequelize.query).toHaveBeenCalledWith(
            `SELECT d."commander", COUNT(d."commander") AS "occurrence" FROM "Decks" as d INNER JOIN "Events" as e on e."id" = d."eventId"  WHERE position IN ('1', '2', '3', '4') AND e."location" ILIKE :location GROUP BY "commander" ORDER BY "occurrence" DESC;`,
            {
                replacements: {
                    location: `%${location}%`,
                    date: `%${null}%`,
                    initialDate: null,
                    finalDate: null,
                },
                type: Models.sequelize.QueryTypes.SELECT,
            }
        );

        expect(result).toEqual([
            { commander: "Ragavan", occurrence: 5 },
            { commander: "Leovold", occurrence: 3 },
            { commander: "Kykar", occurrence: 2 },
        ]);
    });
    it("returns the top 4 commanders by occurrence with date", async () => {
        const result = await eventRepository.getMostTop4Decks(
            null,
            date,
            null,
            null
        );

        expect(Models.sequelize.query).toHaveBeenCalledWith(
            `SELECT d."commander", COUNT(d."commander") AS "occurrence" FROM "Decks" as d INNER JOIN "Events" as e on e."id" = d."eventId"  WHERE position IN ('1', '2', '3', '4') AND e."date" ILIKE :date GROUP BY "commander" ORDER BY "occurrence" DESC;`,
            {
                replacements: {
                    location: `%${null}%`,
                    date: `%${date}%`,
                    initialDate: null,
                    finalDate: null,
                },
                type: Models.sequelize.QueryTypes.SELECT,
            }
        );

        expect(result).toEqual([
            { commander: "Ragavan", occurrence: 5 },
            { commander: "Leovold", occurrence: 3 },
            { commander: "Kykar", occurrence: 2 },
        ]);
    });
    it("returns the top 4 commanders by occurrence with date interval", async () => {
        const result = await eventRepository.getMostTop4Decks(
            null,
            null,
            initialDate,
            finalDate
        );

        expect(Models.sequelize.query).toHaveBeenCalledWith(
            `SELECT d."commander", COUNT(d."commander") AS "occurrence" FROM "Decks" as d INNER JOIN "Events" as e on e."id" = d."eventId"  WHERE position IN ('1', '2', '3', '4') AND e.date BETWEEN :initialDate AND :finalDate GROUP BY "commander" ORDER BY "occurrence" DESC;`,
            {
                replacements: {
                    location: `%${null}%`,
                    date: `%${null}%`,
                    initialDate,
                    finalDate,
                },
                type: Models.sequelize.QueryTypes.SELECT,
            }
        );

        expect(result).toEqual([
            { commander: "Ragavan", occurrence: 5 },
            { commander: "Leovold", occurrence: 3 },
            { commander: "Kykar", occurrence: 2 },
        ]);
    });
    it("returns the top 4 commanders by occurrence with location and date", async () => {
        const result = await eventRepository.getMostTop4Decks(
            location,
            date,
            null,
            null
        );

        expect(Models.sequelize.query).toHaveBeenCalledWith(
            `SELECT d."commander", COUNT(d."commander") AS "occurrence" FROM "Decks" as d INNER JOIN "Events" as e on e."id" = d."eventId"  WHERE position IN ('1', '2', '3', '4') AND e."location" ILIKE :location AND e."date" ILIKE :date GROUP BY "commander" ORDER BY "occurrence" DESC;`,
            {
                replacements: {
                    location: `%${location}%`,
                    date: `%${date}%`,
                    initialDate: null,
                    finalDate: null,
                },
                type: Models.sequelize.QueryTypes.SELECT,
            }
        );

        expect(result).toEqual([
            { commander: "Ragavan", occurrence: 5 },
            { commander: "Leovold", occurrence: 3 },
            { commander: "Kykar", occurrence: 2 },
        ]);
    });
    it("returns the top 4 commanders by occurrence with location and date interval", async () => {
        const result = await eventRepository.getMostTop4Decks(
            location,
            null,
            initialDate,
            finalDate
        );

        expect(Models.sequelize.query).toHaveBeenCalledWith(
            `SELECT d."commander", COUNT(d."commander") AS "occurrence" FROM "Decks" as d INNER JOIN "Events" as e on e."id" = d."eventId"  WHERE position IN ('1', '2', '3', '4') AND e."location" ILIKE :location AND e.date BETWEEN :initialDate AND :finalDate GROUP BY "commander" ORDER BY "occurrence" DESC;`,
            {
                replacements: {
                    location: `%${location}%`,
                    date: `%${null}%`,
                    initialDate,
                    finalDate,
                },
                type: Models.sequelize.QueryTypes.SELECT,
            }
        );

        expect(result).toEqual([
            { commander: "Ragavan", occurrence: 5 },
            { commander: "Leovold", occurrence: 3 },
            { commander: "Kykar", occurrence: 2 },
        ]);
    });
});
