const DiscordJS = require('discord.js');

module.exports = (client)=>{
    client.on('messageDelete', message =>{
        if(message.channel.name !== 'g4g-logs'){
            client.channels.cache.get('822221190898515978').send(new DiscordJS.MessageEmbed()
                .setTitle('Message Deleted')
                .addField('Author', message.author.username)
                .addField('Message', message.cleanContent)
                .setThumbnail(message.author.avatarURL)
                .setColor('0x00AAFF')
            )
        }
    })
}