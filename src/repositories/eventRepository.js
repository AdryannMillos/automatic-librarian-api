const Sequelize = require("sequelize");
const Models = require("../models/index");

const { Op } = Sequelize;

const findAll = async () => Models.Event.findAll();
const getAllEventsPaginated = async (
    limit,
    skip,
    location,
    date,
    initialDate,
    finalDate
) => {
    if (!location && !date) {
        const { count, rows } = await Models.Event.findAndCountAll({
            ...(initialDate &&
                finalDate && {
                    where: { date: { [Op.between]: [initialDate, finalDate] } },
                }),
            include: ["decks"],
            limit,
            offset: skip,
            distinct: true,
            order: [["date", "DESC"]],
        });

        return { count, rows };
    }
    if (!location && date) {
        const { count, rows } = await Models.Event.findAndCountAll({
            where: { date: { [Op.iLike]: `%${date}%` } },
            include: ["decks"],
            limit,
            offset: skip,
            distinct: true,
            order: [["date", "DESC"]],
        });
        return { count, rows };
    }
    if (location && !date) {
        const { count, rows } = await Models.Event.findAndCountAll({
            where: {
                location: { [Op.iLike]: `%${location}%` },
                ...(initialDate &&
                    finalDate && {
                        date: { [Op.between]: [initialDate, finalDate] },
                    }),
            },
            include: ["decks"],
            limit,
            offset: skip,
            distinct: true,
            order: [["date", "DESC"]],
        });
        return { count, rows };
    }
    if (location && date) {
        const { count, rows } = await Models.Event.findAndCountAll({
            where: {
                location: { [Op.iLike]: `%${location}%` },
                date: { [Op.iLike]: `%${date}%` },
            },
            include: ["decks"],
            limit,
            offset: skip,
            distinct: true,
            order: [["date", "DESC"]],
        });
        return { count, rows };
    }
};
const getCommanderPaginated = async (
    limit,
    skip,
    location,
    date,
    commander,
    initialDate,
    finalDate
) => {
    if (!location && !date) {
        const { count, rows } = await Models.Deck.findAndCountAll({
            where: {
                commander: { [Op.iLike]: `%${commander}%` },
                ...(initialDate &&
                    finalDate && {
                        date: { [Op.between]: [initialDate, finalDate] },
                    }),
            },
            include: ["event"],
            limit,
            offset: skip,
            distinct: true,
            order: [["id", "DESC"]],
        });
        return { count, rows };
    }
    if (!location && date) {
        const { count, rows } = await Models.Deck.findAndCountAll({
            where: {
                commander: { [Op.iLike]: `%${commander}%` },
                "$event.date$": { [Op.iLike]: `%${date}%` },
            },
            include: ["event"],
            limit,
            offset: skip,
            distinct: true,
            order: [["id", "DESC"]],
        });
        return { count, rows };
    }
    if (location && !date) {
        const { count, rows } = await Models.Deck.findAndCountAll({
            where: {
                commander: { [Op.iLike]: `%${commander}%` },
                "$event.location$": { [Op.iLike]: `%${location}%` },
                ...(initialDate &&
                    finalDate && {
                        "$event.date$": {
                            [Op.between]: [initialDate, finalDate],
                        },
                    }),
            },
            include: ["event"],
            limit,
            offset: skip,
            distinct: true,
            order: [["id", "DESC"]],
        });
        return { count, rows };
    }
    if (location && date) {
        const { count, rows } = await Models.Deck.findAndCountAll({
            where: {
                commander: { [Op.iLike]: `%${commander}%` },
                "$event.date$": { [Op.iLike]: `%${date}%` },
                "$event.location$": { [Op.iLike]: `%${location}%` },
            },
            include: ["event"],
            limit,
            offset: skip,
            distinct: true,
            order: [["id", "DESC"]],
        });
        return { count, rows };
    }
};

