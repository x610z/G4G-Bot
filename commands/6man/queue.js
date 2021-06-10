
module.exports = {
	commands: [],
	minArgs: 0,
	maxArgs: 0,
	requiredRoles: [],
	callback: (message, arguments, text, client, Discord) => {
         
        if (!matchQueue.length) {
            const emptyQueue = new Discord.MessageEmbed()
                .setDescription(`The queue is empty`)

            message.channel.send(emptyQueue)
        } else {
            const queueEmbed = new Discord.MessageEmbed()
                .setTitle(`${rank} [${matchQueue.length}/${players}]`)
                .addField(`Game: #${game}`, matchQueue)

            message.channel.send(queueEmbed)
        }
        
	},
};
