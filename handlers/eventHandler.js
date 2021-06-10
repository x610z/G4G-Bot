const fs = require("fs");

module.exports = (client, Discord) => {
	let i = 0;
	console.log(`« Preparing to load events »`);
	const loadDir = (dirs) => {
		const eventFiles = fs
			.readdirSync(`./events/${dirs}`)
			//.readdirSync(`./events/client`)
			.filter((file) => file.endsWith(".js"));

		for (const file of eventFiles) {
			const event = require(`../events/${dirs}/${file}`);
			//const event = require(`../events/client/${file}`);

			//const eventName = require(`../events/${dirs}/${file}`);
			const { eventName, description } = event.config;
			console.log(`\t► Loading event: ${eventName}`);
			i++;

			client.on(eventName, event.run.bind(null, Discord, client));

			//Do
			//client.events.set("event.name, description?")

			//Test
			// const { eventName, callback } = event;
			// client.on(`${eventName}`, callback(Discord, client));
		}
	};

	["client", "guild"].forEach((e) => loadDir(e));
	//["client"].forEach((e) => loadDir(e));
	console.log(`« ${i} events loaded »`);
};
