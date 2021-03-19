const {MessageEmbed} = require('discord.js');
const db = require('quick.db')
module.exports={
    name: 'ping',
    category: 'info',
    description: 'Sprawdza ping bota',
    run: async(client, message, args)=>{
        const user2 = message.author
        const blacklisted = db.fetch(`blacklist_${user2.id}`)

        if( blacklisted === 1) return message.channel.send('Byczku ty masz Gbana')
        const msg = await message.channel.send('🏓 Sprawdza Ping...')
        const Embed = new MessageEmbed()
        .setTitle('🏓Pong!🏓')
        .setDescription(`Ping: ${Math.floor(msg.createdTimestamp - message.createdTimestamp)}MS\n Api: ${Math.round(client.ws.ping)}MS`)
        .setColor('ff0000')  
        .setTimestamp();
        msg.edit(Embed)
    }
}