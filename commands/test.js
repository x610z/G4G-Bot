
module.exports = {
	commands: ["test"],
	//alias: "t",
	//description: "",
	minArgs: 1,
	//maxArgs: null,
	expectedArgs: ["<text>"],
	//permissions: [],
	//requiredRoles: [],
	callback: (message, arguments, text, client, Discord) => {
		message.channel.send(`This is a test command: ${message}`);
	},
};

//Posible formato comandos
// module.exports = {
// 	config = {
// 		commands: "test",
// 		//alias: "",
// 		//description: "",
// 		minArgs: 0,
// 		//maxArgs: null,
// 		expectedArgs: ["<text>"],
// 		//permissions: [],
// 		//requiredRoles: [],
// 	},
// 	callback: (message, arguments, text, client, Discord) => {
// 		console.log(message)
// 		message.channel.send(`This is a test command: ${message}`);
// 	},
// };
