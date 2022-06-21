/**
 * Events template for the Handler
 * @author TheIdiotGuy
 */

const { prefix, dev, maintenance_mode } = require('../../config/config.js').CyConfig;
const { Message, Collection } = require('discord.js');

module.exports = {
    /* you know this.. ;-; */
    data: {
        name: 'interactionCreate', // The event name you want to emit | ClientEvents
        once: false // if event should be ran once or not ( you will know this if you know discord.js / basic JavaScript )
    },


    /* There can be more parameters | depends on DiscordJs events */
    exec: async (client, interaction) => {
        if (!interaction.isCommand()) return;
        if (!interaction.guild) return;
        const command = client.slashCommands.get(interaction.commandName);

        if (command) {
            try {
                // conditions
                // algorithm for command cooldowns | BEGINNING
                if (!client.cooldowns.has(command.name)) {
                    client.cooldowns.set(command.name, new Collection());
                }
                const now = Date.now();
                const timestamps = client.cooldowns.get(command.name);
                const cooldownAmount = (command.cooldown || 2) * 1000;
                if (timestamps.has(interaction.user.id)) {
                    const expirationTime = timestamps.get(interaction.user.id) + cooldownAmount;
                    if (now < expirationTime) {
                        const timeLeft = (expirationTime - now) / 1000;
                        return interaction.reply({
                            content: `Please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`
                        });
                    }
                }
                timestamps.set(interaction.user.id, now);
                setTimeout(() => timestamps.delete(interaction.user.id), cooldownAmount);
                // algorithm for command cooldowns | ENDING

                // if command is for developer only
                if (command.dev_only) {
                    if (interaction.user.id !== dev) {
                        return interaction.reply('This command is for developers only.')
                    }
                }

                // if command is for server owner only
                if (command.owner_only) {
                    if (interaction.user.id !== interaction.guild.ownerId) {
                        return interaction.reply('This command is for server owners only.')
                    }
                }

                if (maintenance_mode && message.author.id !== dev) {
                    await interaction.reply('The bot is in maintenance mode you can\'t use it right now.')
                } else {
                    try {
                        command.run(client, interaction, prefix);
                    } catch (e) {
                        console.log(e);
                    }
                }
            } catch (e) {
                console.log(e);

            }
        }
    }
}