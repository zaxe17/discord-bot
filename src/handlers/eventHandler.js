const path = require('path');
const getAllfiles = require("../utils/getAllfiles");

module.exports = (client) => {
    const eventFolders = getAllfiles(path.join(__dirname, '..', 'events'), true);
    for(const eventFolder of eventFolders) {
        const eventFiles = getAllfiles(eventFolder);
        eventFiles.sort((a, b) => a > b);
        console.log(eventFiles);

        const eventName = eventFolder.replace(/\\/g, '/').split('/').pop();
        
        client.on(eventName, async (arg) => {
            for (const eventFile of eventFiles) {
                const eventFunction = require(getAllfiles);
                await eventFunction(client, arg);
            }
        });
    }
};