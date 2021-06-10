module.exports = {
	commands: ["kick"],
	expectedArgs: ['<user>'],
	minArgs: 1,
	maxArgs: 1,
	permissions: ['ADMINISTRATOR', "KICK_MEMBERS"],
	requiredRoles: [],
	callback: (message, arguments, text, client, Discord) => {
		//Codigo a ejecutar
	},
};