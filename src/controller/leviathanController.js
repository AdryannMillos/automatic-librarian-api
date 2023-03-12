/* eslint-disable consistent-return */
const eventFilterService = require("../services/eventFilterService");
const commanderFilterService = require("../services/commanderFilterService");
const playedFilterService = require("../services/playedFilterService");
const top4FilterService = require("../services/top4FilterService");
const winnerFilterService = require("../services/winnerFilterService");
const getEventsUrlService = require("../services/bot/getEventsUrlService");
const getDataFromUrlService = require("../services/bot/getDataFromUrlService");
const compareEventUrlService = require("../services/compareEventUrlService");

async function event(req, res) {
    try {
        let { page, size } = req.query;
        if (!page) {
            page = 1;
        }
        if (!size) {
            size = 10;
        }

        const limit = parseInt(size, 10);
        const skip = (page - 1) * size;

        const filtered = await eventFilterService.execute(
            req.query,
            limit,
            skip
        );

        const numberOfPages = Math.ceil(filtered.count / size);

        return res.status(200).json({
            paginatedTable: {
                actualPage: page,
                size,
                numberOfPages,
                events: filtered.rows,
            },
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function commander(req, res) {
    try {
        let { page, size } = req.query;
        if (!page) {
            page = 1;
        }
        if (!size) {
            size = 10;
        }

        const limit = parseInt(size, 10);
        const skip = (page - 1) * size;

        const filtered = await commanderFilterService.execute(
            req.query,
            limit,
            skip
        );
        const numberOfPages = Math.ceil(filtered.count / size);

        return res.status(200).json({
            paginatedTable: {
                actualPage: page,
                size,
                numberOfPages,
                commanders: filtered.rows,
            },
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function played(req, res) {
    try {
        let { page, size } = req.query;
        if (!page) {
            page = 1;
        }
        if (!size) {
            size = 10;
        }

        const limit = parseInt(size, 10);
        const skip = (page - 1) * size;

        const filtered = await playedFilterService.execute(
            req.query,
            limit,
            skip
        );
        const numberOfPages = Math.ceil(filtered.count / size);

        return res.status(200).json({
            paginatedTable: {
                actualPage: page,
                size,
                numberOfPages,
                played: filtered.rows,
            },
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function top4(req, res) {
    try {
        let { page, size } = req.query;
        if (!page) {
            page = 1;
        }
        if (!size) {
            size = 10;
        }

        const limit = parseInt(size, 10);
        const skip = (page - 1) * size;

        const filtered = await top4FilterService.execute(
            req.query,
            limit,
            skip
        );
        const numberOfPages = Math.ceil(filtered.count / size);

        return res.status(200).json({
            paginatedTable: {
                actualPage: page,
                size,
                numberOfPages,
                top4: filtered.rows,
            },
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function winner(req, res) {
    try {
        let { page, size } = req.query;
        if (!page) {
            page = 1;
        }
        if (!size) {
            size = 10;
        }

        const limit = parseInt(size, 10);
        const skip = (page - 1) * size;

        const filtered = await winnerFilterService.execute(
            req.query,
            limit,
            skip
        );
        const numberOfPages = Math.ceil(filtered.count / size);

        return res.status(200).json({
            paginatedTable: {
                actualPage: page,
                size,
                numberOfPages,
                winners: filtered.rows,
            },
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function runBot() {
    try {
        const urlsArray = await getEventsUrlService.execute();

        const filteredUrls = await compareEventUrlService.execute(urlsArray);
        if (filteredUrls.length > 0) {
            for (let i = 0; i < filteredUrls.length; i++) {
                await getDataFromUrlService.execute(filteredUrls[i]);
            }
        }
        return true;
    } catch (error) {
        return error.message;
    }
}

module.exports = {
    event,
    commander,
    top4,
    played,
    winner,
    runBot,
};
