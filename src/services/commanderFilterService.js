const eventRepository = require("../repositories/eventRepository");

async function execute(query, limit, skip) {
    const { commander, location, date, initialDate, finalDate } = query;

    const paginatedCommander = await eventRepository.getCommanderPaginated(
        limit,
        skip,
        location,
        date,
        commander,
        initialDate,
        finalDate
    );

    return paginatedCommander;
}

module.exports = {
    execute,
};
