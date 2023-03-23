const eventRepository = require("../repositories/eventRepository");

async function execute(query, limit, skip) {
    const { location, date, initialDate, finalDate } = query;

    const mostPlayedDecks = await eventRepository.getMostPlayedDecks(
        limit,
        skip,
        location,
        date,
        initialDate,
        finalDate
    );

    return mostPlayedDecks;
}

module.exports = {
    execute,
};
