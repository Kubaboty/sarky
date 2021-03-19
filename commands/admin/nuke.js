const Discord = require('discord.js')

module.exports = {
    name: "nuke",
    usage: "nuke",
    description: "Nuke KANAŁU",
    run: async (client, message, args)=>{
if (!message.member.hasPermission("MANAG_CHANNELS")) {
    return message.reply('NIE posiadasz **PERMISJI !**')
    }
    let channel = client.channels.cache.get(message.channel.id)
var posisi = channel.position;
  
  
  channel.clone().then((channel2) => {
    channel2.setPosition(posisi)
    channel.delete()
    channel2.send("Kanał został zrestartowany !",{
    files: ['https://media.tenor.com/images/0754697c9c4dd44ca8504dbf1b36b927/tenor.gif']
    })
  })
    }}

