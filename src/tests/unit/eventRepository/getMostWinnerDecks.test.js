const Models = require("../../../models/index");
const eventRepository = require("../../../repositories/eventRepository");

jest.mock("../../../models/index", () => ({
    sequelize: {
        query: jest.fn(),
        QueryTypes: {
            SELECT: "SELECT",
        },
    },
}));

describe("getMostWinnerDecks", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    const limit = 10;
    const skip = 0;
    const location = "Teresina";
    const date = "2022";
    const initialDate = "2021-01-01";
    const finalDate = "2022-12-31";
    it("should return the most winner decks by occurrence with no params", async () => {
        const mockRows = [{ commander: "Golos", occurrence: 10 }];
        const mockCount = [{ count: 1 }];

        Models.sequelize.query
            .mockResolvedValueOnce(mockCount)
            .mockResolvedValueOnce(mockRows);

        const result = await eventRepository.getMostWinnerDecks(
            limit,
            skip,
            null,
            null,
            null,
            null
        );

        expect(result.rows).toEqual(mockRows);
        expect(result.count).toEqual(mockCount[0].count);

        expect(Models.sequelize.query).toHaveBeenCalledTimes(2);

        expect(Models.sequelize.query).toHaveBeenCalledWith(
            `SELECT COUNT(*) FROM (SELECT d."commander", COUNT(d."commander") AS "occurrence" FROM "Decks" as d INNER JOIN "Events" as e ON e."id" = d."eventId" AND "position" = '1' GROUP BY "commander" ORDER BY "occurrence" ) as count;`,
            {
                replacements: {},
                type: Models.sequelize.QueryTypes.SELECT,
            }
        );

        expect(Models.sequelize.query).toHaveBeenCalledWith(
            `SELECT d."commander", COUNT(d."commander") AS "occurrence" FROM "Decks" as d INNER JOIN "Events" as e ON e."id" = d."eventId" AND "position" = '1' GROUP BY "commander" ORDER BY "occurrence" DESC LIMIT ${limit} OFFSET ${skip}`,
            {
                replacements: {},
                type: Models.sequelize.QueryTypes.SELECT,
            }
        );
    });
    it("should return the most winner decks by occurrence with location", async () => {
        const mockRows = [{ commander: "Golos", occurrence: 10 }];
        const mockCount = [{ count: 1 }];

        Models.sequelize.query
            .mockResolvedValueOnce(mockCount)
            .mockResolvedValueOnce(mockRows);

        const result = await eventRepository.getMostWinnerDecks(
            limit,
            skip,
            location,
            null,
            null,
            null
        );

        expect(result.rows).toEqual(mockRows);
        expect(result.count).toEqual(mockCount[0].count);

        expect(Models.sequelize.query).toHaveBeenCalledTimes(2);

        expect(Models.sequelize.query).toHaveBeenCalledWith(
            `SELECT COUNT(*) FROM (SELECT d."commander", COUNT(d."commander") AS "occurrence" FROM "Decks" as d INNER JOIN "Events" as e ON e."id" = d."eventId" AND "position" = '1' WHERE e."location" ILIKE :location GROUP BY "commander" ORDER BY "occurrence" ) as count;`,
            {
                replacements: { location: `%${location}%` },
                type: Models.sequelize.QueryTypes.SELECT,
            }
        );

        expect(Models.sequelize.query).toHaveBeenCalledWith(
            `SELECT d."commander", COUNT(d."commander") AS "occurrence" FROM "Decks" as d INNER JOIN "Events" as e ON e."id" = d."eventId" AND "position" = '1' WHERE e."location" ILIKE :location GROUP BY "commander" ORDER BY "occurrence" DESC LIMIT ${limit} OFFSET ${skip}`,
            {
                replacements: { location: `%${location}%` },
                type: Models.sequelize.QueryTypes.SELECT,
            }
        );
    });
    it("should return the most winner decks by occurrence with date", async () => {
        const mockRows = [{ commander: "Golos", occurrence: 10 }];
        const mockCount = [{ count: 1 }];

        Models.sequelize.query
            .mockResolvedValueOnce(mockCount)
            .mockResolvedValueOnce(mockRows);

        const result = await eventRepository.getMostWinnerDecks(
            limit,
            skip,
            null,
            date,
            null,
            null
        );

        expect(result.rows).toEqual(mockRows);
        expect(result.count).toEqual(mockCount[0].count);

        expect(Models.sequelize.query).toHaveBeenCalledTimes(2);

        expect(Models.sequelize.query).toHaveBeenCalledWith(
            `SELECT COUNT(*) FROM (SELECT d."commander", COUNT(d."commander") AS "occurrence" FROM "Decks" as d INNER JOIN "Events" as e ON e."id" = d."eventId" AND "position" = '1' WHERE e."date" ILIKE :date GROUP BY "commander" ORDER BY "occurrence" ) as count;`,
            {
                replacements: { date: `%${date}%` },
                type: Models.sequelize.QueryTypes.SELECT,
            }
        );

        expect(Models.sequelize.query).toHaveBeenCalledWith(
            `SELECT d."commander", COUNT(d."commander") AS "occurrence" FROM "Decks" as d INNER JOIN "Events" as e ON e."id" = d."eventId" AND "position" = '1' WHERE e."date" ILIKE :date GROUP BY "commander" ORDER BY "occurrence" DESC LIMIT ${limit} OFFSET ${skip}`,
            {
                replacements: { date: `%${date}%` },
                type: Models.sequelize.QueryTypes.SELECT,
            }
        );
    });
    it("should return the most winner decks by occurrence with date interval", async () => {
        const mockRows = [{ commander: "Golos", occurrence: 10 }];
        const mockCount = [{ count: 1 }];

        Models.sequelize.query
            .mockResolvedValueOnce(mockCount)
            .mockResolvedValueOnce(mockRows);

        const result = await eventRepository.getMostWinnerDecks(
            limit,
            skip,
            null,
            null,
            initialDate,
            finalDate
        );

        expect(result.rows).toEqual(mockRows);
        expect(result.count).toEqual(mockCount[0].count);

        expect(Models.sequelize.query).toHaveBeenCalledTimes(2);

        expect(Models.sequelize.query).toHaveBeenCalledWith(
            `SELECT COUNT(*) FROM (SELECT d."commander", COUNT(d."commander") AS "occurrence" FROM "Decks" as d INNER JOIN "Events" as e ON e."id" = d."eventId" AND "position" = '1' WHERE e.date BETWEEN :initialDate AND :finalDate GROUP BY "commander" ORDER BY "occurrence" ) as count;`,
            {
                replacements: { initialDate, finalDate },
                type: Models.sequelize.QueryTypes.SELECT,
            }
        );

        expect(Models.sequelize.query).toHaveBeenCalledWith(
            `SELECT d."commander", COUNT(d."commander") AS "occurrence" FROM "Decks" as d INNER JOIN "Events" as e ON e."id" = d."eventId" AND "position" = '1' WHERE e.date BETWEEN :initialDate AND :finalDate GROUP BY "commander" ORDER BY "occurrence" DESC LIMIT ${limit} OFFSET ${skip}`,
            {
                replacements: { initialDate, finalDate },
                type: Models.sequelize.QueryTypes.SELECT,
            }
        );
    });
    it("should return the most winner decks by occurrence with location and date", async () => {
        const mockRows = [{ commander: "Golos", occurrence: 10 }];
        const mockCount = [{ count: 1 }];

        Models.sequelize.query
            .mockResolvedValueOnce(mockCount)
            .mockResolvedValueOnce(mockRows);

        const result = await eventRepository.getMostWinnerDecks(
            limit,
            skip,
            location,
            date,
            null,
            null
        );

        expect(result.rows).toEqual(mockRows);
        expect(result.count).toEqual(mockCount[0].count);

        expect(Models.sequelize.query).toHaveBeenCalledTimes(2);

        expect(Models.sequelize.query).toHaveBeenCalledWith(
            `SELECT COUNT(*) FROM (SELECT d."commander", COUNT(d."commander") AS "occurrence" FROM "Decks" as d INNER JOIN "Events" as e ON e."id" = d."eventId" AND "position" = '1' WHERE e."location" ILIKE :location AND e."date" ILIKE :date GROUP BY "commander" ORDER BY "occurrence" ) as count;`,
            {
                replacements: { location: `%${location}%`, date: `%${date}%` },
                type: Models.sequelize.QueryTypes.SELECT,
            }
        );

        expect(Models.sequelize.query).toHaveBeenCalledWith(
            `SELECT d."commander", COUNT(d."commander") AS "occurrence" FROM "Decks" as d INNER JOIN "Events" as e ON e."id" = d."eventId" AND "position" = '1' WHERE e."location" ILIKE :location AND e."date" ILIKE :date GROUP BY "commander" ORDER BY "occurrence" DESC LIMIT ${limit} OFFSET ${skip}`,
            {
                replacements: { location: `%${location}%`, date: `%${date}%` },
                type: Models.sequelize.QueryTypes.SELECT,
            }
        );
    });
    it("should return the most winner decks by occurrence with location and date interval", async () => {
        const mockRows = [{ commander: "Golos", occurrence: 10 }];
        const mockCount = [{ count: 1 }];

        Models.sequelize.query
            .mockResolvedValueOnce(mockCount)
            .mockResolvedValueOnce(mockRows);

        const result = await eventRepository.getMostWinnerDecks(
            limit,
            skip,
            location,
            null,
            initialDate,
            finalDate
        );

        expect(result.rows).toEqual(mockRows);
        expect(result.count).toEqual(mockCount[0].count);

        expect(Models.sequelize.query).toHaveBeenCalledTimes(2);

        expect(Models.sequelize.query).toHaveBeenCalledWith(
            `SELECT COUNT(*) FROM (SELECT d."commander", COUNT(d."commander") AS "occurrence" FROM "Decks" as d INNER JOIN "Events" as e ON e."id" = d."eventId" AND "position" = '1' WHERE e."location" ILIKE :location AND e.date BETWEEN :initialDate AND :finalDate GROUP BY "commander" ORDER BY "occurrence" ) as count;`,
            {
                replacements: {
                    location: `%${location}%`,
                    initialDate,
                    finalDate,
                },
                type: Models.sequelize.QueryTypes.SELECT,
            }
        );

        expect(Models.sequelize.query).toHaveBeenCalledWith(
            `SELECT d."commander", COUNT(d."commander") AS "occurrence" FROM "Decks" as d INNER JOIN "Events" as e ON e."id" = d."eventId" AND "position" = '1' WHERE e."location" ILIKE :location AND e.date BETWEEN :initialDate AND :finalDate GROUP BY "commander" ORDER BY "occurrence" DESC LIMIT ${limit} OFFSET ${skip}`,
            {
                replacements: {
                    location: `%${location}%`,
                    initialDate,
                    finalDate,
                },
                type: Models.sequelize.QueryTypes.SELECT,
            }
        );
    });
});
