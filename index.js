const path = require("path");
const fs = require("fs");
const Discord = require("discord.js");
const client = new Discord.Client();

const config = require("./config.json");

client.commands = new Discord.Collection();
client.events = new Discord.Collection();

const baseFile = "commandHandler.js";
["commandHandler", "eventHandler"].forEach((handler) => {
	require(`./handlers/${handler}`)(client, Discord);
});
const commandBase = require(`./handlers/${baseFile}`);

commandBase.listen(client, Discord);

client.login(config.token);

// const commandFiles = fs
// 	.readdirSync("./commands/")
// 	.filter((file) => file.endsWith(".js"));
// for (const file of commandFiles) {
// 	const command = require(`./commands/${file}`);
// 	client.commands.set(command.name, command);
// }

// const readCommands = (dir) => {
// 	const files = fs.readdirSync(path.join(__dirname, dir));

// 	for (const file of files) {
// 		const stat = fs.lstatSync(path.join(__dirname, dir, file));
// 		//Read folder
// 		if (stat.isDirectory()) {
// 			readCommands(path.join(dir, file));
// 		} else {
// 			const option = require(path.join(__dirname, dir, file));
// 			commandBase(option);
// 		}
// 	}
// };

// readCommands("commands");

//const guildId = "490719740143075348";

//client.commands = new DiscordJS.Collection();

//let slashCommands = [];

// async function getFiles(path = "./commands/") {
// 	const entries = await fs.readdir(path, { withFileTypes: true });

// 	const files = entries
// 		.filter((file) => !file.isDirectory())
// 		.map((file) => ({ ...file, path: path + file.name }));

// 	const folders = entries.filter((folder) => folder.isDirectory());

// 	for (const folder of folders)
// 		slashCommands.push(...(await getFiles(`${path}${folder.name}/`)));
// 	console.log(files);
// 	return files;
// }
//getFiles()

//const apiEndpoint = 'https://discord.com/api/v8/applications/794002662197821482/guilds/490719740143075348/commands/penguin'

// const getApp = (guildId) => {
// 	const app = client.api.applications(client.user.id);
// 	if (guildId) {
// 		app.guilds(guildId);
// 	}
// 	return app;
// };
// const createAPIMessage = async (interaction, content) => {
// 	const { data, files } = await DiscordJS.APIMessage.create(
// 		client.channels.resolve(interaction.channel_id),
// 		content
// 	)
// 		.resolveData()
// 		.resolveFiles();

// 	return { ...data, files };
// };
// const reply = async (interaction, response) => {
// 	let data = {
// 		content: response,
// 	};

// 	//Check for embeds
// 	if (typeof response === "object") {
// 		data = await createAPIMessage(interaction, response);
// 	}

// 	client.api.interactions(interaction.id, interaction.token).callback.post({
// 		data: {
// 			type: 4,
// 			data,
// 		},
// 	});
// };

// fs.readdir('./commands/', (err, files) => {

//     if (err) console.log(err);

//     let jsFiles = files.filter(file => file.endsWith('.js'));
//     if (jsFiles.length <= 0) return console.log('No hay comandos para cargar.');

//     console.log(`Cargando ${jsFiles.length} comandos.`);

//     for (const file of jsFiles) {
//         const command = require(`./commands/${file}`);
//         client.commands.set(command.name, command);
//         slashCommands.push(command)
//     }

//     console.log(`${jsFiles.length} de ${jsFiles.length} comandos cargados.`);
// });

// client.on("ready", async () => {
// 	console.log("G4G Bot is online");

// 	// slashCommands.forEach(command => {
// 	//     //console.log(command)
// 	//     getApp(guildId).commands.post({
// 	//         data: command,
// 	//     })
// 	// })

// 	// //Create commands
// 	// await getApp(guildId).commands.post({
// 	//     data: pingCommand,
// 	// })

// 	// //Get commands
// 	//const commands = await getApp(guildId).commands.get()

// 	// //Delete commands
// 	//await getApp(guildId).commands('823302130894372874').delete()

// 	//console.log(commands)
// });

//Command reply
// client.ws.on('INTERACTION_CREATE', async (interaction) => {

//     const { member, data, guild_id, channel_id } = interaction
//     const { name, options } = data

//     const command = name.toLowerCase();
//     const guild = client.guilds.cache.get(guild_id)
//     const channel = guild.channels.cache.get(channel_id)
//     const args = {};

//     if (options) {
//         for (const option of options) {
//             args[option.name] = option.value;
//         }
//     };

//     if(command === 'pong'){
//         console.log(slashCommands[0].callback)
//     }
// })

//Join to Create
/* const joinToCreate = require('./events/joinToCreate');
joinToCreate(client); */
