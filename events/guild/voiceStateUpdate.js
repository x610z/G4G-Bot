let connected = new Date();
let left = new Date();
let elapsed = 0;

module.exports.config = {
	eventName: "voiceStateUpdate",
	description: "Detects voice state updates",
};

module.exports.run = (Discord, client, oldState, newState) => {
	//console.log(oldState, newState);

	if (newState.channelID === null) {
		console.log(`User left a channel -> ${oldState.channelID}`);
		left = new Date();

		elapsed = left.getTime() - connected.getTime();
		console.log(
			`The user was connected for ${Math.floor(elapsed / 1000)} seconds`
		);
	} else if (oldState.channelID === null) {
		console.log(`User joined a channel -> ${newState.channelID}`);
		connected = new Date();
		console.log(connected);
	} else {
		console.log(
			`User moved channels -> ${oldState.channelID} to ${newState.channelID}`
		);
	}
};

module.exports.time = {
	connected: connected,
	disconnected: left,
};
