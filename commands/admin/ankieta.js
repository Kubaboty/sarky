const {MessageEmbed} = require('discord.js')
const db = require('quick.db')
module.exports={
    name: 'ankieta',
    category: 'info',
    description: 'tworzy ankiete',
    run: async(client, message, args)=>{
        const user2 = message.author
        const blacklisted = db.fetch(`blacklist_${user2.id}`)

        if( blacklisted === 1) return message.channel.send('Byczku ty masz Gbana')

        let errEmbed = new MessageEmbed()
        .setColor('#FF0000')
        .setTitle(`❌ Błąd składni.`)
        .setDescription(`Przepraszam, jednak twoje polecenie jest nie pełne. Proszę abyś podał tekst do ankiety.`)
        .setFooter('SpaceBOT')
        .setTimestamp();
      
        if (!args[0]) return message.channel.send(errEmbed)
      
        let permEmbed = new MessageEmbed()
        .setColor(`#FF0000`)
        .setTitle(`❌ Błąd uprawnien`)
        .setDescription(`Przepraszam, brakuje ci permisji \`MANAGE_MESSAGES\``)
        .setFooter(`SpaceBOT`)
        .setTimestamp();
      
        var x = message.channel;
    
        if(!message.member.hasPermission("MANAGE_MESSAGES")) {
            return message.channel.send(permEmbed)
          }
        
        
        let tresc = args.join(" ");
      
        let ankieta = new MessageEmbed()
        .setColor('#00FF00')
        .setAuthor('Ankieta', `https://images-ext-1.discordapp.net/external/paR8KRmQGtAV28lvGxiGp2wBztm0DqmF6w5_R-oiVZc/%3Fv%3D1/https/cdn.discordapp.com/emojis/555818949296521256.gif`)
        .setDescription(tresc)
        .setFooter(`Wywołane przez ${message.author.id}`)
        .setTimestamp();
      
        x.send(ankieta).then(async embedMessage =>{
            await embedMessage.react(`👍`)
            await embedMessage.react(`👎`)
        })
    }
}