/**
 * ===== ( CREDITS ) =====
 * @author TheIdiotGuy <devinsane.79@gmail.com>
 */

const { token, secret, id, guild, dev } = require('../config/config.js').CyConfig;

class Utils {
    constructor() { }
    /**
     * Cleans the console
     */
    clean() {
        process.stdout.write("\u001b[3J\u001b[2J\u001b[1J");
        console.clear();
    }

    /**
     * 
     * @param {String} string Any string to capitalize
     * @returns capitalized string in Abc format
     */
    capitalize(string) {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    }
}

module.exports = Utils