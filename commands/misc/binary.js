module.exports = {
    commands: 'binary',
    minArgs: 0,
    maxArgs: 0,
    callback: (message, arguments, text) => {
        message.reply('Pong!')
    }
}