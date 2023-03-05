/* eslint-disable no-return-await */
const Sequelize = require("sequelize");
const Models = require("../models/index");

const { Op } = Sequelize;

const findAll = async () => Models.Event.findAll();

const filterOptions = (location, date, initialDate, finalDate) => {
    const query = {};
    if (location && date) {
        query.where = {
            location: { [Op.iLike]: `%${location}%` },
            date: { [Op.iLike]: `%${date}%` },
        };
    } else if (location) {
        query.where = {
            location: { [Op.iLike]: `%${location}%` },
            ...(initialDate &&
                finalDate && {
                    date: { [Op.between]: [initialDate, finalDate] },
                }),
        };
    } else if (date) {
        query.where = { date: { [Op.iLike]: `%${date}%` } };
    } else if (initialDate && finalDate) {
        query.where = { date: { [Op.between]: [initialDate, finalDate] } };
    }
    return query;
};

const getAllEventsPaginated = async (
    limit,
    skip,
    location,
    date,
    initialDate,
    finalDate
) => {
    const where = filterOptions(location, date, initialDate, finalDate);
    const { count, rows } = await Models.Event.findAndCountAll({
        ...where,
        include: ["decks"],
        limit,
        offset: skip,
        distinct: true,
        order: [["date", "DESC"]],
    });
    return { count, rows };
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
    let where = { commander: { [Op.iLike]: `%${commander}%` } };
    if (location || date || (initialDate && finalDate)) {
        where = {
            ...where,
            ...(date && { "$event.date$": { [Op.iLike]: `%${date}%` } }),
            ...(location && {
                "$event.location$": { [Op.iLike]: `%${location}%` },
            }),
            ...(initialDate &&
                finalDate && {
                    "$event.date$": {
                        [Op.between]: [initialDate, finalDate],
                    },
                }),
        };
    }
    const { count, rows } = await Models.Deck.findAndCountAll({
        where,
        include: ["event"],
        limit,
        offset: skip,
        distinct: true,
        order: [["id", "DESC"]],
    });
    return { count, rows };
};

async function getMostTop4Decks(
    limit,
    skip,
    location,
    date,
    initialDate,
    finalDate
) {
    const conditions = [];
    conditions.push("position IN ('1', '2', '3', '4')");

    if (location) {
        conditions.push(`e."location" ILIKE :location`);
    }
    if (date) {
        conditions.push(`e."date" ILIKE :date`);
    }
    if (initialDate && finalDate) {
        conditions.push(`e.date BETWEEN :initialDate AND :finalDate`);
    }

    const whereClause =
        conditions.length > 0 ? ` WHERE ${conditions.join(" AND ")}` : "";

    let query = `SELECT d."commander", COUNT(d."commander") AS "occurrence" FROM "Decks" as d INNER JOIN "Events" as e on e."id" = d."eventId" ${whereClause}`;

    query += ` GROUP BY "commander" ORDER BY "occurrence" `;

    const subQuery = query ? `(${query}) as count` : "";

    const countQuery = `SELECT COUNT(*) FROM ${subQuery};`;

    const [countResult] = await Models.sequelize.query(countQuery, {
        replacements: {
            location: `%${location}%`,
            date: `%${date}%`,
            initialDate,
            finalDate,
        },
        type: Models.sequelize.QueryTypes.SELECT,
    });

    query += `DESC LIMIT ${limit} OFFSET ${skip}`;

    const { count } = countResult;

    const rows = await Models.sequelize.query(query, {
        replacements: {
            location: `%${location}%`,
            date: `%${date}%`,
            initialDate,
            finalDate,
        },
        type: Models.sequelize.QueryTypes.SELECT,
    });

    return { rows, count };
}

async function getMostPlayedDecks(
    limit,
    skip,
    location,
    date,
    initialDate,
    finalDate
) {
    const conditions = [];

    if (location) {
        conditions.push(`e."location" ILIKE '%${location}%'`);
    }
    if (date) {
        conditions.push(`e."date" ILIKE '%${date}%'`);
    }
    if (initialDate && finalDate) {
        conditions.push(
            `e.date BETWEEN '%${initialDate}%' AND '%${finalDate}%'`
        );
    }

    const whereClause =
        conditions.length > 0 ? ` WHERE ${conditions.join(" AND ")}` : "";
    let query = `SELECT "commander", COUNT("commander") AS "occurrence" FROM "Decks" as d INNER JOIN "Events" as e on e."id" = d."eventId" ${whereClause}`;

    query += ` GROUP BY "commander" ORDER BY "occurrence" `;

    const subQuery = query ? `(${query}) as count` : "";

    const countQuery = `SELECT COUNT(*) FROM ${subQuery};`;

    const [countResult] = await Models.sequelize.query(countQuery, {
        type: Models.sequelize.QueryTypes.SELECT,
    });

    query += `DESC LIMIT ${limit} OFFSET ${skip}`;

    const { count } = countResult;

    const rows = await Models.sequelize.query(query, {
        type: Models.sequelize.QueryTypes.SELECT,
    });

    return { rows, count };
}

async function getMostWinnerDecks(
    limit,
    skip,
    location,
    date,
    initialDate,
    finalDate
) {
    let query = `SELECT d."commander", COUNT(d."commander") AS "occurrence" FROM "Decks" as d INNER JOIN "Events" as e ON e."id" = d."eventId" AND "position" = '1'`;

    const whereClause = [];
    const replacements = {};

    if (location) {
        whereClause.push(`e."location" ILIKE :location`);
        replacements.location = `%${location}%`;
    }
    if (date) {
        whereClause.push(`e."date" ILIKE :date`);
        replacements.date = `%${date}%`;
    }
    if (initialDate && finalDate) {
        whereClause.push(`e.date BETWEEN :initialDate AND :finalDate`);
        replacements.initialDate = initialDate;
        replacements.finalDate = finalDate;
    }
    if (whereClause.length > 0) {
        query += ` WHERE ${whereClause.join(" AND ")}`;
    }
    query += ` GROUP BY "commander" ORDER BY "occurrence" `;

    const subQuery = query ? `(${query}) as count` : "";

    const countQuery = `SELECT COUNT(*) FROM ${subQuery};`;

    const [countResult] = await Models.sequelize.query(countQuery, {
        replacements,
        type: Models.sequelize.QueryTypes.SELECT,
    });

    query += `DESC LIMIT ${limit} OFFSET ${skip}`;

    const { count } = countResult;

    const rows = await Models.sequelize.query(query, {
        replacements,
        type: Models.sequelize.QueryTypes.SELECT,
    });

    return { rows, count };
}

module.exports = {
    getAllEventsPaginated,
    getMostPlayedDecks,
    getMostTop4Decks,
    getMostWinnerDecks,
    findAll,
    getCommanderPaginated,
};
