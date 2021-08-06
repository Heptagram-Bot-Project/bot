const { colors } = require('../../config.json');

module.exports = {
	name: 'slap',
	description: 'Slaps a user',
	category: 'Fun',
	minArgs: 1,
	maxArgs: 1,
	expectedArgs: "<@user you want to slap>",
	cooldown: '1m',

	execute: async (message) => {
		const member = message.message.mentions.members.first();

		await message.message.channel.send({ embed: {
			color: (colors.heptagram),
			title: message.message.author.username + ' slapped :raised_back_of_hand: ' + member.displayName + ', ' + member.displayName + ' is now in the hospital! :hospital:',
			timestamp:new Date(),
		} });
	},
};