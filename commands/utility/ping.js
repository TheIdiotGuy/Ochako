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
        name: 'ping',
        usage: '',
        cooldown: 5, // command cooldown in seconds
        aliases: ['pong'],
        category: 'Utility',
        bot_perms: [],
        user_perms: [],
        description: 'A ping pong command',
        dev_only: false, // true => only bot dev can use commands
        owner_only: false, // true => only server owner can use commands
        // options: [
        //     {
        //         name: 'my-awesome-option', // ⚠️ must be in lowercase letters!
        //         description: 'this is a description of a awesome option for you uwu <3', // a awesome description of a awesome command option!
        //         type: 3 // the commands option type | 🔗 check out : https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-option-type
        //     }
        // ],
    },

    /* function for prefix command */
    execute: async (client, msg, args, prefix) => {
        // Your code ...
        msg.delete();
        msg.channel.send(client.ws.ping + 'ms!').then((m) => {
            setTimeout(() => {
                m.deletable ? m.delete() : null
            }, 5000);
        });
    },

    /* function for slash command */
    interact: async (client, interaction, prefix) => {
        interaction.reply({ content: client.ws.ping + 'ms!', ephemeral: true })
    }
}