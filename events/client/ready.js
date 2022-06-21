/**
 * Events template for the Handler
 * @author TheIdiotGuy
 */

require('colors');

module.exports = {
    /* you know this.. ;-; */
    data: {
        name: 'ready', // The event name you want to emit | ClientEvents
        once: true // if event should be ran once or not ( you will know this if you know discord.js / basic JavaScript )
    },


    /* There can be more parameters | depends on DiscordJs events */
    exec: async (client) => {
        console.log(client.user.username);
    }
}