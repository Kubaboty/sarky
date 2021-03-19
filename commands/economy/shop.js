const Discord = require('discord.js')
module.exports = {
    name: 'shop',
    aliases: ['sklep'],
    run: async (client, message, args)=>{
        const sklepik = new Discord.MessageEmbed()
        .setColor('00FF00')
        .setTitle('Sklep')
        .setDescription(`V.I.P 1000 Hajsu \n S.V.I.P 5000 Hajsu `)
        const msg = message.channel
        msg.send(sklepik)
    }
}