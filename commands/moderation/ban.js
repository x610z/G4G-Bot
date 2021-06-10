module.exports = {
	commands: ["ban"],
	expectedArgs: ['<user>'],
	minArgs: 1,
	maxArgs: 1,
	permissions: ['ADMINISTRATOR', "BAN_MEMBERS"],
	requiredRoles: [],
	callback: (message, arguments, text, client, Discord) => {
		//Codigo a ejecutar
	},
};