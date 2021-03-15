const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json')

const command = require('./commands/command')
const joinToCreate = require('./events/joinToCreate');

client.on('ready', async ()=>{
    console.log('G4G Bot is online');

    command(client, 'ping', message => {
        message.channel.send('Pong!')
    })
})

joinToCreate(client);


client.on("message", msg => {
    if (msg.content === "ping"){
        msg.reply("pong")
    }
})


client.login(config.token);