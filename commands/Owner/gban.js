const db = require('quick.db')
const Discord = require('discord.js')

module.exports = {
    name: "gban",
    description: "Sprawdza ilość warnów użytkownika",
    category: "OWNER",
    run: async (client, message, args) => {
   
        if(message.author.id !== "707306125011320904")  {
            return message.channel.send(`Nie jesteś właścicielem Bota <a:Husky:774175793122902016>`)
        }

        let user = message.mentions.users.first()
        if(!user) {
            return message.channel.send(`Musisz oznaczyć osobe <a:Husky:774175793122902016>`)
        } 

        

        message.channel.send(` <a:tak2:774302836871397396> Użytkownik **${user.tag}** Dostał Gbana`)
        db.add(`blacklist_${user.id}`, 1)

    }

}