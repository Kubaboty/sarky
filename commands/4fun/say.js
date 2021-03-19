const db = require('quick.db')
module.exports = {
    name: 'say',
    category: '4FUN',
    aliases: ['powiedz', 'reply'],
    description: 'Wysyła to samo co ty wysłałeś',
    run: async (client, message, args)=>{
        const user2 = message.author
        const blacklisted = db.fetch(`blacklist_${user2.id}`)

        if( blacklisted === 1) return message.channel.send('Byczku ty masz Gbana')
     
        const msg = args.join(" ");
        message.channel.send(`${message.author} : ` + msg)
    }
}