const Discord = require('discord.js')
const db = require('quick.db')
const snekfetch = require('snekfetch')
module.exports={
    name: 'pies',
    category: '4FUN',
    description: 'Piesek :)',
    run: async(client, message, args)=>{
      const user2 = message.author
      const blacklisted = db.fetch(`blacklist_${user2.id}`)

      if( blacklisted === 1) return message.channel.send('Byczku ty masz Gbana')
  
         const { body } = await snekfetch.get('https://random.dog/woof.json');
    const embed = new Discord.MessageEmbed()
    .setTitle('Piesek 🐕')
    .setColor("#00ff00")
    .setImage(body.url);

    message.channel.send(embed)

      
    }
}