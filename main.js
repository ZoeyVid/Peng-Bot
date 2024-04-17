const { Client, GatewayIntentBits } = require("discord.js");
const client = new Client({
  intents: [ //Nochmal genauer anschauen
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildIntegrations,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.DirectMessages
  ],
});
const { token } = require("./config.json");
const http = require("http");

client.once("ready", () => {
  console.log(`Ready! Logged in as ${client.user.tag}`);
  client.user.setActivity("Peng", { type: "LISTENING" });
});

client.on("messageCreate", async (message) => {
  if(!message.guild) return;
  //if(!message.channel.permissionsFor(client.user).has("SEND_MESSAGES")) return;
  if(message.author.bot) return;
  if(!message.content.toLowerCase().startsWith("peng")) return; //In Zukunft mit Args arbeiten für Dynamic Commandes und bewusstes Peng
  message.react("🔫");
  await message.guild.members.fetch();
  var userList = Array.from(message.guild.members.cache.values());
  var randomUser = userList[Math.floor(Math.random() * userList.length)];
  if (randomUser.nickname) var randomName = randomUser.nickname;
  if (!randomUser.nickname) var randomName = randomUser.displayName;
  if(Math.round(Math.random() * (2 - 1)) + 1 == 1) {
    message.reply("Peng! Leider wurde **" + randomName + "** von <@" + message.author.id + "> erwischt!");
  } else {
    message.reply("Peng! Leider wurde <@" + message.author.id + "> von **" + randomName + "** erwischt!");
  };
});

client.on("interactionCreate", async (interaction) => {
  if(interaction.commandName === "invite") {
    interaction.reply({
      content: client.generateInvite({
        scopes: ["applications.commands", "bot"],
      }),
      ephemeral: true,
    });
  }
  if (interaction.commandName === "peng") {
    if(interaction.inGuild()) {
      await interaction.guild.members.fetch();
      var userList = Array.from(interaction.guild.members.cache.values());
      var randomUser = userList[Math.floor(Math.random() * userList.length)];
      if (randomUser.nickname) var randomName = randomUser.nickname;
      if (!randomUser.nickname) var randomName = randomUser.displayName;
      if(Math.round(Math.random() * (2 - 1)) + 1 == 1) {
        interaction.reply({ content: "Peng! Leider wurde **" + randomName + "** von " + interaction.user.username + " erwischt!", ephemeral: false });
      } else {
        interaction.reply({ content: "Peng! Leider wurde **" + interaction.user.username + "** von " + randomName + " erwischt!", ephemeral: false });
      };
    } else {
      var userList = Array.from(client.users.cache.values());
      var randomUser = userList[Math.floor(Math.random() * userList.length)];
      var randomName = randomUser.displayName; //Fix in Future
      if(Math.round(Math.random() * (2 - 1)) + 1 == 1) {
        interaction.reply({ content: "Peng! Leider wurde **" + randomName + "** von " + interaction.user.username + " erwischt!", ephemeral: false });
      } else {
        interaction.reply({ content: "Peng! Leider wurde **" + interaction.user.username + "** von " + randomName + " erwischt!", ephemeral: false });
      };
    }
  }
});

http
  .createServer((request, response) => {
    response.writeHead(200, {
      "Content-Type": "text/plain; charset=utf-8",
    });
    response.write("Peng!");
    response.end();
  })
  .listen(2021);

client.login(token);
