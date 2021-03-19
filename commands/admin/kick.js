const { MessageEmbed } = require('discord.js')
const db = require('quick.db')
module.exports = {
    name: 'kick',
    category: 'admin',
    description: 'Wyrzuca członka z serwera',
    aliases: ['wyrzuć', 'wyrzuc'],
    run: async (client, message, args)=>{
      const user2 = message.author
      const blacklisted = db.fetch(`blacklist_${user2.id}`)

      if( blacklisted === 1) return message.channel.send('Byczku ty masz Gbana')

        
        const { channel, guild, mentions, author } = message

        const reasonArg = [...args].slice(1).join(" ")
    
        const userToKick = mentions.users.first()
    
        if (!userToKick) {
          return message.reply("Musisz oznaczyć osobę którą chcesz wyrzucić")
        }
    
        if (userToKick.id === author.id) {
          return message.reply("Nie możesz siebię wyrzucić ツ")
        }
    
        const memberToKick = guild.members.cache.get(userToKick.id)
    
        if (!memberToKick.kickable) {
          return channel.send("Posiadam zbyt małe uprawnienia")
        }
        if(!reasonArg) reasonArg = 'Brak'

        const embed = new MessageEmbed()
        .setColor('FF0000')
        .setTitle(`<a:Syrena:774292196982915092> Wyrzucono`)
        .setDescription(` Pomyślnie wyrzucono ${memberToKick} (${memberToKick.id})`)
        .addField('Administrator', `${message.author} (${message.author.id})` )
        .addField('Użytkownik', `${memberToKick} (${memberToKick.id})`)
        .addField('Powód', reasonArg)
    
        memberToKick.kick(reasonArg).then((res) => {
          message.channel.send(embed)
          
        })
    }
}