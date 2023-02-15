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

describe("getMostPlayedDecks", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    const location = "Teresina";
    const date = "2022";
    const initialDate = "2021-01-01";
    const finalDate = "2022-12-31";
    it("should return the most played decks by occurrence with no params", async () => {
        const result = await eventRepository.getMostPlayedDecks(
            null,
            null,
            null,
            null
        );

        expect(Models.sequelize.query).toHaveBeenCalledWith(
            `SELECT "commander", COUNT("commander") AS "occurrence" FROM "Decks" as d INNER JOIN "Events" as e on e."id" = d."eventId"  GROUP BY "commander" ORDER BY "occurrence" DESC;`,
            {
                type: Models.sequelize.QueryTypes.SELECT,
            }
        );

        expect(result).toEqual([
            { commander: "Ragavan", occurrence: 5 },
            { commander: "Leovold", occurrence: 3 },
            { commander: "Kykar", occurrence: 2 },
        ]);
    });
    it("should return the most played decks by occurrence with location", async () => {
        const result = await eventRepository.getMostPlayedDecks(
            location,
            null,
            null,
            null
        );

        expect(Models.sequelize.query).toHaveBeenCalledWith(
            `SELECT "commander", COUNT("commander") AS "occurrence" FROM "Decks" as d INNER JOIN "Events" as e on e."id" = d."eventId"  WHERE e."location" ILIKE '%${location}%' GROUP BY "commander" ORDER BY "occurrence" DESC;`,
            {
                // replacements: {
                //     location,
                //     date: null,
                //     initialDate: null,
                //     finalDate: null,
                // },
                type: Models.sequelize.QueryTypes.SELECT,
            }
        );

        expect(result).toEqual([
            { commander: "Ragavan", occurrence: 5 },
            { commander: "Leovold", occurrence: 3 },
            { commander: "Kykar", occurrence: 2 },
        ]);
    });
    it("should return the most played decks by occurrence with date", async () => {
        const result = await eventRepository.getMostPlayedDecks(
            null,
            date,
            null,
            null
        );

        expect(Models.sequelize.query).toHaveBeenCalledWith(
            `SELECT "commander", COUNT("commander") AS "occurrence" FROM "Decks" as d INNER JOIN "Events" as e on e."id" = d."eventId"  WHERE e."date" ILIKE '%${date}%' GROUP BY "commander" ORDER BY "occurrence" DESC;`,
            {
                // replacements: {
                //     location,
                //     date: null,
                //     initialDate: null,
                //     finalDate: null,
                // },
                type: Models.sequelize.QueryTypes.SELECT,
            }
        );

        expect(result).toEqual([
            { commander: "Ragavan", occurrence: 5 },
            { commander: "Leovold", occurrence: 3 },
            { commander: "Kykar", occurrence: 2 },
        ]);
    });
    it("should return the most played decks by occurrence with date interval", async () => {
        const result = await eventRepository.getMostPlayedDecks(
            null,
            null,
            initialDate,
            finalDate
        );

        expect(Models.sequelize.query).toHaveBeenCalledWith(
            `SELECT "commander", COUNT("commander") AS "occurrence" FROM "Decks" as d INNER JOIN "Events" as e on e."id" = d."eventId"  WHERE e.date BETWEEN '%${initialDate}%' AND '%${finalDate}%' GROUP BY "commander" ORDER BY "occurrence" DESC;`,
            {
                // replacements: {
                //     location,
                //     date: null,
                //     initialDate: null,
                //     finalDate: null,
                // },
                type: Models.sequelize.QueryTypes.SELECT,
            }
        );

        expect(result).toEqual([
            { commander: "Ragavan", occurrence: 5 },
            { commander: "Leovold", occurrence: 3 },
            { commander: "Kykar", occurrence: 2 },
        ]);
    });
    it("should return the most played decks by occurrence with location date", async () => {
        const result = await eventRepository.getMostPlayedDecks(
            location,
            date,
            null,
            null
        );

        expect(Models.sequelize.query).toHaveBeenCalledWith(
            `SELECT "commander", COUNT("commander") AS "occurrence" FROM "Decks" as d INNER JOIN "Events" as e on e."id" = d."eventId"  WHERE e."location" ILIKE '%${location}%' AND e."date" ILIKE '%${date}%' GROUP BY "commander" ORDER BY "occurrence" DESC;`,
            {
                // replacements: {
                //     location,
                //     date: null,
                //     initialDate: null,
                //     finalDate: null,
                // },
                type: Models.sequelize.QueryTypes.SELECT,
            }
        );

        expect(result).toEqual([
            { commander: "Ragavan", occurrence: 5 },
            { commander: "Leovold", occurrence: 3 },
            { commander: "Kykar", occurrence: 2 },
        ]);
    });
    it("should return the most played decks by occurrence with location date", async () => {
        const result = await eventRepository.getMostPlayedDecks(
            location,
            null,
            initialDate,
            finalDate
        );

        expect(Models.sequelize.query).toHaveBeenCalledWith(
            `SELECT "commander", COUNT("commander") AS "occurrence" FROM "Decks" as d INNER JOIN "Events" as e on e."id" = d."eventId"  WHERE e."location" ILIKE '%${location}%' AND e.date BETWEEN '%${initialDate}%' AND '%${finalDate}%' GROUP BY "commander" ORDER BY "occurrence" DESC;`,
            {
                // replacements: {
                //     location,
                //     date: null,
                //     initialDate: null,
                //     finalDate: null,
                // },
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
