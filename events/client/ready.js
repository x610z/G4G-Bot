// module.exports = {
// 	eventName: "ready",
// 	callback: (Discord, client) => {
// 		console.log("G4G Bot is online");
// 	},
// };

module.exports.config = {
	eventName: "ready",
	description: "When bot is ready",
};

module.exports.run = (Discord, client, message) => {
	console.log("G4G Bot is online");
};
