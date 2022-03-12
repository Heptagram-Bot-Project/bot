const { Intents } = require ("discord.js");

const config = {
  "emoji" : {
    "HeptaLove" : "951855088488579132",
    "rupee" : "951855035610972210",
    "verifyblack" : "951863095238754324"
  },
  "admins": ["722121621610954773"],
  "support": [],
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.DIRECT_MESSAGES,
    Intents.FLAGS.GUILD_BANS,
    Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
    Intents.FLAGS.GUILD_INVITES,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
  ],
  partials: ['MESSAGE', 'CHANNEL', 'REACTION'],

  /*
  * Default per-server settings. These settings are entered in a database on first load, 
  * And are then completely ignored from this file. To modify default settings, use the `conf` command.
  * DO NOT REMOVE THIS BEFORE YOUR BOT IS LOADED AND FUNCTIONAL.
  */
  "defaultSettings" : {
    "prefix": "~",
    "modLogChannel": "mod-log",
    "modRole": "Moderator",
    "adminRole": "Administrator",
    "systemNotice": "true", 
    "commandReply": "true",
    "autoPublishChannel": "",
  },


  permLevels: [
    { level: 0,
      name: "User", 
      check: () => true
    },

    { level: 2,
      name: "Moderator",
      check: (message) => {
        try {
          const modRole = message.guild.roles.cache.find(r => r.name.toLowerCase() === message.settings.modRole.toLowerCase());
          if (modRole && message.member.roles.cache.has(modRole.id)) return true;
        } catch (e) {
          return false;
        }
      }
    },

    { level: 3,
      name: "Administrator", 
      check: (message) => {
        try {
          const adminRole = message.guild.roles.cache.find(r => r.name.toLowerCase() === message.settings.adminRole.toLowerCase());
          return (adminRole && message.member.roles.cache.has(adminRole.id));
        } catch (e) {
          return false;
        }
      }
    },
    
    { level: 4,
      name: "Server Owner", 
      check: (message) => {
        const serverOwner = message.author ?? message.user;
        return message.guild?.ownerId === serverOwner.id;
      }
    },
    
    { level: 8,
      name: "Bot Support",
      check: (message) => {
        const botSupport = message.author ?? message.user;
        return config.support.includes(botSupport.id);
      }
    },

    { level: 9,
      name: "Bot Admin",
      check: (message) => {
        const botAdmin = message.author ?? message.user;
        return config.admins.includes(botAdmin.id);
      }
    },
    

    { level: 10,
      name: "Bot Owner", 
      check: (message) => {
        const owner = message.author ?? message.user;
        return owner.id === process.env.OWNER_ID;
      }
    }
  ],

  autoPublishEmojis: [
    { CLOCK: '⏲️' },
    { MEGAPHONE: '📢' },
    { EXCLAMATION: '❗' },
    { ROTATING_LIGHT: '🚨'}
  ]
};

module.exports = config;
