const config = require("../config.json");
const joinToCreateMap = new Map();

module.exports = function (client) {
    
    const description = {
        name: "joinToCreate",
        filename: "joinToCreate.js",
        version: "3.2"
    }
     //SECURITY LOOP
    new Promise(resolve => {
        setInterval(() => {
        resolve(2);
            try{
            const guild = client.guilds.cache.get(config.guildID);
            const channels = guild.channels.cache.map(ch => ch.id)
            for (let i = 0; i < channels.length; i++) {
                const key = `tempVoiceChannel_${guild.id}_${channels[i]}`;
                if (joinToCreateMap.get(key)) {
                var vc = guild.channels.cache.get(joinToCreateMap.get(key));
                if (vc.members.size < 1) {
                    joinToCreateMap.delete(key);
                    return vc.delete();
                } else {}
                }
            }
        }catch{}
        }, 10000)
    })
    
  //log that the module is loaded
      console.log(` :: ⬜️ Module: ${description.name} | Loaded version ${description.version} from ("${description.filename}")`)

  //voice state update event to check joining/leaving channels
    client.on("voiceStateUpdate", (oldState, newState) => {
        // SET CHANNEL NAME STRING
        //IGNORE BUT DON`T DELETE!
        let oldParentName = "unknown";
        let oldChannelName = "unknown";
        let oldChannelID = "unknown";
        if (oldState && oldState.channel && oldState.channel.parent && oldState.channel.parent.name) oldParentName = oldState.channel.parent.name
        if (oldState && oldState.channel && oldState.channel.name) oldChannelName = oldState.channel.name
        if (oldState && oldState.channelID) oldChannelID = oldState.channelID
        let newParentName = "unknown"
        let newChannelName = "unknown"
        let newChanelID = "unknown"
        if (newState && newState.channel && newState.channel.parent && newState.channel.parent.name) newParentName = newState.channel.parent.name
        if (newState && newState.channel && newState.channel.name) newChannelName = newState.channel.name
        if (newState && newState.channelID) newChanelID = newState.channelID
        if (oldState.channelID) {
          if (typeof oldState.channel.parent !== "undefined")  oldChannelName = `${oldParentName}\n\t**${oldChannelName}**\n*${oldChannelID}*`
          else  oldChannelName = `-\n\t**${oldParentName}**\n*${oldChannelID}*`
        }
        if (newState.channelID) {
          if (typeof newState.channel.parent !== "undefined") newChannelName = `${newParentName}\n\t**${newChannelName}**\n*${newChanelID}*`
          else newChannelName = `-\n\t**${newChannelName}**\n*${newChanelID}*`
        }
        // JOINED V12
        if (!oldState.channelID && newState.channelID) {
          if(newState.channelID !== config["join-to-create"]) return;  //if its not the joinToCreateChannel skip
          joinToCreateChannel(newState);   //load the function
        }
        // LEFT V12
        if (oldState.channelID && !newState.channelID) {
          //get the joinToCreateChannel id from the map
          if (joinToCreateMap.get(`tempVoiceChannel_${oldState.guild.id}_${oldState.channelID}`)) {
            //fetch it from the guild
            var vc = oldState.guild.channels.cache.get(joinToCreateMap.get(`tempVoiceChannel_${oldState.guild.id}_${oldState.channelID}`));
            //if the channel size is below one
            if (vc.members.size < 1) { 
              //delete it from the map
              joinToCreateMap.delete(`tempVoiceChannel_${oldState.guild.id}_${oldState.channelID}`); 
              //log that it is deleted
              console.log(" :: " + oldState.member.user.username + "#" + oldState.member.user.discriminator + " :: Room deleted")
              //delete the voice channel
              return vc.delete(); 
          }
            else {
            }
          }
        }
        // Switch v12
        if (oldState.channelID && newState.channelID) {
        
          if (oldState.channelID !== newState.channelID) {
            //if its the join to create channel
            if(newState.channelID===config["join-to-create"]) 
            //make a new channel
            joinToCreateChannel(oldState);  
            //BUT if its also a channel ín the map (temp voice channel)
            if (joinToCreateMap.get(`tempVoiceChannel_${oldState.guild.id}_${oldState.channelID}`)) {
              //fetch the channel
              var vc = oldState.guild.channels.cache.get(joinToCreateMap.get(`tempVoiceChannel_${oldState.guild.id}_${oldState.channelID}`));
              //if the size is under 1
              if (vc.members.size < 1) { 
                //delete it from the map
                  joinToCreateMap.delete(`tempVoiceChannel_${oldState.guild.id}_${oldState.channelID}`); 
                //log it 
                  console.log(" :: " + oldState.member.user.username + "#" + oldState.member.user.discriminator + " :: Room deleted")
                //delete the room
                  return vc.delete(); 
            }
            else {
            }
            }
          }
      }
    })
      async function joinToCreateChannel(user) {
        //log it 
        console.log(" :: " + user.member.user.username + "#" + user.member.user.discriminator + " :: Created a Room")
        //user.member.user.send("This can be used to message the member that a new room was created")
        await user.guild.channels.create(`${user.member.user.username}'s Room`, {
          type: 'voice',
          parent: '820891607133847564', //or set it as a category id
        }).then(async vc => {
          //move user to the new channel
          user.setChannel(vc);
          //set the new channel to the map
          joinToCreateMap.set(`tempVoiceChannel_${vc.guild.id}_${vc.id}`, vc.id);
          //change the permissions of the channel
          await vc.overwritePermissions([
            {
              id: user.id,
              allow: ['MANAGE_CHANNELS'],
            },
            {
              id: user.guild.id,
              allow: ['VIEW_CHANNEL'],
            },
          ]);
        })
      }
}



