const Discord = require('discord.js');
const fetch = module.require("node-fetch")
const db = require('quick.db')
module.exports = {
    name: 'meme',
    category: '4FUN',
    run: async (client, message, args) => {
        const user2 = message.author
        const blacklisted = db.fetch(`blacklist_${user2.id}`)

        if( blacklisted === 1) return message.channel.send('Byczku ty masz Gbana')

    message.channel.startTyping(1);  
    const body = await fetch(`http://memapi.glitch.me`).then(response => response.json()); 
    if (!body) return message.channel.stopTyping(1);   
    const attachment = new Discord.MessageAttachment(`${body.zdj}`,'mem.png'); 

    let embed1 = new Discord.MessageEmbed()
    .setTitle(`Mem.`)
    .attachFiles(attachment)
    .setImage(`attachment://mem.png`)
    .setColor('#a1ccff')
    .setFooter('Sarky')
    .setAuthor(`${message.author.tag}`, `${message.author.displayAvatarURL()}`)
    message.channel.send(embed1);
    message.channel.stopTyping(1);  

}
};


