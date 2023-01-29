/* eslint-disable consistent-return */
const leviathanFilterService = require("../services/leviathanFilterService");

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

module.exports = {
    index,
};
