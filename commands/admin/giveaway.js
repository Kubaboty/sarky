const Discord = require('discord.js')
const ms = require('ms')
const db = require('quick.db')
module.exports = {
    name: 'giveaway',
    category: 'admin',
    description: 'Tworzy giveaway (konkurs) na serwerze',
    aliases: ['konkurs'],
    run: async (client, message, args)=>{
      const user2 = message.author
      const blacklisted = db.fetch(`blacklist_${user2.id}`)

      if( blacklisted === 1) return message.channel.send('Byczku ty masz Gbana')
        if(!message.member.hasPermission('ADMINISTRATOR')) return message.reply(`Nie posiadasz uprawnień!`)
        if (!args[0]) return message.channel.send(`Nie podałeś czasu`);
        if (
          !args[0].endsWith("d") &&
          !args[0].endsWith("h") &&
          !args[0].endsWith("m")
        )
          return message.channel.send(
            `Dałeś zły format czasu!`
          );
        if (isNaN(args[0][0])) return message.channel.send(`To nie jest liczba!`);
        let channel = message.mentions.channels.first();
        if (!channel)
          return message.channel.send(
            `Nie znalazłem takiego kanału w tym serverze!`
          );
        let prize = args.slice(2).join(" ");
        if (!prize) return message.channel.send(`Nie dałeś nagrody!`);
        message.channel.send(`*Giveaway jest na kanale ${channel}*`);
        let Embed = new Discord.MessageEmbed()
          .setTitle(`Nowy giveaway!`)
          .setDescription(
            `Użytkownik ${message.author} robi giveaway na **${prize}**`
          )
          .setTimestamp(Date.now() + ms(args[0]))
          .setColor(`BLUE`);
        let m = await channel.send(Embed);
        m.react("🎉");
        setTimeout(() => {
          if (m.reactions.cache.get("🎉").count <= 1) {
            message.channel.send(`Rekacje: ${m.reactions.cache.get("🎉").count}`);
            return message.channel.send(
              `Za mało osób żeby losować!`
            );
          }
      
          let winner = m.reactions.cache
            .get("🎉")
            .users.cache.filter((u) => !u.bot)
            .random();
          channel.send(
            `Giveaway na **${prize}** wygrał ${winner}`
          );
        }, ms(args[0]));
    }
}