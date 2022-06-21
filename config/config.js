/**
 * ===== ( CREDITS ) =====
 * @author TheIdiotGuy <devinsane.79@gmail.com>
 */

/* Loading .env file content */
require("dotenv").config();

/* Accessing enviroment variables */
const { bot_token, bot_secret } = process.env;

/**
 * ⚠️ Config ( must be filled properly )
 * 
 * ⚠️ NOTE1 : only edit the 1st argument which is the argument before the logical OR: ||
 * 
 * ⚠️ NOTE2 : only update file if you know what you're doing else it may break the config
 */
module.exports = {
    CyConfig: {
        token: "" || bot_token, /* The bots token */
        secret: "" || bot_secret, /* The bots secret */
        prefix: "!" || "o!", /* The bots default prefix */
        id: "" || null, /* The bots id */
        guild: "" || null, /* The bots test/developement server id */
        dev: "" || null, /* The bots developer id */
        maintenance_mode: false, /* set it to true to remove access from all members except the developer */
        global_commands: false, /* set it to true to register commands globally */
    }
}