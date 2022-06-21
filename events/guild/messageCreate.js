/**
 * Events template for the Handler
 * @author TheIdiotGuy
 */

const { Message, Collection } = require('discord.js');
const { prefix, dev, maintenance_mode } = require('../../config/config.js').CyConfig;

require('colors');

module.exports = {
    /* you know this.. ;-; */
    data: {
        name: 'messageCreate', // The event name you want to emit | ClientEvents
        once: false // if event should be ran once or not ( you will know this if you know discord.js / basic JavaScript )
    },

    /**
     * There can be more parameters | depends on DiscordJs events
     * @param {*} client 
     * @param {Message} message 
     */
    exec: async (client, message) => {
        // credits: stackoverflow
        if (!message.guild || message.author.bot) return;
        if (!message.content.startsWith(prefix) && message.content.includes(client.user.id)) {
            message.reply({
                embeds: [
                    {
                        title: 'Did you mention me?',
                        description: `**My prefix is: ${prefix}** | example: ${prefix}ping`,
                        color: 'BLURPLE'
                    }
                ]
            })
        }
        if (!message.content.startsWith(prefix)) return;
        const args = message.content.slice(prefix.length).trim().split(/ +/g);
        const cmd = args.shift().toLowerCase();
        if (cmd.length === 0) return;
        let command = client.commands.get(cmd);
        if (!command) command = client.commands.get(client.aliases.get(cmd));
        if (command) {
            // algorithm for command cooldowns | BEGINNING
            if (!client.cooldowns.has(command.name)) {
                client.cooldowns.set(command.name, new Collection());
            }
            const now = Date.now();
            const timestamps = client.cooldowns.get(command.name);
            const cooldownAmount = (command.cooldown || 2) * 1000;
            if (timestamps.has(message.author.id)) {
                const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
                if (now < expirationTime) {
                    const timeLeft = (expirationTime - now) / 1000;
                    return message.reply({
                        content: `Please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.data.name}\` command.`
                    });
                }
            }
            timestamps.set(message.author.id, now);
            setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
            // algorithm for command cooldowns | ENDING

            // if command is for developer only
            if (command.data.dev_only) {
                if (message.author.id !== dev) {
                    return message.reply('This command is for developers only.')
                }
            }

            // if command is for server owner only
            if (command.data.owner_only) {
                if (message.author.id !== message.guild.ownerId) {
                    return message.reply('This command is for server owners only.')
                }
            }

            // if bot's maintenance mode is on
            if (maintenance_mode && message.author.id !== dev) {
                return message.reply({
                    content: 'The bot is in maintenance mode you can\'t use it right now.'
                });
                // if not on do this..
            } else {
                try {
                    // try to run the command!
                    command.execute(client, message, args, prefix);
                } catch (e) {
                    // log the error (if any)
                    console.log(e);
                }
            }
        }
    }
}