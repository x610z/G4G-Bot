const { prefix } = require("../config.json");
const fs = require("fs");
const path = require("path");

const validatePermissions = (permissions) => {
	const validPermissions = [
		"ADMINISTRATOR", //(implicitly has all permissions, and bypasses all channel overwrites)
		"CREATE_INSTANT_INVITE", //(create invitations to the guild)
		"KICK_MEMBERS",
		"BAN_MEMBERS",
		"MANAGE_CHANNELS", //(edit and reorder channels)
		"MANAGE_GUILD", //(edit the guild information, region, etc.)
		"ADD_REACTIONS", //(add new reactions to messages)
		"VIEW_AUDIT_LOG",
		"PRIORITY_SPEAKER",
		"STREAM",
		"VIEW_CHANNEL",
		"SEND_MESSAGES",
		"SEND_TTS_MESSAGES",
		"MANAGE_MESSAGES", //(delete messages and reactions)
		"EMBED_LINKS", //(links posted will have a preview embedded)
		"ATTACH_FILES",
		"READ_MESSAGE_HISTORY", //(view messages that were posted prior to opening Discord)
		"MENTION_EVERYONE",
		"USE_EXTERNAL_EMOJIS", //(use emojis from different guilds)
		"VIEW_GUILD_INSIGHTS",
		"CONNECT", //(connect to a voice channel)
		"SPEAK", //(speak in a voice channel)
		"MUTE_MEMBERS", //(mute members across all voice channels)
		"DEAFEN_MEMBERS", //(deafen members across all voice channels)
		"MOVE_MEMBERS", //(move members between voice channels)
		"USE_VAD", //(use voice activity detection)
		"CHANGE_NICKNAME",
		"MANAGE_NICKNAMES", //(change other members' nicknames)
		"MANAGE_ROLES",
		"MANAGE_WEBHOOKS",
		"MANAGE_EMOJIS",
	];

	for (const permission of permissions) {
		if (!validPermissions.includes(permission)) {
			throw new Error(`Unknown permission node ${permission}`);
		}
	}
};

//const allCommands = {};

//--------------------------------------------------------
//Get commands
module.exports = (client, Discord) => {
	const x = __dirname.split("\\");
	x.pop();
	const baseDir = x.join("\\");

	let i = 0;
	console.log("« Preparing to load commands »");
	const readCommands = (dir) => {
		const files = fs.readdirSync(path.join(baseDir, dir));

		const checkJS = (check) => {
			check.filter((file) => file.endsWith(".js"));
		};

		for (const file of files) {
			const pathInfo = fs.lstatSync(path.join(baseDir, dir, file));

			//Read folder
			if (pathInfo.isDirectory()) {
				readCommands(path.join(dir, file));
			} else {
				console.log(pathInfo.isFile)
				const cmd = require(path.join(baseDir, dir, file));
				i++;
				let { 
					commands, 
					permissions = [], 
				} = cmd;
				
				//Ensure the command and aliases are in an array
				if (typeof commands === "string") {
					commands = [commands];
				}

				//Ensure the permissions are in an array and are all valid
				if (permissions.length) {
					if (typeof permissions === "string") {
						permissions = [permissions];
					}
					validatePermissions(permissions);
				}

				for (const command of commands) {
					client.commands.set(command, cmd, permissions);
				}

				console.log(`\t► Loading command: ${commands.join(" / ")}`);
			}
		}
	};
	readCommands("commands");
	console.log(`« ${i} commands loaded »`);
};

//Listen to messages and execute commands
module.exports.listen = (client, Discord)=> {
	//Listen for messages
	client.on("message", (message) => {
		const { member, content, guild } = message;

		//Split on any number of arguments
		const arguments = content.split(/ +/g)
		//console.log(arguments)

		//Remove the command which is the first index
		const name = arguments.shift().toLowerCase();
		

		if(name.startsWith(prefix) && !(message.author.bot)){
			//client.commands.forEach(cmd => console.log(cmd))
			//const command = client.commands.get(name.replace(prefix, ""))
			const command = client.commands.get(name.replace(prefix, ""))

			//console.log(client.commands.get(name.replace(prefix, "")))
			if(!command){
				return
			}

			const {
				permissions,
				permissionError = "You do not have permission to run this command",
				requiredRoles = [],
				minArgs = 0,
				maxArgs = null,
				expectedArgs,
				callback
			}= command

			//A command has been run

			//Ensure user permissions
			if (member.hasPermission('ADMINISTRATOR')) {
				console.log("El admin")
			} else {
				//Hacer permissions.forEach?
				if (permissions.length) {
					if (permissions.length === 1){
						if (!member.hasPermission(permissions)) {
							message.reply(permissionError);
							return;
						}
					} else {
						for (const permission of permissions) {
							console.log(permission)
							if (!member.hasPermission(permission)) {
								message.reply(permissionError);
								return;
							}
						}
					}
				}
	
				//Ensure the user has the required roles
				for (const requiredRole of requiredRoles) {
					const role = guild.roles.cache.find(
						(role) => role.name === requiredRole
					);
	
					if (!role || member.roles.cache.has(role.id)) {			
						message.reply(
							`You must have the ${requiredRole} role to use this command`
						);
						return;
					}
				}
	
			}
			//Ensure we have the correct number of arguments
			if (arguments.length < minArgs || (
				maxArgs !== null && arguments.length > maxArgs
			)){
				message.reply(`Incorrect syntax! Use ${name} ${expectedArgs}`)
				return
			}

			//Handle the custom command code
			callback(message, arguments, arguments.join(' '), client, Discord)
		}
	});
}

//--------------------------------------------------------

// module.exports = (commandOptions) => {
// 	let {
// 		commands,
// 		permissions = [],
// 	} = commandOptions

// 	//Ensure the command and aliases are in an array
// 	if (typeof commands === "string") {
// 		commands = [commands];
// 	}

// 	//Ensure the permissions are in an array and are all valid
// 	if (permissions.length) {
// 		if (typeof permissions === "string") {
// 			permissions = [permissions];
// 		}
// 		validatePermissions(permissions);
// 	}

// 	for (const command of commands){

// 		allCommands[command] = {
// 			...commandOptions,
// 			commands,
// 			permissions
// 		}
// 	}
// 	console.log(`Loading command "${commands}"`)
// };

//-------------------------------------------------------------

// const fs = require("fs");
// const { prefix } = require("../config.json");

// module.exports = (client, Discord) => {
// 	const command_files = fs
// 		.readdirSync("./commands/")
// 		.filter((file) => file.endsWith(".js"));

// 	for (const file of command_files) {
// 		const command = require(`../commands/${file}`);
// 		if (command.name) {
// 			client.commands.set(command.name, command);
// 			//console.log(`Command ${command.name}: ${command}`);
// 			console.log(command);
// 		} else {
// 			continue;
// 		}
// 	}
// };
