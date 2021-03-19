const request = require('request'); 

const Discord = require("discord.js")

const db = require('quick.db')

module.exports = {
    name:"cat",
    aliases: ['kot'],
    run: async (client, message, args)=>{
        const user2 = message.author
        const blacklisted = db.fetch(`blacklist_${user2.id}`)

        if( blacklisted === 1) return message.channel.send('Byczku ty masz Gbana')
        request('http://edgecats.net/random', function (error, response, body) {
            if (!error && response.statusCode == 200) {
                    let emb = new Discord.MessageEmbed()
                    .setImage(body)
                    .setColor("#00ff00")
                    .setTitle("Kot 🐱")
                              
                   message.channel.send(emb)  
            }
        });
    }
}

