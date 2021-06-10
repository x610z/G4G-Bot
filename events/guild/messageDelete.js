module.exports = (Discord, client, message) => {
	if (message.author.bot) {
		return;
	} else {
		message.channel.send(message.content);
	}
};

module.exports.config = {
	eventName: "messageDelete",
	description: "When a message is deleted",
};

module.exports.run = (Discord, client, message) => {
	console.log(message.content);
};
