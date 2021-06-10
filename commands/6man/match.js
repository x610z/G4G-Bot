const rank = "Rank B"
const teams = 2;
const players = 6;
const size = players / teams;
let game = 0
let matchQueue = new Array("pedrito", "juancito", "fulanito", "josefito")
let teamsArr = [];

//const matchQueue = new Map()
//Map(Guild, TextChannel, Queue)
//Map(message.guild.id, message.channel)

// const matchConstructor = {
//     guild: ","
//     textChannel: "",
//     queue: [],
//     game: 0,
//     teams: 2,
//     players: 4,
// }

module.exports = {
	commands: ["match", "m", "join", "j", "queue", "q"],
	minArgs: 0,
	maxArgs: 0,
	requiredRoles: [],
	callback: (message, arguments, text, client, Discord) => {
        //const serverQueue = matchQueue.get(message.guild.id)

        

        cmd = message.content
        //Check which command is used
        if (cmd === "!match" || cmd === "!m") {
            
        } else if (cmd === "!join" || cmd === "!j") {
            //Check if user is already in queue
            if (matchQueue.includes(`<@${message.author.id}>`) === true){ //(queueConstructor.queue.includes(`<@${message.author.id}>`) === true){
                const inQueueEmbed = new Discord.MessageEmbed()
                    .setDescription(`<@${message.author.id}> You are already in the queue`)

                message.channel.send(inQueueEmbed)
            } else if (matchQueue.length < players){//(queueConstructor.queue.length < players){
                //Add player to queue
                //queueConstructor.queue.push(`<@${message.author.id}>`)
                matchQueue.push(`<@${message.author.id}>`)

                //matchQueue.set(message.guild.id, message.channel.id, queueConstructor)
                //console.log(matchQueue)

                const joinEmbed = new Discord.MessageEmbed()
                    //.setDescription(`[${queueConstructor.queue.length}/${players}] <@${message.author.id}> joined the queue`)
                    .setDescription(`[${matchQueue.length}/${players}] <@${message.author.id}> joined the queue`)

                message.channel.send(joinEmbed)

                //If queue is full when user joins
                if (matchQueue.length === players){//(queueConstructor.queue.length === players) {   
                    //Calculate random teams
                    matchQueue.sort(() => Math.random() - 0.5);    

                    for (let i = 0; i < matchQueue.length; i += size) {
                        teamsArr.push(matchQueue.slice(i, i + size));
                    }
                    
                    const queueFull = new Discord.MessageEmbed()
                        .setDescription(`Queue is full. Picking teams...`)
                    message.channel.send(queueFull)

                    //Check if it's 1v1
                    if (players === 2){
                        const matchEmbed = new Discord.MessageEmbed()
                            .setTitle(`Game #${game} Started`)
                            .addField("Lobby:",rank)
                            .addField("Team 1", teamsArr[0])
                            .addField("Team 2", teamsArr[1])
                        message.channel.send(matchQueue.join(' '), matchEmbed)
                    } else {
                        //console.log(matchQueue)
                        console.log(teamsArr)
                        const matchEmbed = new Discord.MessageEmbed()
                            .setTitle(`Game #${game} Started`)
                            .addField("Lobby:",rank)
                            .addField("Team 1", teamsArr[0])
                            .addField("Team 2", teamsArr[1])
                        message.channel.send(matchQueue.join(' '), matchEmbed)
                    }



                    //Reset queue and add 1 to game number
                    matchQueue = []
                    game++
                    //queueConstructor.game = game++
                }
            }

            
        } else if  (cmd === "!queue" || cmd === "!q") {
            console.log(matchQueue)
            if (matchQueue.length === 0){//(!serverQueue){
                const emptyQueue = new Discord.MessageEmbed()
                    .setDescription(`The queue is empty`)
    
                message.channel.send(emptyQueue)             
            } else {
                //console.log(queueConstructor.queue)
                const queueEmbed = new Discord.MessageEmbed()
                    //.setTitle(`${rank} [${queueConstructor.queue.length}/${players}]`)
                    .setTitle(`${rank} [${matchQueue.length}/${players}]`)
                    //.addField(`Game: #${queueConstructor.game}`, queueConstructor.queue)
                    .addField(`Game: #${game}`, matchQueue)

                message.channel.send(queueEmbed)
            }
        }


        
        
	},
};
