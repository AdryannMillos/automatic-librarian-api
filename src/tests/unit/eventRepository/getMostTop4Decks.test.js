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

describe("getMostTop4Decks", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    const limit = 10;
    const skip = 0;
    const location = "Teresina";
    const date = "2022";
    const initialDate = "2021-01-01";
    const finalDate = "2022-12-31";
    it("returns the top 4 commanders by occurrence with no params", async () => {
        const mockRows = [{ commander: "Golos", occurrence: 10 }];
        const mockCount = [{ count: 1 }];

        Models.sequelize.query
            .mockResolvedValueOnce(mockCount)
            .mockResolvedValueOnce(mockRows);

        const result = await eventRepository.getMostTop4Decks(
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
            `SELECT COUNT(*) FROM (SELECT d."commander", COUNT(d."commander") AS "occurrence" FROM "Decks" as d INNER JOIN "Events" as e on e."id" = d."eventId"  WHERE position IN ('1', '2', '3', '4') GROUP BY "commander" ORDER BY "occurrence" ) as count;`,
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

        expect(Models.sequelize.query).toHaveBeenCalledWith(
            `SELECT d."commander", COUNT(d."commander") AS "occurrence" FROM "Decks" as d INNER JOIN "Events" as e on e."id" = d."eventId"  WHERE position IN ('1', '2', '3', '4') GROUP BY "commander" ORDER BY "occurrence" DESC LIMIT ${limit} OFFSET ${skip}`,
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
    });
    it("returns the top 4 commanders by occurrence with location", async () => {
        const mockRows = [{ commander: "Golos", occurrence: 10 }];
        const mockCount = [{ count: 1 }];

        Models.sequelize.query
            .mockResolvedValueOnce(mockCount)
            .mockResolvedValueOnce(mockRows);

        const result = await eventRepository.getMostTop4Decks(
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
            `SELECT COUNT(*) FROM (SELECT d."commander", COUNT(d."commander") AS "occurrence" FROM "Decks" as d INNER JOIN "Events" as e on e."id" = d."eventId"  WHERE position IN ('1', '2', '3', '4') AND e."location" ILIKE :location GROUP BY "commander" ORDER BY "occurrence" ) as count;`,
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

        expect(Models.sequelize.query).toHaveBeenCalledWith(
            `SELECT d."commander", COUNT(d."commander") AS "occurrence" FROM "Decks" as d INNER JOIN "Events" as e on e."id" = d."eventId"  WHERE position IN ('1', '2', '3', '4') AND e."location" ILIKE :location GROUP BY "commander" ORDER BY "occurrence" DESC LIMIT ${limit} OFFSET ${skip}`,
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
    });
    it("returns the top 4 commanders by occurrence with date", async () => {
        const mockRows = [{ commander: "Golos", occurrence: 10 }];
        const mockCount = [{ count: 1 }];

        Models.sequelize.query
            .mockResolvedValueOnce(mockCount)
            .mockResolvedValueOnce(mockRows);

        const result = await eventRepository.getMostTop4Decks(
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
            `SELECT COUNT(*) FROM (SELECT d."commander", COUNT(d."commander") AS "occurrence" FROM "Decks" as d INNER JOIN "Events" as e on e."id" = d."eventId"  WHERE position IN ('1', '2', '3', '4') AND e."date" ILIKE :date GROUP BY "commander" ORDER BY "occurrence" ) as count;`,
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

        expect(Models.sequelize.query).toHaveBeenCalledWith(
            `SELECT d."commander", COUNT(d."commander") AS "occurrence" FROM "Decks" as d INNER JOIN "Events" as e on e."id" = d."eventId"  WHERE position IN ('1', '2', '3', '4') AND e."date" ILIKE :date GROUP BY "commander" ORDER BY "occurrence" DESC LIMIT ${limit} OFFSET ${skip}`,
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
    });
    it("returns the top 4 commanders by occurrence with date interval", async () => {
        const mockRows = [{ commander: "Golos", occurrence: 10 }];
        const mockCount = [{ count: 1 }];

        Models.sequelize.query
            .mockResolvedValueOnce(mockCount)
            .mockResolvedValueOnce(mockRows);

        const result = await eventRepository.getMostTop4Decks(
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
            `SELECT COUNT(*) FROM (SELECT d."commander", COUNT(d."commander") AS "occurrence" FROM "Decks" as d INNER JOIN "Events" as e on e."id" = d."eventId"  WHERE position IN ('1', '2', '3', '4') AND e.date BETWEEN :initialDate AND :finalDate GROUP BY "commander" ORDER BY "occurrence" ) as count;`,
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

        expect(Models.sequelize.query).toHaveBeenCalledWith(
            `SELECT d."commander", COUNT(d."commander") AS "occurrence" FROM "Decks" as d INNER JOIN "Events" as e on e."id" = d."eventId"  WHERE position IN ('1', '2', '3', '4') AND e.date BETWEEN :initialDate AND :finalDate GROUP BY "commander" ORDER BY "occurrence" DESC LIMIT ${limit} OFFSET ${skip}`,
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
    });
    it("returns the top 4 commanders by occurrence with location and date", async () => {
        const mockRows = [{ commander: "Golos", occurrence: 10 }];
        const mockCount = [{ count: 1 }];

        Models.sequelize.query
            .mockResolvedValueOnce(mockCount)
            .mockResolvedValueOnce(mockRows);

        const result = await eventRepository.getMostTop4Decks(
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
            `SELECT COUNT(*) FROM (SELECT d."commander", COUNT(d."commander") AS "occurrence" FROM "Decks" as d INNER JOIN "Events" as e on e."id" = d."eventId"  WHERE position IN ('1', '2', '3', '4') AND e."location" ILIKE :location AND e."date" ILIKE :date GROUP BY "commander" ORDER BY "occurrence" ) as count;`,
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

        expect(Models.sequelize.query).toHaveBeenCalledWith(
            `SELECT d."commander", COUNT(d."commander") AS "occurrence" FROM "Decks" as d INNER JOIN "Events" as e on e."id" = d."eventId"  WHERE position IN ('1', '2', '3', '4') AND e."location" ILIKE :location AND e."date" ILIKE :date GROUP BY "commander" ORDER BY "occurrence" DESC LIMIT ${limit} OFFSET ${skip}`,
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
    });
    it("returns the top 4 commanders by occurrence with location and date interval", async () => {
        const mockRows = [{ commander: "Golos", occurrence: 10 }];
        const mockCount = [{ count: 1 }];

        Models.sequelize.query
            .mockResolvedValueOnce(mockCount)
            .mockResolvedValueOnce(mockRows);

        const result = await eventRepository.getMostTop4Decks(
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
            `SELECT COUNT(*) FROM (SELECT d."commander", COUNT(d."commander") AS "occurrence" FROM "Decks" as d INNER JOIN "Events" as e on e."id" = d."eventId"  WHERE position IN ('1', '2', '3', '4') AND e."location" ILIKE :location AND e.date BETWEEN :initialDate AND :finalDate GROUP BY "commander" ORDER BY "occurrence" ) as count;`,
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

        expect(Models.sequelize.query).toHaveBeenCalledWith(
            `SELECT d."commander", COUNT(d."commander") AS "occurrence" FROM "Decks" as d INNER JOIN "Events" as e on e."id" = d."eventId"  WHERE position IN ('1', '2', '3', '4') AND e."location" ILIKE :location AND e.date BETWEEN :initialDate AND :finalDate GROUP BY "commander" ORDER BY "occurrence" DESC LIMIT ${limit} OFFSET ${skip}`,
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
    });
});
