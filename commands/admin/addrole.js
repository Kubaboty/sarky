const db = require('quick.db')
const Discord = require('discord.js')
module.exports = {
    name: 'addrole',
    category: 'admin',
    description: 'dodaje role oznaczonemu użytkownikowi',
    aliases: ['dodajrole', 'dajrole'],
    run: async (client, message, args)=>{
        const user2 = message.author
        const blacklisted = db.fetch(`blacklist_${user2.id}`)

        if( blacklisted === 1) return message.channel.send('Byczku ty masz Gbana')
        
        let permembed = new Discord.MessageEmbed()
        .setColor('ff0000')
        .setTitle('Brak Uprawnień!')
        .setTitle(`${message.author.tag} brakuje ci permisji \`MANAGE_MESSAGES\`!`)
        .setThumbnail(message.author.displayAvatarURL())
        .setTimestamp();
        
        
        let oznaczembed = new Discord.MessageEmbed()
        .setColor('ff0000')
        .setTitle('Oznaczenie!')
        .setDescription(`${message.author.tag} musisz oznaczyć osobę której chcesz dać rolę!`)
        .setThumbnail(message.author.displayAvatarURL())
        .setTimestamp();
        
        let oznaczembed2 = new Discord.MessageEmbed()
        .setColor('ff0000')
        .setTitle('Oznaczenie!')
        .setDescription(`${message.author.tag} musisz oznaczyć rolę którą chcesz dać!`)
        .setThumbnail(message.author.displayAvatarURL())
        .setTimestamp();
        
          if(!message.member.hasPermission('MANAGE_ROLES')) return message.channel.send(permembed)
          let user = message.mentions.members.first();
          if(!user) return message.reply(oznaczembed)
        
          let role = message.mentions.roles.first();
          if (!role) return message.reply(oznaczembed2)
        
          user.roles.add(role)
          const rolembed = new Discord.MessageEmbed()
          .setColor('ff0000')
          .setTitle('Dodano rolę!')
          .setDescription(`${message.author} dodał użytkownikowi ${user} rolę ${role}`)
          .setThumbnail(message.author.displayAvatarURL())
          .setTimestamp();
        
          message.channel.send(rolembed)
    }
}