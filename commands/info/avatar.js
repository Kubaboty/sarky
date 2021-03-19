const db = require('quick.db')
const Discord = require('discord.js');

module.exports = {
    name: "avatar",
    description: "Pokazuje avatar",

    async run (client, message, args) {
        const user2 = message.author
        const blacklisted = db.fetch(`blacklist_${user2.id}`)

        if( blacklisted === 1) return message.channel.send('Byczku ty masz Gbana')

        let member = message.mentions.users.first() || message.author

        let avatar = member.displayAvatarURL({size: 1024})

        let embed = new Discord.MessageEmbed()
        .setTitle(`Avatar użytkownika ${message.author.username}`)
        .setDescription(`Formaty: [jpg](${member.displayAvatarURL({size: 2048, dynamic: true, format: "jpg"})}) | [jpeg](${member.displayAvatarURL({size: 2048, dynamic: true, format:"jpeg"})}) | [webp](${member.displayAvatarURL({size: 2048, dynamic: true, format: "webp"})})\nFormat Pokazany: \`png lub gif\``)
        .setImage(member.displayAvatarURL({size: 1024, dynamic: true, format: "png"}))


        message.channel.send(embed);
    }
}