const getEventsUrlService = require("./bot/getEventsUrlService");
const getDataFromUrlService = require("./bot/getDataFromUrlService");
const eventRepository = require("../repositories/eventRepository");

async function execute() {
    const urlsArray = await getEventsUrlService.execute();

    const getStoredEvents = await eventRepository.findAll();
    const storedUrls = getStoredEvents.map((item) => item.url);

    const filteredUrls = filterUrls(urlsArray, storedUrls);

    // console.log("urlsArray", urlsArray.length);
    // console.log("urlsStored", storedUrls.length);
    // console.log("filteredUrls", filteredUrls.length);

    if (filteredUrls.length > 0) {
        for (let i = 0; i < filteredUrls.length; i++) {
            await getDataFromUrlService.execute(filteredUrls[i]);
            // console.log("read");
        }
    }
    // console.log("finished");
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