async function getMostWinnerDecks(location, date, initialDate, finalDate) {
    if (!location && !date && !initialDate && !finalDate) {
        return await Models.sequelize.query(
            `SELECT d."commander", COUNT(d."commander") AS "occurrence" FROM "Decks" as d inner JOIN "Events" as e on  e."id" =  d."eventId" and "position" = '1' GROUP BY "commander" ORDER BY "occurrence" DESC;`,
            {
                type: Models.sequelize.QueryTypes.SELECT,
            },
            { where: { id: "1" } }
        );
    }
    if (!location && !date && initialDate && finalDate) {
        return await Models.sequelize.query(
            `SELECT d."commander", COUNT(d."commander") AS "occurrence" FROM "Decks" as d inner JOIN "Events" as e on  e."id" =  d."eventId" and "position" = '1' WHERE e.date BETWEEN '${initialDate}' AND '${finalDate}' GROUP BY "commander" ORDER BY "occurrence" DESC;`,
            {
                type: Models.sequelize.QueryTypes.SELECT,
            },
            { where: { id: "1" } }
        );
    }
    if (location && !date && !initialDate && !finalDate) {
        return await Models.sequelize.query(
            `SELECT d."commander", COUNT(d."commander") AS "occurrence" FROM "Decks" as d inner JOIN "Events" as e on  e."id" =  d."eventId" and e."location" ilike '%${location}%' and "position" = '1'  GROUP BY "commander" ORDER BY "occurrence" DESC;`,
            {
                type: Models.sequelize.QueryTypes.SELECT,
            }
        );
    }
    if (location && !date && initialDate && finalDate) {
        return await Models.sequelize.query(
            `SELECT d."commander", COUNT(d."commander") AS "occurrence" FROM "Decks" as d inner JOIN "Events" as e on  e."id" =  d."eventId" and e."location" ilike '%${location}%' and "position" = '1' WHERE e.date BETWEEN '${initialDate}' AND '${finalDate}' GROUP BY "commander" ORDER BY "occurrence" DESC;`,
            {
                type: Models.sequelize.QueryTypes.SELECT,
            }
        );
    }
    if (!location && date) {
        return await Models.sequelize.query(
            `SELECT d."commander", COUNT(d."commander") AS "occurrence" FROM "Decks" as d inner JOIN "Events" as e on  e."id" =  d."eventId" and  e."date" ilike '%${date}%' and "position" = '1' GROUP BY "commander" ORDER BY "occurrence" DESC;`,
            {
                type: Models.sequelize.QueryTypes.SELECT,
            }
        );
    }
    if (location && date) {
        return await Models.sequelize.query(
            `SELECT d."commander", COUNT(d."commander") AS "occurrence" FROM "Decks" as d inner JOIN "Events" as e on  e."id" =  d."eventId" and  e."date" ilike '%${date}%' and e."location" ilike '%${location}%' and "position" = '1'  GROUP BY "commander" ORDER BY "occurrence" DESC;`,
            {
                type: Models.sequelize.QueryTypes.SELECT,
            }
        );
    }
}

async function getMostTop4Decks(location, date, initialDate, finalDate) {
    if (!location && !date && !initialDate && !finalDate) {
        return await Models.sequelize.query(
            `SELECT d."commander", COUNT(d."commander") AS "occurrence" FROM "Decks" as d inner JOIN "Events" as e on  e."id" =  d."eventId" and ("position" = '1' or "position" = '2' or "position" = '3' or "position" = '4')  GROUP BY "commander" ORDER BY "occurrence" DESC;`,
            {
                type: Models.sequelize.QueryTypes.SELECT,
            }
        );
    }

    if (!location && !date && initialDate && finalDate) {
        return await Models.sequelize.query(
            `SELECT d."commander", COUNT(d."commander") AS "occurrence" FROM "Decks" as d inner JOIN "Events" as e on  e."id" =  d."eventId" and ("position" = '1' or "position" = '2' or "position" = '3' or "position" = '4')  WHERE e.date BETWEEN '${initialDate}' AND '${finalDate}'  GROUP BY "commander" ORDER BY "occurrence" DESC;`,
            {
                type: Models.sequelize.QueryTypes.SELECT,
            }
        );
    }

    if (location && !date && !initialDate && !finalDate) {
        return await Models.sequelize.query(
            `SELECT d."commander", COUNT(d."commander") AS "occurrence" FROM "Decks" as d inner JOIN "Events" as e on  e."id" =  d."eventId" and e."location" ilike '%${location}%' and ("position" = '1' or "position" = '2' or "position" = '3' or "position" = '4')  GROUP BY "commander" ORDER BY "occurrence" DESC;`,
            {
                type: Models.sequelize.QueryTypes.SELECT,
            }
        );
    }

    if (location && !date && initialDate && finalDate) {
        return await Models.sequelize.query(
            `SELECT d."commander", COUNT(d."commander") AS "occurrence" FROM "Decks" as d inner JOIN "Events" as e on  e."id" =  d."eventId" and e."location" ilike '%${location}%' and ("position" = '1' or "position" = '2' or "position" = '3' or "position" = '4') WHERE e.date BETWEEN '${initialDate}' AND '${finalDate}' GROUP BY "commander" ORDER BY "occurrence" DESC;`,
            {
                type: Models.sequelize.QueryTypes.SELECT,
            }
        );
    }

    if (!location && date) {
        return await Models.sequelize.query(
            `SELECT d."commander", COUNT(d."commander") AS "occurrence" FROM "Decks" as d inner JOIN "Events" as e on  e."id" =  d."eventId" and  e."date" ilike '%${date}%' and ("position" = '1' or "position" = '2' or "position" = '3' or "position" = '4')  GROUP BY "commander" ORDER BY "occurrence" DESC;`,
            {
                type: Models.sequelize.QueryTypes.SELECT,
            }
        );
    }
    if (location && date) {
        return await Models.sequelize.query(
            `SELECT d."commander", COUNT(d."commander") AS "occurrence" FROM "Decks" as d inner JOIN "Events" as e on  e."id" =  d."eventId" and  e."date" ilike '%${date}%' and e."location" ilike '%${location}%' and ("position" = '1' or "position" = '2' or "position" = '3' or "position" = '4')  GROUP BY "commander" ORDER BY "occurrence" DESC;`,
            {
                type: Models.sequelize.QueryTypes.SELECT,
            }
        );
    }
}

