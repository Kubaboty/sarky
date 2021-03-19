const Discord = require('discord.js')
const db = require('quick.db')
module.exports = {
    name: 'emojis',
    category: 'info',
    description: 'wszystkie emoji na serwerze',
    run: async(client, message, args)=>{
      const user2 = message.author
      const blacklisted = db.fetch(`blacklist_${user2.id}`)

      if( blacklisted === 1) return message.channel.send('Byczku ty masz Gbana')

        let Emojis = "";
        let EmojisAnimated = "";
        let EmojiCount = 0;
        let Animated = 0;
        let OverallEmojis = 0;
        function Emoji(id) {
          return client.emojis.cache.get(id).toString();
        }
        message.guild.emojis.cache.forEach((emoji) => {
          OverallEmojis++;
          if (emoji.animated) {
            Animated++;
            EmojisAnimated += Emoji(emoji.id);
          } else {
            EmojiCount++;
            Emojis += Emoji(emoji.id);
          }
        });
        let embed = new Discord.MessageEmbed()
          .setTitle(`Emotki w ${message.guild.name}.`)
          .setDescription(
            `**Animowane [${Animated}]**:\n${EmojisAnimated}\n\n**Zwykłe [${EmojiCount}]**:\n${Emojis}\n\n**Łącznie [${OverallEmojis}]**`
          )
          .setColor(`RANDOM`);
        message.channel.send(embed);
    }
}