// main.js is basicly what makes the bot run. There are more comments throughout that help descripe some elements.


const Discord = require('discord.js');
const config = require('dotenv').config();
const Keyv = require('keyv');


const client = new Discord.Client({ partials: ["MESSAGE", "CHANNEL", "REACTION"] });
const webhookClient = new Discord.WebhookClient(config.webhookID, config.webhookToken);


const prefix = '!';

const fs = require('fs');

client.commands = new Discord.Collection();

for (const folder of commandFolders) {
	const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const command = require(`./commands/${folder}/${file}`);
		client.commands.set(command.name, command);
	}
}

client.on("ready", () => {
    client.user.setActivity(`https://github.com/Heptagram-Bot/Heptagram`);
    console.log(`Bot is online and ready for use!`);
});

client.on('message', (msg) => {
    if (msg.content === 'Hi') msg.reply('Hello!');
});


//All commands must be entered down here in order to work.

client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === 'ping') {
        client.commands.get('ping').execute(message, args, Discord);

        // You can copy and paste one of these modules on the bottom to help you if you need.
        //   } else if (command == 'admin') {
        //       client.commands.get('admin').execute(message, args, Discord);
        //
    } else if (command == 'admin') {
        client.commands.get('admin').execute(message, args, Discord);

    } else if (command == 'clear') {
        client.commands.get('clear').execute(message, args, Discord);

    } else if (command == 'wipe') {
        client.commands.get('wipe').execute(message, args, Discord);

    } else if (command == 'invite') {
        client.commands.get('invite').execute(message, args, Discord);

    } else if (command == 'kick') {
        client.commands.get('kick').execute(message, args, Discord);

    } else if (command == 'ban') {
        client.commands.get('ban').execute(message, args, Discord);

    } else if (command == 'mute') {
        client.commands.get('mute').execute(message, args, Discord);

    } else if (command == 'unmute') {
        client.commands.get('unmute').execute(message, args, Discord);

    } else if (command == 'reactionrole') {
        client.commands.get('reactionrole').execute(message, args, Discord, client);

    }


});

client.login(process.env.BOT_TOKEN)
