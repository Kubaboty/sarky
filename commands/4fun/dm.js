const Discord = require('discord.js')
const db = require('quick.db')
module.exports={
    name: 'dm',
    category: '4FUN',
    description: 'wysłyła wiadomość do oznaczonej osoby',
    run: async(client, message, args)=>{
      const user2 = message.author
      const blacklisted = db.fetch(`blacklist_${user2.id}`)

      if( blacklisted === 1) return message.channel.send('Byczku ty masz Gbana')

      const embedzik = new Discord.MessageEmbed()
.setColor('BLUE')
.setTitle('Wysłano')
.setDescription(`<a:tak2:774302836871397396> Pomyślnie wysłano`)
.setFooter(message.author)
.setTimestamp()


        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
if (!user)
  return message.channel.send(
    ` nie oznaczyłeś osoby lub złe id`
  );
if (!args.slice(1).join(" "))
  return message.channel.send("Nie podałeś informacji");

user.user.send(args.slice(1).join(" "))

  .catch(() => message.channel.send("do tej osoby nie można wysłać wiadomości"))
  .then(() => message.channel.send(embedzik));
  



    }
}