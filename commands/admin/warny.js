const { MessageEmbed } = require('discord.js')
const db = require("quick.db")

module.exports = {
  name: "warninfo",
  description: "Sprawdza ilość warnów użytkownika",
  category: "info",
  run: (client, message, args) => {

    const user2 = message.author
    const blacklisted = db.fetch(`blacklist_${user2.id}`)

    if( blacklisted === 1) return message.channel.send('Byczku ty masz Gbana')
    const user = message.mentions.members.first() || message.author
    
  
    let warnings = db.get(`warnings_${message.guild.id}_${user.id}`)
    
    
    if(warnings === null) warnings = 0;
    
    const embed = new MessageEmbed()
    .setColor('FF0000')
    .setTitle('Twoje warny')
    .setDescription(`${user} Posiada **${warnings}** Warnów`)
    
    message.channel.send(embed)
  
  
  
  }
}