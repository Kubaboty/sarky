const Discord = require('discord.js')
const Hastebin = require('hastebin-save')

module.exports = {
    name: "hastebin",
 description: "Tworzy hastebin z twoim tekstem",
 usage: ".hastebin <tekst>",
 run: async (client, message, args)=>{

    const text = args.join(" ")
if(!args[0]) return message.channel.send('Podaj tekst...')
Hastebin.upload(text, link => {
 const embed = new Discord.MessageEmbed()
 .setTitle('Hastebin')
 .setColor('GREEN')
 .setDescription(`Link do hastebina: https://hastebin.com/` + link)
 .setFooter('Autor: Lukakku#5434')
 message.channel.send(embed)
});
 }
}





