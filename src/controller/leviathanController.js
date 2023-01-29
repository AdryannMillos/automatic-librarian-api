/* eslint-disable consistent-return */
const leviathanFilterService = require("../services/leviathanFilterService");
const getEventsUrlService = require("../services/bot/getEventsUrlService");
const getDataFromUrlService = require("../services/bot/getDataFromUrlService");
const compareEventUrlService = require("../services/compareEventUrlService");

async function index(req, res) {
    try {
        let { page, size } = req.query;
        if (!page) {
            page = 1;
        }
        if (!size) {
            size = 10;
        }

        const limit = parseInt(size);
        const skip = (page - 1) * size;

        const filtered = await leviathanFilterService.execute(
            req.query,
            limit,
            skip
        );
        const numberOfPages = Math.ceil(filtered.paginated.count / size);

        return res.status(200).json({
            isEvent: !req.query.commander,
            paginatedTable: {
                actualPage: page,
                size,
                numberOfPages,
                events: filtered.paginated.rows,
            },
            mostPlayedDecks: filtered.mostPlayedDecks,
            mostTop4Decks: filtered.mostTop4Decks,
            mostWinnerDecks: filtered.mostWinnerDecks,
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
    index,
    runBot,
};
