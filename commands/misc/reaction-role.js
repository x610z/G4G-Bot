module.exports = {
	commands: "reaction-role",
	minArgs: 3,
	expectedArgs: "<Message> <Reaction> <Reaction Description>",
	callback: (message, arguments, text) => {
		message.channel.send("Reaction Role Command")
	},
};
