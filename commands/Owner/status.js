const db = require("quick.db")
module.exports = {
    name: "status",
    description: "Change the bot status",
    usage: "status <PLAYING || WATCHING> <status>",
    category: "owner",
    ownerOnly: true,
    run: (client, message, args) => {
        if(message.author.id !== "707306125011320904")  {
            return message.channel.send(`Nie jesteś właścicielem Bota <a:Husky:774175793122902016>`)
        }
        if(!args[0]) return message.channel.send('Podaj typ statusu (np. WATCHING)')
        let stype = args[0]
        if(!args[1]) return message.channel.send("Podaj tekst statusu")
        let status = args.join(' ').split(' ').slice(1).join(' ')
        db.set(`status`, status)
        client.user.setActivity(status, {type: stype})        
    }
}