async function getMostPlayedDecks(location, date, initialDate, finalDate) {
    if (!location && !date && !initialDate && !finalDate) {
        return await Models.sequelize.query(
            'SELECT "commander", COUNT("commander") AS "occurrence" FROM "Decks" GROUP BY "commander" ORDER BY "occurrence" DESC;',
            {
                type: Models.sequelize.QueryTypes.SELECT,
            }
        );
    }
    if (!location && !date && initialDate && finalDate) {
        return await Models.sequelize.query(
            `SELECT d."commander", COUNT(d."commander") AS "occurrence"  FROM "Decks" as d inner JOIN "Events" as e on  e."id" =  d."eventId" WHERE e.date BETWEEN '${initialDate}' AND '${finalDate}' GROUP BY d."commander" ORDER BY "occurrence" DESC;`,
            {
                type: Models.sequelize.QueryTypes.SELECT,
            }
        );
    }
    if (location && !date && !initialDate && !finalDate) {
        return await Models.sequelize.query(
            `SELECT d."commander", COUNT(d."commander") AS "occurrence"  FROM "Decks" as d inner JOIN "Events" as e on  e."id" =  d."eventId" and  e."location" ilike '%${location}%' GROUP BY d."commander" ORDER BY "occurrence" DESC;`,
            {
                type: Models.sequelize.QueryTypes.SELECT,
            }
        );
    }
    if (location && !date && initialDate && finalDate) {
        return await Models.sequelize.query(
            `SELECT d."commander", COUNT(d."commander") AS "occurrence"  FROM "Decks" as d inner JOIN "Events" as e on  e."id" =  d."eventId" and  e."location" ilike '%${location}%' WHERE e.date BETWEEN '${initialDate}' AND '${finalDate}' GROUP BY d."commander" ORDER BY "occurrence" DESC;`,
            {
                type: Models.sequelize.QueryTypes.SELECT,
            }
        );
    }
    if (!location && date) {
        return await Models.sequelize.query(
            `SELECT d."commander", COUNT(d."commander") AS "occurrence"  FROM "Decks" as d inner JOIN "Events" as e on  e."id" =  d."eventId" and  e."date" ilike '%${date}%' GROUP BY d."commander" ORDER BY "occurrence" DESC;`,
            {
                type: Models.sequelize.QueryTypes.SELECT,
            }
        );
    }
    if (location && date) {
        return await Models.sequelize.query(
            `	SELECT d."commander", COUNT(d."commander") AS "occurrence"  FROM "Decks" as d inner JOIN "Events" as e on  e."id" =  d."eventId" and  e."date" ilike '%${date}%' and e."location" ilike '%${location}%' GROUP BY d."commander" ORDER BY "occurrence" DESC;`,
            {
                type: Models.sequelize.QueryTypes.SELECT,
            }
        );
    }
}
module.exports = {
    getAllEventsPaginated,
    getMostPlayedDecks,
    getMostTop4Decks,
    getMostWinnerDecks,
    findAll,
    getCommanderPaginated,
};
