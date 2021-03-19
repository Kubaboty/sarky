const Discord = require('discord.js')
const figlet = require('figlet')
const db = require('quick.db')
module.exports = {
    name: 'ascii',
    category: '4FUN',
    description: 'Tekst w formie ascii',
    run: async (client, message, args)=>{
        const user2 = message.author
        const blacklisted = db.fetch(`blacklist_${user2.id}`)

        if( blacklisted === 1) return message.channel.send('Byczku ty masz Gbana')
        if(!args[0]) return message.channel.send('Proszę podaj tekst!');

        msg = args.join(" ");
      
        figlet.text(msg, function (err, data){
            if(err){
                console.log(chalk.red('ERROR'));
                console.dir(err);
            }
            if(data.length > 2000) return message.channel.send('Podaj tekst z mniej niż 2000 znaków!')
      
            message.channel.send('```' + data + '```')
        })
    }
}