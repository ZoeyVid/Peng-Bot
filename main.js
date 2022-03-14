const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_INTEGRATIONS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.DIRECT_MESSAGES] });
const { token } = require('./config.json');
const http = require('http');

client.once('ready', () => {
    console.log(`Ready! Logged in as ${client.user.tag}`);
	client.user.setActivity("Peng", { type: 'LISTENING' });
});

client.on("messageCreate", message => {
    if(message.guild) {
	if(!message.channel.permissionsFor(client.user).has("SEND_MESSAGES")) return;
    //Commands unsauber gelöst soll später Dynamisch in einer Json defeniert werden und über Command hinzugefügt und wieder entfernt werden
        if(message.content.toLowerCase().startsWith("peng") && !message.author.bot) {
         message.guild.members.fetch();
         var userliste = Array.from(message.guild.members.cache.values());
         var randomuser = userliste[Math.floor(Math.random() * userliste.length)];
          var min = 1;
          var max = 2;
          var pengstate = Math.round(Math.random() * (max - min)) + min;
          if(randomuser.nickname) var randomname = randomuser.nickname;
          if(!randomuser.nickname) var randomname = randomuser.displayName;
         if(pengstate === 1) {
             message.reply("Peng! Leider wurde <@" + message.author + "> von **" + randomname + "** erwischt!");
         } else {
             message.reply("Peng! Leider wurde **" + randomname + "** von <@" + message.author + "> erwischt!");
         };
     };
     if(message.content.toLowerCase().startsWith("pewpew") && !message.author.bot) {
        message.guild.members.fetch();
        var userliste = Array.from(message.guild.members.cache.values());
        var randomuser = userliste[Math.floor(Math.random() * userliste.length)];
         var min = 1;
         var max = 2;
         var pengstate = Math.round(Math.random() * (max - min)) + min;
         if(randomuser.nickname) var randomname = randomuser.nickname;
         if(!randomuser.nickname) var randomname = randomuser.displayName;
        if(pengstate === 1) {
            message.reply("Peng! Leider wurde <@" + message.author + "> von **" + randomname + "** erwischt!");
        } else {
            message.reply("Peng! Leider wurde **" + randomname + "** von <@" + message.author + "> erwischt!");
        };
    };
    if(message.content.toLowerCase().startsWith("ping") && !message.author.bot) {
        message.guild.members.fetch();
        var userliste = Array.from(message.guild.members.cache.values());
        var randomuser = userliste[Math.floor(Math.random() * userliste.length)];
         if(randomuser.nickname) var randomname = randomuser.nickname;
         if(!randomuser.nickname) var randomname = randomuser.displayName;
            message.reply("Ping! Leider wurde <@" + message.author + "> von **" + randomname + "** gepingt!");
    };
    } else {
        //Geht nicht
        if(message.content.toLowerCase().startsWith("peng") && !message.author.bot) {
            client.users.fetch();
            var userliste = Array.from(client.users.cache.values());
            var randomuser = userliste[Math.floor(Math.random() * userliste.length)];
             var min = 1;
             var max = 2;
             var pengstate = Math.round(Math.random() * (max - min)) + min;
             var randomname = randomuser.displayName;
            if(pengstate === 1) {
                message.reply("Peng! Leider wurde <@" + message.author + "> von **" + randomname + "** erwischt!");
            } else {
                message.reply("Peng! Leider wurde **" + randomname + "** von <@" + message.author + "> erwischt!");
            };
        };
    }
})

client.on('interactionCreate', interaction => {
	if(interaction.commandName === "invite") {
        interaction.reply({ content: client.generateInvite({scopes: ['applications.commands', 'bot'],}), ephemeral: true });
    }
});

http.createServer((request, response) => {
        response.writeHead(200, {
            'Content-Type': 'text/plain; charset=utf-8'
        });
        response.write("Peng!");
        response.end();
    }).listen(2021);

client.login(token);
