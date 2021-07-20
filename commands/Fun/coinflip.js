const { MessageEmbed } = require('discord.js');
const { colors } = require('../../config.json');

module.exports = {
	name: 'coinflip',
	category: 'Fun',
	description: 'Flips a coin for heads or tails.',
	execute({ message }) {
		const embed = new MessageEmbed()
			.setColor(colors.heptagram)
			.setTitle('A coin was flipped..')
			.setTimestamp()
			.setFooter("Message sent by the Heptagram Bot", 'https://cdn.heptagram.xyz/Logos/HeptagramLogo%28square%29.png');

		const number = Math.floor(Math.random() * 2);

		if (number === 0) embed.addField('Result', '`Heads`');
		else embed.addField('Result', '`Tails`');

		message.channel.send(embed);
	},
};