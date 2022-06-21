/**
 * Commands template for the Handler
 * @author TheIdiotGuy
 */

/** 
 * Self explanatory template 
 */

module.exports = {
    /* command data */
    data: {
        name: 'the-command-name',
        usage: '!the-command-name <the-argument>',
        cooldown: 10, // command cooldown in seconds
        aliases: ['command-alias-1', 'command-alias-2', 'maybe-more-aliases...'],
        category: 'General',
        bot_perms: ['example-permission-1', 'example-permission-2'],
        user_perms: ['example-permission-1', 'example-permission-2'],
        description: 'A short sweet description of this command ehe <3',
        dev_only: false, // true => only bot dev can use commands
        owner_only: false, // true => only server owner can use commands
        options: [
            {
                name: 'my-awesome-option', // ⚠️ must be in lowercase letters!
                description: 'this is a description of a awesome option for you uwu <3', // a awesome description of a awesome command option!
                type: 3 // the commands option type | 🔗 check out : https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-option-type
            }
        ],
    },

    /* function for prefix command */
    execute: async (client, msg, args, prefix) => {
        // Your code ...
    },

    /* function for slash command */
    interact: async (client, interaction, prefix) => {
        // Your code ...
    }
}