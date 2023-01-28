const getEventsUrlService = require("./bot/getEventsUrlService");
const filterUrlsService = require("./filterUrlsService");
const eventRepository = require("../repositories/eventRepository");
const getDataFromUrlService = require("./bot/getDataFromUrlService");

async function execute() {
    const urlsArray = await getEventsUrlService.execute();
    const getStoredEvents = await eventRepository.findAll();
    const storedUrls = getStoredEvents.map((item) => item.url);
    const filteredUrls = await filterUrlsService.execute(urlsArray, storedUrls);

    console.log("urlsArray", urlsArray.length);
    console.log("urlsStored", storedUrls.length);
    console.log("filteredUrls", filteredUrls.length);

    const newEvents = filteredUrls.length > storedUrls.length;

    if (newEvents === true) {
        await getDataFromUrlService.execute(filteredUrls);
    }
}

module.exports = {
    execute,
};
