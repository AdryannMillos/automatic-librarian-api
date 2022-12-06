async function execute(urlsArray, storedEvents){
    
    const filterBadUrls = urlsArray.filter(item=> !item.includes("wix.com") && item !== "https://leviathancommander.wixsite.com/home/post/leviathan-team-battle");
    const filterRepeatedUrls = [...new Set(filterBadUrls)];
    const filterDatabaseUrls = filterRepeatedUrls.filter(item => !storedEvents.includes(item))
    return filterDatabaseUrls.reverse()
}

module.exports = {
    execute,
}