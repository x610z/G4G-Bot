module.exports = {
	commands: ["warn"],
	expectedArgs: ['<user> [reason]'],
	minArgs: 1,
	maxArgs: 2,
	permissions: ['ADMINISTRATOR', "MUTE_MEMBERS"],
	requiredRoles: [],
	callback: (message, arguments, text, client, Discord) => {
		//Codigo a ejecutar

		//A los 3 warns en 1 dia, mute por 1h
	},
};