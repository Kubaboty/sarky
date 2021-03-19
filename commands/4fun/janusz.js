const {MessageAttachment} = require('discord.js')
const zdj = require('../..')
const db = require('quick.db')
module.exports={
    name: 'janusz',
    category: '4FUN',
    description: 'JANUSZ',
    run: async(client, message, args)=>{
      const user2 = message.author
      const blacklisted = db.fetch(`blacklist_${user2.id}`)

      if( blacklisted === 1) return message.channel.send('Byczku ty masz Gbana')
  
      const attachment = new MessageAttachment('../../januszek.png')
        message.channel.send(attachment);
    }
}