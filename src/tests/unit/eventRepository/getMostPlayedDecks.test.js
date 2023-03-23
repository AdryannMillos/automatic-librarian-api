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

describe("getMostPlayedDecks", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    const location = "Teresina";
    const date = "2022";
    const initialDate = "2021-01-01";
    const finalDate = "2022-12-31";
    const limit = 10;
    const skip = 0;
    it("should return the most played decks by occurrence with no params", async () => {
        const mockRows = [{ commander: "Golos", occurrence: 10 }];
        const mockCount = [{ count: 1 }];

        Models.sequelize.query
            .mockResolvedValueOnce(mockCount)
            .mockResolvedValueOnce(mockRows);

        const result = await eventRepository.getMostPlayedDecks(
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
            `SELECT COUNT(*) FROM (SELECT "commander", COUNT("commander") AS "occurrence" FROM "Decks" as d INNER JOIN "Events" as e on e."id" = d."eventId"  GROUP BY "commander" ORDER BY "occurrence" ) as count;`,
            {
                type: Models.sequelize.QueryTypes.SELECT,
            }
        );

        expect(Models.sequelize.query).toHaveBeenCalledWith(
            `SELECT "commander", COUNT("commander") AS "occurrence" FROM "Decks" as d INNER JOIN "Events" as e on e."id" = d."eventId"  GROUP BY "commander" ORDER BY "occurrence" DESC LIMIT ${limit} OFFSET ${skip}`,
            {
                type: Models.sequelize.QueryTypes.SELECT,
            }
        );
    });
    it("should return the most played decks by occurrence with location", async () => {
        const mockRows = [{ commander: "Golos", occurrence: 10 }];
        const mockCount = [{ count: 1 }];

        Models.sequelize.query
            .mockResolvedValueOnce(mockCount)
            .mockResolvedValueOnce(mockRows);

        const result = await eventRepository.getMostPlayedDecks(
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
            `SELECT COUNT(*) FROM (SELECT "commander", COUNT("commander") AS "occurrence" FROM "Decks" as d INNER JOIN "Events" as e on e."id" = d."eventId"  WHERE e."location" ILIKE '%${location}%' GROUP BY "commander" ORDER BY "occurrence" ) as count;`,
            {
                type: Models.sequelize.QueryTypes.SELECT,
            }
        );

        expect(Models.sequelize.query).toHaveBeenCalledWith(
            `SELECT "commander", COUNT("commander") AS "occurrence" FROM "Decks" as d INNER JOIN "Events" as e on e."id" = d."eventId"  WHERE e."location" ILIKE '%${location}%' GROUP BY "commander" ORDER BY "occurrence" DESC LIMIT ${limit} OFFSET ${skip}`,
            {
                type: Models.sequelize.QueryTypes.SELECT,
            }
        );
    });
    it("should return the most played decks by occurrence with date", async () => {
        const mockRows = [{ commander: "Golos", occurrence: 10 }];
        const mockCount = [{ count: 1 }];

        Models.sequelize.query
            .mockResolvedValueOnce(mockCount)
            .mockResolvedValueOnce(mockRows);

        const result = await eventRepository.getMostPlayedDecks(
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
            `SELECT COUNT(*) FROM (SELECT "commander", COUNT("commander") AS "occurrence" FROM "Decks" as d INNER JOIN "Events" as e on e."id" = d."eventId"  WHERE e."date" ILIKE '%${date}%' GROUP BY "commander" ORDER BY "occurrence" ) as count;`,
            {
                type: Models.sequelize.QueryTypes.SELECT,
            }
        );

        expect(Models.sequelize.query).toHaveBeenCalledWith(
            `SELECT "commander", COUNT("commander") AS "occurrence" FROM "Decks" as d INNER JOIN "Events" as e on e."id" = d."eventId"  WHERE e."date" ILIKE '%${date}%' GROUP BY "commander" ORDER BY "occurrence" DESC LIMIT ${limit} OFFSET ${skip}`,
            {
                type: Models.sequelize.QueryTypes.SELECT,
            }
        );
    });
    it("should return the most played decks by occurrence with date interval", async () => {
        const mockRows = [{ commander: "Golos", occurrence: 10 }];
        const mockCount = [{ count: 1 }];

        Models.sequelize.query
            .mockResolvedValueOnce(mockCount)
            .mockResolvedValueOnce(mockRows);

        const result = await eventRepository.getMostPlayedDecks(
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
            `SELECT COUNT(*) FROM (SELECT "commander", COUNT("commander") AS "occurrence" FROM "Decks" as d INNER JOIN "Events" as e on e."id" = d."eventId"  WHERE e.date BETWEEN '%${initialDate}%' AND '%${finalDate}%' GROUP BY "commander" ORDER BY "occurrence" ) as count;`,
            {
                type: Models.sequelize.QueryTypes.SELECT,
            }
        );

        expect(Models.sequelize.query).toHaveBeenCalledWith(
            `SELECT "commander", COUNT("commander") AS "occurrence" FROM "Decks" as d INNER JOIN "Events" as e on e."id" = d."eventId"  WHERE e.date BETWEEN '%${initialDate}%' AND '%${finalDate}%' GROUP BY "commander" ORDER BY "occurrence" DESC LIMIT ${limit} OFFSET ${skip}`,
            {
                type: Models.sequelize.QueryTypes.SELECT,
            }
        );
    });
    it("should return the most played decks by occurrence with location date", async () => {
        const mockRows = [{ commander: "Golos", occurrence: 10 }];
        const mockCount = [{ count: 1 }];

        Models.sequelize.query
            .mockResolvedValueOnce(mockCount)
            .mockResolvedValueOnce(mockRows);

        const result = await eventRepository.getMostPlayedDecks(
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
            `SELECT COUNT(*) FROM (SELECT "commander", COUNT("commander") AS "occurrence" FROM "Decks" as d INNER JOIN "Events" as e on e."id" = d."eventId"  WHERE e."location" ILIKE '%${location}%' AND e."date" ILIKE '%${date}%' GROUP BY "commander" ORDER BY "occurrence" ) as count;`,
            {
                type: Models.sequelize.QueryTypes.SELECT,
            }
        );

        expect(Models.sequelize.query).toHaveBeenCalledWith(
            `SELECT "commander", COUNT("commander") AS "occurrence" FROM "Decks" as d INNER JOIN "Events" as e on e."id" = d."eventId"  WHERE e."location" ILIKE '%${location}%' AND e."date" ILIKE '%${date}%' GROUP BY "commander" ORDER BY "occurrence" DESC LIMIT ${limit} OFFSET ${skip}`,
            {
                type: Models.sequelize.QueryTypes.SELECT,
            }
        );
    });
    it("should return the most played decks by occurrence with location and interval", async () => {
        const mockRows = [{ commander: "Golos", occurrence: 10 }];
        const mockCount = [{ count: 1 }];

        Models.sequelize.query
            .mockResolvedValueOnce(mockCount)
            .mockResolvedValueOnce(mockRows);

        const result = await eventRepository.getMostPlayedDecks(
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
            `SELECT COUNT(*) FROM (SELECT "commander", COUNT("commander") AS "occurrence" FROM "Decks" as d INNER JOIN "Events" as e on e."id" = d."eventId"  WHERE e."location" ILIKE '%${location}%' AND e.date BETWEEN '%${initialDate}%' AND '%${finalDate}%' GROUP BY "commander" ORDER BY "occurrence" ) as count;`,
            {
                type: Models.sequelize.QueryTypes.SELECT,
            }
        );

        expect(Models.sequelize.query).toHaveBeenCalledWith(
            `SELECT "commander", COUNT("commander") AS "occurrence" FROM "Decks" as d INNER JOIN "Events" as e on e."id" = d."eventId"  WHERE e."location" ILIKE '%${location}%' AND e.date BETWEEN '%${initialDate}%' AND '%${finalDate}%' GROUP BY "commander" ORDER BY "occurrence" DESC LIMIT ${limit} OFFSET ${skip}`,
            {
                type: Models.sequelize.QueryTypes.SELECT,
            }
        );
    });
});
