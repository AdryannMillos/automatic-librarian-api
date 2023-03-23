const eventRepository = require("../repositories/eventRepository");

async function execute(query, limit, skip) {
    const { location, date, initialDate, finalDate } = query;

    const mostWinnerDecks = await eventRepository.getMostWinnerDecks(
        limit,
        skip,
        location,
        date,
        initialDate,
        finalDate
    );

    return mostWinnerDecks;
}

module.exports = {
    execute,
};
