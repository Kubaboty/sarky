  
const { MessageEmbed } = require("discord.js")
const db = require("quick.db")

module.exports = {
  name: "warn",
  category: "moderation",
  description: "Daje ostrzeżenie oznaczonej osobie",
  run: async (client, message, args) => {
    const user2 = message.author
    const blacklisted = db.fetch(`blacklist_${user2.id}`)

    if( blacklisted === 1) return message.channel.send('Byczku ty masz Gbana')
    
    if(!message.member.hasPermission("MANAGE_MESSAGES")) {
      return message.channel.send("Nie posiadasz uprawnień!")
    }
    
    const user = message.mentions.members.first()
    
    if(!user) {
      return message.channel.send("Musisz oznaczyć osobę którą chcesz ostrzeżyć")
    }
    
    if(message.mentions.users.first().bot) {
      return message.channel.send("Nie możesz ostrzeżyć botów")
    }
    
    if(message.author.id === user.id) {
      return message.channel.send("Nie możesz sobie dać ostrzeżenia xD")
    }
    

    
    const reason = args.slice(1).join(" ")
    
   
    
    let warnings = db.get(`warnings_${message.guild.id}_${user.id}`)
    
    if(warnings === 15) {
      return message.channel.send(`${message.mentions.users.first().username} Zdobył już limit warnów czyli **15**`)
    }
    const embed = new MessageEmbed()
.setColor('00FF00')
.setTitle('Warn!')
.addField('Administrator', `${message.author.tag}`)
.addField('Użytkownik', `${message.mentions.users.first().tag}`) 
.addField('Powód', reason)


    if(warnings === null) {
      db.set(`warnings_${message.guild.id}_${user.id}`, 1)
      user.send(`Zostałeś ostrzeżony na **${message.guild.name}** za ${reason}`)
      await message.channel.send(embed)
    } else if(warnings !== null) {
        db.add(`warnings_${message.guild.id}_${user.id}`, 1)
       user.send(`Zostałeś ostrzeżony **${message.guild.name}** za ${reason}`)
       await message.channel.send(embed)
    }
    
  
  } 
}