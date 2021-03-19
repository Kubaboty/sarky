const Discord = require("discord.js");
const PlayStore = require("google-play-scraper");
const EmbedColor = ``;
const db = require("quick.db")


module.exports = {
  name: "playstore",
  aliases: ["pstore", "googleplaystore", "ps", "sklepplay", "sklep-play"],
  description: "Apka na sklepie play",
  usage: "Playstore <Nazwa>",
  category: "4fun",
  run: async (client, message, args) => {
    const user2 = message.author
    const blacklisted = db.fetch(`blacklist_${user2.id}`)

    if( blacklisted === 1) return message.channel.send('Byczku ty masz Gbana')
    if (!args[0])
      return message.channel.send(
        `Podaj Nazwe Aplikacji - ${message.author.username}!`
      );

    PlayStore.search({
      term: args.join(" "),
      num: 1
    }).then(Data => {
      let App;

      try {
        App = JSON.parse(JSON.stringify(Data[0]));
      } catch (error) {
        return message.channel.send(
          `Nie Znaleziono Aplikacji - ${message.author.username}!`
        );
      }

      let Embed = new Discord.MessageEmbed()
        .setColor(EmbedColor || "RANDOM")
        .setThumbnail(App.icon)
        .setURL(App.url)
        .setTitle(`${App.title}`)
        .setDescription(App.summary)
        .addField(`Cena`, App.priceText, true)
        .addField(`Developer`, App.developer, true)
        .addField(`Ocena`, App.scoreText, true)
        .setFooter(`${message.author.tag}`, message.author.displayAvatarURL())
        .setTimestamp();

      return message.channel.send(Embed);
    });
  }
};