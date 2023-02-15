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

describe("getMostWinnerDecks", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    const location = "Teresina";
    const date = "2022";
    const initialDate = "2021-01-01";
    const finalDate = "2022-12-31";
    it("should return the most winner decks by occurrence with no params", async () => {
        const result = await eventRepository.getMostWinnerDecks(
            null,
            null,
            null,
            null
        );

        expect(Models.sequelize.query).toHaveBeenCalledWith(
            `SELECT d."commander", COUNT(d."commander") AS "occurrence" FROM "Decks" as d INNER JOIN "Events" as e ON e."id" = d."eventId" AND "position" = '1' GROUP BY "commander" ORDER BY "occurrence" DESC;`,
            {
                replacements: {},
                // location: `%${location}%`,
                //     date: `%${date}%`,
                //     initialDate,
                //     finalDate,
                type: Models.sequelize.QueryTypes.SELECT,
            }
        );

        expect(result).toEqual([
            { commander: "Ragavan", occurrence: 5 },
            { commander: "Leovold", occurrence: 3 },
            { commander: "Kykar", occurrence: 2 },
        ]);
    });
    it("should return the most winner decks by occurrence with location", async () => {
        const result = await eventRepository.getMostWinnerDecks(
            location,
            null,
            null,
            null
        );

        expect(Models.sequelize.query).toHaveBeenCalledWith(
            `SELECT d."commander", COUNT(d."commander") AS "occurrence" FROM "Decks" as d INNER JOIN "Events" as e ON e."id" = d."eventId" AND "position" = '1' WHERE e."location" ILIKE :location GROUP BY "commander" ORDER BY "occurrence" DESC;`,
            {
                replacements: { location: `%${location}%` },
                type: Models.sequelize.QueryTypes.SELECT,
            }
        );

        expect(result).toEqual([
            { commander: "Ragavan", occurrence: 5 },
            { commander: "Leovold", occurrence: 3 },
            { commander: "Kykar", occurrence: 2 },
        ]);
    });
    it("should return the most winner decks by occurrence with date", async () => {
        const result = await eventRepository.getMostWinnerDecks(
            null,
            date,
            null,
            null
        );

        expect(Models.sequelize.query).toHaveBeenCalledWith(
            `SELECT d."commander", COUNT(d."commander") AS "occurrence" FROM "Decks" as d INNER JOIN "Events" as e ON e."id" = d."eventId" AND "position" = '1' WHERE e."date" ILIKE :date GROUP BY "commander" ORDER BY "occurrence" DESC;`,
            {
                replacements: { date: `%${date}%` },
                type: Models.sequelize.QueryTypes.SELECT,
            }
        );

        expect(result).toEqual([
            { commander: "Ragavan", occurrence: 5 },
            { commander: "Leovold", occurrence: 3 },
            { commander: "Kykar", occurrence: 2 },
        ]);
    });
    it("should return the most winner decks by occurrence with date interval", async () => {
        const result = await eventRepository.getMostWinnerDecks(
            null,
            null,
            initialDate,
            finalDate
        );

        expect(Models.sequelize.query).toHaveBeenCalledWith(
            `SELECT d."commander", COUNT(d."commander") AS "occurrence" FROM "Decks" as d INNER JOIN "Events" as e ON e."id" = d."eventId" AND "position" = '1' WHERE e.date BETWEEN :initialDate AND :finalDate GROUP BY "commander" ORDER BY "occurrence" DESC;`,
            {
                replacements: { initialDate, finalDate },
                type: Models.sequelize.QueryTypes.SELECT,
            }
        );

        expect(result).toEqual([
            { commander: "Ragavan", occurrence: 5 },
            { commander: "Leovold", occurrence: 3 },
            { commander: "Kykar", occurrence: 2 },
        ]);
    });
    it("should return the most winner decks by occurrence with location and date", async () => {
        const result = await eventRepository.getMostWinnerDecks(
            location,
            date,
            null,
            null
        );

        expect(Models.sequelize.query).toHaveBeenCalledWith(
            `SELECT d."commander", COUNT(d."commander") AS "occurrence" FROM "Decks" as d INNER JOIN "Events" as e ON e."id" = d."eventId" AND "position" = '1' WHERE e."location" ILIKE :location AND e."date" ILIKE :date GROUP BY "commander" ORDER BY "occurrence" DESC;`,
            {
                replacements: { location: `%${location}%`, date: `%${date}%` },
                type: Models.sequelize.QueryTypes.SELECT,
            }
        );

        expect(result).toEqual([
            { commander: "Ragavan", occurrence: 5 },
            { commander: "Leovold", occurrence: 3 },
            { commander: "Kykar", occurrence: 2 },
        ]);
    });
    it("should return the most winner decks by occurrence with location and date interval", async () => {
        const result = await eventRepository.getMostWinnerDecks(
            location,
            null,
            initialDate,
            finalDate
        );

        expect(Models.sequelize.query).toHaveBeenCalledWith(
            `SELECT d."commander", COUNT(d."commander") AS "occurrence" FROM "Decks" as d INNER JOIN "Events" as e ON e."id" = d."eventId" AND "position" = '1' WHERE e."location" ILIKE :location AND e.date BETWEEN :initialDate AND :finalDate GROUP BY "commander" ORDER BY "occurrence" DESC;`,
            {
                replacements: {
                    location: `%${location}%`,
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
