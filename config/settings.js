/**
 * ===== ( CREDITS ) =====
 * @author TheIdiotGuy <devinsane.79@gmail.com>
 */

/* Client Options */

module.exports = {
    clientOpts: {
        intents: ['GUILDS', 'GUILD_MEMBERS', 'GUILD_MESSAGES'],
        allowedMentions: {
            parse: ['users', 'roles'],
            repliedUser: true
        },
        presence: {
            activities: [
                {
                    name: 'Cyborg Developement',
                    type: 'LISTENING'
                }
            ],
            status: 'idle'
        }
    }
}