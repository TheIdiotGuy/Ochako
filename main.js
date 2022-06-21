/**
 * ===== ( CREDITS ) =====
 * @author TheIdiotGuy <devinsane.79@gmail.com>
 */

const TeamCyborg = require('./structures/TeamCyborg');
const Utils = require('./structures/CyUtils');
const { clientOpts } = require('./config/settings');

const Client = new TeamCyborg(clientOpts);
const CyUtils = new Utils();

// CyUtils.clean();
Client.start();