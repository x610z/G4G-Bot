const DiscordJS = require('discord.js');
require('dotenv').config();

const guildId = '490719740143075348'
const client = new DiscordJS.Client();

const apiEndpoint = 'https://discord.com/api/v8/applications/794002662197821482/guilds/490719740143075348/commands/penguin'


//Commands
const pingCommand = require('./commands/ping');
const modCommand = require('./commands/moderation/modCommands');
const embedCommand = require('./commands/embed');
const clearCommand = require('./commands/moderation/clear.js')
//Events
const messageDelete = require('./events/event-logger/messageDeleted');

const getApp = (guildId) => {
    const app = client.api.applications(client.user.id)
    if (guildId) {
        app.guilds(guildId)
    }
    return app
}
const createAPIMessage = async (interaction, content) => {
    const { data, files } = await DiscordJS.APIMessage.create(
        client.channels.resolve(interaction.channel_id),
        content
    )
        .resolveData()
        .resolveFiles()

    return { ...data, files }
}

const reply = async (interaction, response) => {
    let data = {
        content: response
    }

    //Check for embeds
    if (typeof response === 'object') {
        data = await createAPIMessage(interaction, response)
    }

    client.api.interactions(interaction.id, interaction.token).callback.post({
        data: {
            type: 4,
            data
        }
    })
}

client.on('ready', async () => {
    console.log('G4G Bot is online');

    //Create commands
    await getApp(guildId).commands.post({
        data: pingCommand,
    })
    await getApp(guildId).commands.post({
        data: modCommand,
    })
    await getApp(guildId).commands.post({
        data: embedCommand,
    })
    await getApp(guildId).commands.post({
        data: clearCommand,
    })

    //Get commands
    const commands = await getApp(guildId).commands.get()
    

    //Delete commands
    //await getApp(guildId).commands('822470719950291005').delete()

    //console.log(commands)
    
    //Command reply
    client.ws.on('INTERACTION_CREATE', async (interaction) => {
        const { name, options } = interaction.data;
        const command = name.toLowerCase();
        const args = {};

        if (options) {
            for (const option of options) {
                const { name, value } = option
                args[name] = value
            }
        };
        
    //Command Handlers
        //Ping Command
        if (command === 'ping'){
            reply(interaction, 'pong')
            //client.api.interactions(interaction.id, interaction.token).callback.post({})
        } 
        //Embed Command
        else if (command === 'embed') {
            const embed = new DiscordJS.MessageEmbed()
                .setTitle('Example Embed')
            
            for (const arg in args) {
                const value = args[arg]
                embed.addField(arg, value)
            }

            reply(interaction, embed)
        } 
        //Mod Command
        else if (command === 'mod') {
            const subCommand = interaction.data.options[0].name;
            if (subCommand === 'warn'){
                console.log('warn')
            } else if (subCommand === 'kick'){
                console.log('kick')
            } else if (subCommand === 'ban'){
                console.log('ban')
            }
        }
        //Clear Command
        else if (command === 'clear'){
            const guild = await client.guilds.cache.get(interaction.guild_id)
            const member = guild.members.cache.get(interaction.member.user.id)
            if(member.hasPermission('ADMINISTRATOR')){
                console.log('has admin')
                reply(interaction, 'has admin')
                
            } else {
                console.log("you don't have access to that command")
                reply(interaction, "you don't have access to that command")
            }
        }
        
    })

    /* client.guilds.cache.forEach(guild => {
        console.log(guild)
    }) */

    
    
    messageDelete(client)
})




//Join to Create
const joinToCreate = require('./events/joinToCreate');
joinToCreate(client);


client.login(process.env.TOKEN);