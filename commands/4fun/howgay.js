const Discord = require('discord.js')

module.exports = {
name: 'gayrate',
aliases: ["howgay", "gayr"],
description: 'check how gay a person is!',

run: async(client, message, args) =>{
let result = Math.floor(Math.random() * 100) 

let user = message.mentions.users.first || message.author;

let embed = new Discord.MessageEmbed()
.setTitle(`Test Gejostwa`)
.setDescription(`Jesteś ${result}% gejem 🏳️‍🌈 `)

 message.channel.send(embed)
 }
    }
