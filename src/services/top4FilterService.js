const eventRepository = require("../repositories/eventRepository");

async function execute(query, limit, skip) {
    const { location, date, initialDate, finalDate } = query;

    const mostTop4Decks = await eventRepository.getMostTop4Decks(
        limit,
        skip,
        location,
        date,
        initialDate,
        finalDate
    );

    return mostTop4Decks;
}

module.exports = {
    execute,
};
