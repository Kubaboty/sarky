const { Client, Collection } = require("discord.js");
const Discord = require('discord.js')
const { TOKEN, default_prefix } = require("./config.json")
const db = require("quick.db")







const client = new Client({ disableMentions: 'everyone' })
client.commands = new Collection();
client.aliases = new Collection();

["command"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});
client.on("ready", () => {
    console.log(`Hi, ${client.user.username} JEST!`);
})
client.on("message", async message => {
  const activities_list = [
    "Oznacz mnie po informacje.", 
    "@Sarky",
    "sp!help Spis komend"
    ];
  setInterval(() => {
    const index = Math.floor(Math.random() * (activities_list.length - 1) + 1);
    client.user.setActivity(activities_list[index]);
}, 120000); //sets every 2 mins
  if(message.author.bot) return
    if (!message.guild) return;
    let prefix = db.get(`prefix_${message.guild.id}`)
    if(prefix === null) prefix = default_prefix;
    const reakcjaaa = new Discord.MessageEmbed()
    .setColor('BLUE')
    .setTitle(`${client.user.username}`)
    .addField('Prefix', `\`${prefix}\``)
    .addField('Spis Komend', `\`${prefix}help\``)
    .addField('Dodaj Bota', `[Link](https://discord.com/oauth2/authorize?client_id=756942022639878234&scope=bot&permissions=8)`)
    .setDescription(`Developer: Pso-Kubonix <3#4480 <@707306125011320904>`)
   if (message.mentions.users.first() === client.user) {
        message.channel.send(reakcjaaa)
   }
   
    if (!message.content.startsWith(prefix)) return;
    if (!message.member) message.member = await message.guild.fetchMember(message);
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    if (cmd.length === 0) return;
let cmdx = db.get(`cmd_${message.guild.id}`)
if(cmdx) {
  let cmdy = cmdx.find(x => x.name === cmd)
  if(cmdy) message.channel.send(cmdy.responce)
}
    let command = client.commands.get(cmd);
    if (!command) command = client.commands.get(client.aliases.get(cmd));
    if (command) 
        command.run(client, message, args);
    });
client.login(TOKEN);