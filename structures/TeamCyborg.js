/**
 * ===== ( CREDITS ) =====
 * @author TheIdiotGuy <devinsane.79@gmail.com>
 */

const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const { Client, Collection } = require("discord.js");
const { readdirSync } = require("fs");
const { token, secret, id, guild, global_commands } = require('../config/config.js').CyConfig;
const { join } = require('path');
require('colors')

class TeamCyborg extends Client {
    constructor(clientOpts) {
        super(clientOpts);

        /* attaching properties with this keyword */
        this.token = token;
        this.secret = secret;
        this.id = id;
        this.testguild = guild;
        this.registerType = global_commands;

        /* some collections <3 */
        this.commands = new Collection();
        this.aliases = new Collection();
        this.cooldowns = new Collection();
        this.slashCommands = new Collection();
        this.ArrayofSlash = [];

        /* instance of REST class */
        this.Rest = new REST({ version: '9' }).setToken(this.token);

        /* Running class methods */
        this.loadCommands(join(__dirname, "..", 'commands'));
        this.loadEvents(join(__dirname, "..", "events"))
    }

    /**
     * Command handler
     * @param {String} path 
     */
    async loadCommands(path) {
        let count = 0;
        readdirSync(path).forEach((dir) => {
            const folder = readdirSync(join(path, dir)).filter((files) => files.endsWith('.js'));
            for (const file of folder) {
                const cmd = require(join(path, dir, file));
                this.commands.set(cmd.data.name, cmd);
                if (cmd.data.aliases && Array.isArray(cmd.data.aliases)) cmd.data.aliases.forEach((alias) => this.aliases.set(alias, cmd.data.name));
                const data = {
                    name: cmd.data.name.toLowerCase(),
                    description: cmd.data.description,
                    options: cmd.data.options ? cmd.data.options : null,
                    owner_only: cmd.data.owner_only ? cmd.data.owner_only : false,
                    dev_only: cmd.data.dev_only ? cmd.data.dev_only : false,
                    category: cmd.data?.category,
                    cooldown: cmd.data?.cooldown ? cmd.data.cooldown : 2,
                    run: cmd.interact,
                }
                this.slashCommands.set(data.name, data)
                this.ArrayofSlash.push(data);
                count++
            }
        })

        /* Register commands */
        if (this.registerType === true) {
            this.Rest.put(
                Routes.applicationCommands(this.id),
                {
                    body: this.ArrayofSlash
                }
            );

            console.log('--> Registered commands globally.');
        } else {
            this.Rest.put(
                Routes.applicationGuildCommands(this.id, this.testguild),
                {
                    body: this.ArrayofSlash
                }
            );

            console.log('--> Registered commands locally.');
        }

        console.log(`--> Loaded ${count} Command(s)`);
    }

    /**
     * Event handler
     * @param {String} path 
     */
    async loadEvents(path) {
        let count = 0;
        readdirSync(path).forEach((dir) => {
            const folder = readdirSync(join(path, dir)).filter((files) => files.endsWith('.js'));
            for (const file of folder) {
                const evn = require(join(path, dir, file));
                if (evn.data.once) {
                    this.once(evn.data.name, (...args) => evn.exec(this, ...args));
                } else {
                    this.on(evn.data.name, (...args) => evn.exec(this, ...args));
                }
                count++;
            }
        });
        console.log(`--> Loaded ${count} Event(s).`);
    }

    /**
     * The main function of the class
     */
    start() {
        try {
            this.login(this.token).then(() => console.log('--> Bot logged in'));
        } catch (err) {
            console.log(err);
        }
    }
}

module.exports = TeamCyborg;