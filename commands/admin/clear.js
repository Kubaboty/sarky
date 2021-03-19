const db = require('quick.db')
module.exports = {
    name: "clear",
    description: "Usuwa wiadomości",
    run:   async (client, message, args)=> {
        const user2 = message.author
        const blacklisted = db.fetch(`blacklist_${user2.id}`)

        if( blacklisted === 1) return message.channel.send('Byczku ty masz Gbana')
        if(!message.member.hasPermission("MANAGE_MESSAGES")) {
            return message.channel.send("Nie posiadasz uprawnień!")
          }
          

        const amount = args.join(" ");

        if(!amount) return message.reply('Podaj liczbę wiadomości do usunięcia')

        if(amount > 100) return message.reply(`Liczba przekracza limit 99`)

        if(amount < 1) return message.reply(`Musisz podać liczbę większą od 0`)

        await message.channel.messages.fetch({limit: amount}).then(messages => {
            message.channel.bulkDelete(messages
    )});


    message.channel.send('Usunięto ' + args[0] + ' wiadomości!')

    }
}