const { Client, GatewayIntentBits } = require("discord.js");
const client = new Client({
  intents: [ //Nochmal genauer anschauen
    GatewayIntentBits.GUILDS,
    GatewayIntentBits.GUILDINTEGRATIONS,
    GatewayIntentBits.GUILDMEMBERS,
    GatewayIntentBits.GUILDMESSAGES,
    GatewayIntentBits.DirectMessages
  ],
});
const { token } = require("./config.json");
const http = require("http");
const { config } = require("process");

client.once("ready", () => {
  console.log(`Ready! Logged in as ${client.user.tag}`);
  client.user.setActivity("Peng", { type: "LISTENING" });
});

client.on("messageCreate", async (message) => {
  if(!message.guild) return;
  if(!message.channel.permissionsFor(client.user).has("SEND_MESSAGES")) return;
  if(message.author.bot) return;
  if(!message.content.toLowerCase().startsWith("peng")) return;
  message.react("🔫");
  await message.guild.members.fetch();
  var userList = Array.from(message.guild.members.cache.values());
  var randomUser = userList[Math.floor(Math.random() * userList.length)];
  if (randomUser.nickname) var randomName = randomUser.nickname;
  if (!randomUser.nickname) var randomName = randomUser.displayName;
  if(Math.round(Math.random() * (2 - 1)) + 1 == 1) {
    message.reply("Peng! Leider wurde **" + randomName + "** von " + message.author + " erwischt!");
  } else {
    message.reply("Peng! Leider wurde **" + message.author + "** von " + randomName + " erwischt!");
  };
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
