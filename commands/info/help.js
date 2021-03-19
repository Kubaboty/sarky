const { MessageEmbed } = require('discord.js')
const db = require('quick.db')
module.exports = {
    name: 'help',
    category: 'info',
    aliases: ['pomoc'],
    description: 'Lista wszystkich komend',
    run: async (client, message, args)=>{
        const user2 = message.author
        const blacklisted = db.fetch(`blacklist_${user2.id}`)

        if( blacklisted === 1) return message.channel.send('Byczku ty masz Gbana')

     
        
        const HELP = new MessageEmbed()
        .setColor('BLUE')
        .setTitle('Pomoc Sarky')
        .setDescription(`  **<a:wykrzyknik:774300694462201867> | Administracyjne **\n \`ban, kick,  clear, warn, usunwarny, addrole, giveaway, delrole, addcmd, delcmd, nuke, ankieta, slowmode, prefix  \`  \n\n **<a:pepemiecz:774294935896981525> | 4FUN ** \n \`ascii, dm, say, meme, pies, sklepplay, hastebin, cmm \` \n \n **<:info:774301870558412850> | Info **\n \`ankieta, avatar, covid, emojis, ping, serverinfo, userinfo, warninfo, invites \` \n \n **<a:hajs:774301035316772864> | Ekonomia** \n \` work, daily, bal, shop, buy\``)
        .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))

        message.channel.send(HELP)
    }
}