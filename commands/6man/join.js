
module.exports = {
	commands: [],
	minArgs: 0,
	maxArgs: 0,
	requiredRoles: [],
	callback: (message, arguments, text, client, Discord) => {
		//Codigo a ejecutar
        //console.log(matchQueue.includes(`<@${message.author.id}>`))
        console.log(matchQueue)

        //Check if user is already in queue
        if ((matchQueue.includes(`<@${message.author.id}>`)) === true){
            message.channel.send("You are already in the queue")
        } else if (matchQueue.length < players){
            matchQueue.push(`<@${message.author.id}>`)

            const joinEmbed = new Discord.MessageEmbed()
                .setDescription(`[${matchQueue.length}/${players}] <@${message.author.id}> joined the queue`)

            message.channel.send(joinEmbed)

            if (matchQueue.length === players) {
                message.channel.send("Picking teams")

                //Reset queue
                matchQueue = []
                //console.log(matchQueue)
                game++
            }
        }

	},
};
