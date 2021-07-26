const { cdn, colors } = require('../../config.json');
const Discord = require('discord.js');

module.exports = {
	name: 'info',
	description: 'Displays info about bot.',
	category: 'Info',
	minArgs: 0,
	maxArgs: 0,
	expectedArgs: "",

	execute: ({ message, prefix }) => {

		const embed = new Discord.MessageEmbed()
			.setTitle('Heptagram Bot Info:')
			.setColor(colors.heptagram)
			.setDescription('This is the Heptagram discord bot. Heptagram is the open-source multipurpose discord bot with the goal to be the single needed bot for any server.')
			.addFields(
				{ name: 'Bot Help:', value: `You can run \`${prefix}repo\` for our repo, \`${prefix}support\` for a link to our support server, or \`${prefix}server\` for stats and info about this server. `, inline: true },
				{ name: 'More info:', value: 'You can find out more about Heptagram in our support server or on our GitHub Repository.', inline: true },
			)
			.setTimestamp()
			.setFooter("Message sent by the Heptagram Bot", `${cdn.sqlogo}`);

		message.channel.send(embed);

	},
};