const db = require('quick.db');
const Discord = require('discord.js');

module.exports = {
    name: "bal",
    description: "Twój balans Hajsu",

    async run (client, message, args) {
        const user2 = message.author
        const blacklisted = db.fetch(`blacklist_${user2.id}`)

        if( blacklisted === 1) return message.channel.send('Byczku ty masz Gbana')

        let user = message.mentions.users.first() || message.author;

        let bal = await db.fetch(`money_${message.guild.id}_${user.id}`);
        if(bal === null) bal = 0;

        const embed = new Discord.MessageEmbed()
        .setColor('BLUE')
        .setTitle("Balans użytkownika")
        .setDescription(`${user} aktualnie posiada ${bal} hajsu`)
        .setTimestamp();

        message.channel.send(embed)
    }
}