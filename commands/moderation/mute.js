module.exports = {
	commands: ["mute"],
	expectedArgs: ['<user> [time]'],
	minArgs: 1,
	maxArgs: 2,
	permissions: ['ADMINISTRATOR', "MUTE_MEMBERS"],
	requiredRoles: [],
	callback: (message, arguments, text, client, Discord) => {
		//Codigo a ejecutar

		//Crear un rol muted cuando el bot entra al sv
		//Antes de ejecutar el comando verificar si el rol existe
		//Hacer temporizador para el tiempo del mute
	},
};