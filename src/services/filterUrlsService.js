async function execute(urlsArray, storedEvents) {
    const filterBadUrls = urlsArray.filter(
        (item) =>
            item &&
            item.includes("https://leviathancommander.wixsite.com/home/post") &&
            item !==
                "https://leviathancommander.wixsite.com/home/post/leviathan-team-battle"
    );
    const filterRepeatedUrls = [...new Set(filterBadUrls)];
    const filterDatabaseUrls = filterRepeatedUrls.filter(
        (item) => !storedEvents.includes(item)
    );
    return filterDatabaseUrls.reverse();
}

module.exports = {
    execute,
};
