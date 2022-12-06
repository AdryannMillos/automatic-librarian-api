const leviathanCompareService = require("../services/CompareEventUrlService");
const leviathanFilterService = require("../services/leviathanFilterService");

async function compare(req, res) {
  try {
    await leviathanCompareService.execute();
    return res.status(200);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function filter(req, res) {
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
      isEvent: req.query.commander ? false : true,
      paginatedTable: {
        actualPage: page,
        size: size,
        numberOfPages: numberOfPages,
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
  compare,
  filter,
};
