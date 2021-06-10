module.exports = {
	commands: ["clear", 'c'],
	minArgs: 1,
	maxArgs: 1,
	expectedArgs: "<Num>",
	permissions: ['ADMINISTRATOR', "MANAGE_MESSAGES"],
	callback: async (message, arguments, text) => {

		if (isNaN(arguments)){
			message.reply('Please enter a number!');
			return	
		} else if (arguments[0] < 1 || arguments[0] > 100){
			message.reply("You can only delete 1-100 messages")
			return
		} else {
			message.channel.bulkDelete(parseInt(arguments[0]) + 1)
			message.channel.send(`Deleted ${arguments[0]} message/s`).then((sent)=>{
				setTimeout(()=>{
					sent.delete()
				}, 5000)
			})
		}		
	},
};
