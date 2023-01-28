const eventRepository = require("../repositories/eventRepository");

async function execute(query, limit, skip) {
    const { commander, location, date, initialDate, finalDate } = query;
    const paginated = commander
        ? await eventRepository.getCommanderPaginated(
              limit,
              skip,
              location,
              date,
              commander,
              initialDate,
              finalDate
          )
        : await eventRepository.getAllEventsPaginated(
              limit,
              skip,
              location,
              date,
              initialDate,
              finalDate
          );
    const mostPlayedDecks = await eventRepository.getMostPlayedDecks(
        location,
        date,
        initialDate,
        finalDate
    );
    const mostTop4Decks = await eventRepository.getMostTop4Decks(
        location,
        date,
        initialDate,
        finalDate
    );
    const mostWinnerDecks = await eventRepository.getMostWinnerDecks(
        location,
        date,
        initialDate,
        finalDate
    );

    return { paginated, mostPlayedDecks, mostTop4Decks, mostWinnerDecks };
}

module.exports = {
    execute,
};
