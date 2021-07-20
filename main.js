const Discord = require('discord.js');
const chalk = require('chalk');
const distube = require('distube');
const WOKCommands = require('wokcommands');

const { token, colors, MongoDB, IDs } = require('./config.json');
const antiAd = require('./features/anti-ad');

const client = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });

client.distube = new distube(client, { searchSongs: false, emitNewSongOnly: true });
client.distube
	.on('playSong', (message, queue, song) => message.channel.send(new Discord.MessageEmbed()
		.setTitle('Playing')
		.setDescription(`Playing \`${song.name}\` - \`${song.formattedDuration}\`\nRequested by: ${song.user}`)),
	)
	.on('addSong', (message, queue, song) => message.channel.send(new Discord.MessageEmbed()
		.setTitle('Queued')
		.setDescription(`Added ${song.name} - \`${song.formattedDuration}\` to the queue by ${song.user}`)));

client.on('ready', async () => {

	client.user.setStatus('online');
	client.user.setActivity(`${client.guilds.cache.size} servers!`, { type: 'WATCHING' });


	console.log(chalk.magenta('Starting Heptagram\nNode version: ' + process.version + '\nDiscord.js version: ' + Discord.version));
	console.log(chalk.green(`Logged in as ${client.user.username}. Ready on ${client.guilds.cache.size} servers, for a total of ${client.users.cache.size} users`));

	new WOKCommands(client, {
		commandsDir: 'commands',
		featuresDir: 'features',
		showWarns: true,
		del: -1,
		ignoreBots: true,
		dbOptions: {
			keepAlive: true,
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useFindAndModify: false,
		},
		testServers: [`${IDs.ServerID}`],
	})
		.setBotOwner([`${IDs.OwnerID}`])
		.setDefaultPrefix('!')
		.setColor(colors.heptagram)
		.setMongoPath(MongoDB);

	console.log(chalk.blueBright('Bot online and Ready!'));

});

antiAd(client);

client.login(token);
