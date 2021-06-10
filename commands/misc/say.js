module.exports = {
	commands: "say",
	expectedArgs: "<Text>",
	minArgs: 1,
	callback: (message, arguments, text) => {
		//console.log(message, arguments);
		message.channel.send(text);
	},
};
