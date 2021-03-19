const db = require('quick.db')
const Discord = require('discord.js')

module.exports = {
    name: "gunban",
    description: "Sprawdza ilość warnów użytkownika",
    category: "OWNER",
    run: async (client, message, args) => {
        if(message.author.id !== "707306125011320904") return message.channel.send('Nie jesteś właścicielem Bota xD')

        let user = message.mentions.users.first()
        if(!user) return message.channel.send('Musisz oznaczyć osobe')
        const blacklisted = db.fetch(`blacklist_${user.id}`)

        if( blacklisted === 0 || blacklisted === null) return message.channel.send('Ten użytkownik nie ma gbana')

        message.channel.send(`Użytkownik **${user.tag}** Dostał Gunbana`)
        db.subtract(`blacklist_${user.id}`, 1)

    }

}