module.exports = (client) => {
	client.on("message", (message) => {
		/* if(message.channel.name === 'bot-test' && message.author.bot === false){
            //console.log(message)
            message.channel.send(new DiscordJS.MessageEmbed()
                .setThumbnail(message.author.avatarURL({size: 32}))
                .setTitle(`${message.author.username} ha hecho la pole`)
                .addField('Message', message.cleanContent)  
                .setColor('0x00AAFF')
            )
        } */
	});
};
