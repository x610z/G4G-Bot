module.exports = {
	commands: ["report"],
	expectedArgs: ['<channel> <game> <team>'],
	minArgs: 3,
	maxArgs: 3,
	permissions: [],
	requiredRoles: [],
	callback: (message, arguments, text, client, Discord) => {
		//Codigo a ejecutar

        //Verificar que la partida exista
        //Dar los puntos a los ganadores
        //Que sea reportable 1 sola vez
	},
};