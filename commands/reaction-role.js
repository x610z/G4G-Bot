module.exports = {
    slash: true,
    testOnly: true,
    description: 'React to get your role',
    minArgs: 3,
    expectedArgs: '<Message> <Reaction> <Reaction Description>',
    callback: ({ args }) => {
        
        return 'React to this message'
    },
}