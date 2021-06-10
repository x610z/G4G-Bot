module.exports = {
	commands: "serverinfo",
	minArgs: 0,
	maxArgs: 1,
	expectedArgs: "<Members> <Info>",
	callback: (message, arguments, text, client, Discord) => {
		console.log(message.guild);
		//Return info as embed
		const { guild } = message;
		const { name, owner, region, memberCount, createdAt } = guild;
		const icon = guild.iconURL()

		const embed = new Discord.MessageEmbed()
			.setTitle("Server Info")
			.setThumbnail(icon)
			.addFields(
				{
					name: "Server Name",
					value: name,
				},
				{
					name: "Owner",
					value: owner
				},
				{
					name: "Created at",
					value: createdAt
				},
				{
					name: "Region",
					value: region
				},
				{
					name: "Members",
					value: memberCount
				},)


		message.channel.send(embed);
	},
};
