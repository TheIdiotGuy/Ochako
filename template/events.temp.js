/**
 * Events template for the Handler
 * @author TheIdiotGuy
 */

module.exports = {
    /* you know this.. ;-; */
    data: {
        name: 'the-discordjs-event-name', // The event name you want to emit | ClientEvents
        once: false // if event should be ran once or not ( you will know this if you know discord.js / basic JavaScript )
    },


    /* There can be more parameters | depends on DiscordJs events */
    exec: async (client) => {
        // Your code...
    }
}