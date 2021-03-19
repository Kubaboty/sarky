const Discord = require('discord.js')
const db = require('quick.db')
module.exports = {
    name: 'usunrole',
    category: 'admin',
    description: 'usuwa role oznaczonemu użytkownikowi',
    aliases: ['delrole', 'deleterole', 'zabierzrole'],
    run: async (client, message, args)=>{
        const user2 = message.author
        const blacklisted = db.fetch(`blacklist_${user2.id}`)

        if( blacklisted === 1) return message.channel.send('Byczku ty masz Gbana')
        let permembed = new Discord.MessageEmbed()
        .setColor('ff0000')
        .setTitle('Brak Uprawnień!')
        .setDescription(`${message.author.tag} brakuje ci permisji \`MANAGE_ROLES\`!`)
        .setThumbnail(message.author.displayAvatarURL())
        .setTimestamp();
        
        let oznaczembed = new Discord.MessageEmbed()
        .setColor('ff0000')
        .setTitle('Oznaczenie!')
        .setDescription(`${message.author.tag} musisz oznaczyć osobę której chcesz usunąć rolę!`)
        .setThumbnail(message.author.displayAvatarURL())
        .setTimestamp();
        
        let oznaczembed2 = new Discord.MessageEmbed()
        .setColor('ff0000')
        .setTitle('Oznaczenie!')
        .setDescription(`${message.author.tag} musisz oznaczyć rolę którą usunąć danemu członkowi dać!`)
        .setThumbnail(message.author.displayAvatarURL())
        .setTimestamp();

        const rolembed = new Discord.MessageEmbed()
        .setColor('ff0000')
        .setTitle('Usunięto rolę!')
        .setDescription('Pomyślnie usunięto rolę :)')
        .setThumbnail(message.author.displayAvatarURL({ dynamic: 500}))
        .setTimestamp();
        
          if(!message.member.hasPermission('MANAGE_ROLES')) return message.channel.send(permembed)
          let user = message.mentions.members.first();
          if(!user) return message.channel.send(oznaczembed)
        
          let role = message.mentions.roles.first();
          if (!role) return message.channel.send(oznaczembed2)
        
          user.roles.remove(role)
        

        
          message.channel.send(rolembed)
    }
}