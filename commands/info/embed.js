const Discord = require("discord.js")

module.exports = {
    name: "embed",
    run: async (client, message, args)=>{
        

        if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(`:x: Nie posiadasz **Odpowiednich** uprawnień`)

  const cmd = args.join(' ').split(' | ')
  if(!cmd[0]) return message.channel.send(':x: Żle napisano! Użycie: embed hex_color | tytuł | opis')
        if(!cmd[1]) return message.channel.send(':x: Żle napisano! Użycie: embed hex_color | tytuł | opis')
        if(!cmd[2]) return message.channel.send(':x: Żle napisano! Użycie: embed hex_color | tytuł | opis')

  let emb = new Discord.MessageEmbed()
  .setTitle(cmd[1])
  .setColor(cmd[0])
  .setDescription(cmd[2])
  .setTimestamp()

  message.channel.send(emb)
  
  

    }
}