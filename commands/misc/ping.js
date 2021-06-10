module.exports = {
    commands: ['ping', 'p'],
    minArgs: 0,
    maxArgs: 0,
    permissions: [],
    requiredRoles: ["Tester"],
    callback: (message, arguments, text) => {
        message.channel.send('Pong!')
    }
}