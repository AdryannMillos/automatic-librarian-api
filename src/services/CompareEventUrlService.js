const getEventsUrlService = require('./getEventsUrlService');
const filterUrlsService = require('./filterUrlsService');
const eventRepository = require("../repositories/eventRepository");
const runBotService = require('./runBotService');

async function execute(){
    const urlsArray = await getEventsUrlService.execute();
    const getStoredEvents = await eventRepository.findAll();
    const storedUrls = getStoredEvents.map(item=>item.url)
    console.log(storedUrls.length)
    const newEvents = urlsArray.length > storedUrls.length;
        
    if(newEvents === true){
        const filteredUrls = await filterUrlsService.execute(urlsArray, storedUrls);
        await runBotService.execute(filteredUrls);
    }
}

module.exports = {
    execute,
}