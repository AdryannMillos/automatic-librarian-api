const eventRepository = require("../repositories/eventRepository");

async function execute(urlsArray) {
    const getStoredEvents = await eventRepository.findAll();
    const storedUrls = getStoredEvents.map((item) => item.url);

    const filteredUrls = filterUrls(urlsArray, storedUrls);

    return filteredUrls;
}

function filterUrls(urlsArray, storedEvents) {
    const filterBadUrls = urlsArray.filter(
        (item) =>
            item !==
                "https://leviathancommander.wixsite.com/home/post/leviathan-team-battle" &&
            item !==
                "https://leviathancommander.wixsite.com/home/post/sea-king-tournament-report" &&
            item !==
                "https://leviathancommander.wixsite.com/home/post/spring-edition-leviathan-commander-relation"
    );
    const filterRepeatedUrls = [...new Set(filterBadUrls)];
    const filterDatabaseUrls = filterRepeatedUrls.filter(
        (item) => !storedEvents.includes(item)
    );
    filterDatabaseUrls.reverse();
    return filterDatabaseUrls;
}

module.exports = {
    execute,
};
