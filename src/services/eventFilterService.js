const eventRepository = require("../repositories/eventRepository");

async function execute(query, limit, skip) {
    const { location, date, initialDate, finalDate } = query;

    const paginatedEvent = await eventRepository.getAllEventsPaginated(
        limit,
        skip,
        location,
        date,
        initialDate,
        finalDate
    );

    return paginatedEvent;
}

module.exports = {
    execute,
};
