/**
 * Commands template for the Handler
 * @author TheIdiotGuy
 */

const { MessageEmbed, Message } = require('discord.js');

/** 
 * Self explanatory template 
 */

module.exports = {
    /* command data */
    data: {
        name: 'help',
        usage: '!help [command_name]',
        cooldown: 5, // command cooldown in seconds
        aliases: ['h'],
        category: 'Utility',
        bot_perms: [],
        user_perms: [],
        description: 'the most helpfull command <3',
        dev_only: false, // true => only bot dev can use commands
        owner_only: false, // true => only server owner can use commands
        options: [
            {
                name: 'command_name', // ⚠️ must be in lowercase letters!
                description: 'The command name you want to get information about <3', // a awesome description of a awesome command option!
                type: 3 // the commands option type | 🔗 check out : https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-option-type
            }
        ],
    },

    /* function for prefix command */
    execute: async (client, msg, args, prefix) => {
        if (args[0]) {
            const cmd = client.commands.get(args[0].toLowerCase()) || client.commands.get(client.aliases.get(args[0].toLowerCase()));
            if (!cmd) msg.reply(`Command not found: ${args[0].toLowerCase()}`);
            msg.delete();
            msg.channel.send({
                embeds: [
                    {
                        title: `Command: ${cmd.data.name}`,
                        description: [
                            `> **Name: \`${cmd.data.name}\`**`,
                            `> **Aliases: \`${cmd.data.aliases ? cmd.data.aliases.join('\n') : "N/A"}\`**`,
                            `> **Description: \`${cmd.data.description ? cmd.data.description : "N/A"}\`**`,
                            `> **Category: \`${cmd.data.category ? cmd.data.category : "Utility"}\`**`,
                            `> **Cooldown: \`${cmd.data.cooldown ? cmd.data.cooldown : "2"} seconds\`**`,
                            `> **Usage: \`${cmd.data.usage ? cmd.data.usage : "N/A"}\`**`,
                            `> **IsOwnerOnly?: \`${cmd.data.dev_only ? "Yes" : "No"}\`**`,
                            `> **IsDevOnly?: \`${cmd.data.owner_only ? "Yes" : "No"}\`** `,
                        ].join('\n'),
                        color: 'BLURPLE',
                        thumbnail: { url: client.user.displayAvatarURL({ dynamic: true }) }
                    }
                ]
            }).then((m) => {
                setTimeout(() => {
                    m.deletable ? m.delete() : null
                }, 5000);
            });
        } else {
            let allCmds = [];
            client.commands.filter(cmd => allCmds.push(`\`${cmd.data.name}\``));
            msg.delete();
            msg.channel.send({
                embeds: [
                    {
                        author: {
                            name: 'Dynamic Help Command',
                            iconURL: client.user.displayAvatarURL({ dynamic: true })
                        },
                        description: [
                            `**Here's a list of all commands.**`,
                            `> **${allCmds.join(", ")}**`,
                            ``,
                            '```',
                            `To get information about a command use: ${prefix}help {command_name}`,
                            '```',
                        ].join('\n'),
                        color: 'BLURPLE',
                        // thumbnail: { url: client.user.displayAvatarURL({ dynamic: true }) },
                        footer: {
                            text: msg.author.username,
                            iconURL: msg.author.displayAvatarURL({ dynamic: true })
                        },
                        timestamp: Date.now()
                    }
                ]
            }).then((m) => {
                setTimeout(() => {
                    m.deletable ? m.delete() : null
                }, 5000);
            });
        }
    },

    /* function for slash command */
    interact: async (client, interaction, prefix) => {
        const cmdName = interaction.options.getString('command_name');
        if (cmdName) {
            const command = client.slashCommands.get(cmdName.toLowerCase());
            if (!command) return interaction.reply(`Command not found: ${cmdName.toLowerCase()}`);
            interaction.reply({
                embeds: [
                    {
                        title: `Command: ${command.name}`,
                        description: [
                            `> **Name: \`${command.name}\`**`,
                            `> **Description: \`${command.description}\`**`,
                            `> **Category: \`${command.category ? command.category : "Utility"}\`**`,
                            `> **Cooldown: \`${command.cooldown ? command.cooldown : "2"} seconds\`**`,
                            `> **Usage: \`${command.usage ? command.usage : "N/A"}\`**`,
                            `> **IsOwnerOnly?: \`${command.owner_only ? "Yes" : "No"}\`**`,
                            `> **IsDevOnly?: \`${command.dev_only ? "Yes" : "No"}\`** `,
                        ].join('\n'),
                        color: 'BLURPLE',
                        thumbnail: { url: client.user.displayAvatarURL({ dynamic: true }) }
                    }
                ],
                ephemeral: true
            })
        } else {
            let allCmds = [];
            client.slashCommands.filter(cmd => allCmds.push(`\`${cmd.name}\``));
            interaction.reply({
                embeds: [
                    {
                        author: {
                            name: 'Dynamic Help Command',
                            iconURL: client.user.displayAvatarURL({ dynamic: true })
                        },
                        description: [
                            `**Here's a list of all commands.**`,
                            `> **${allCmds.join(", ")}**`,
                            ``,
                            '```',
                            `To get information about a command use: /help {command_name}`,
                            '```',
                        ].join('\n'),
                        color: 'BLURPLE',
                        footer: {
                            text: interaction.user.username,
                            iconURL: interaction.user.displayAvatarURL({ dynamic: true })
                        },
                        timestamp: Date.now()
                    }
                ]
            })
        }
    }
}