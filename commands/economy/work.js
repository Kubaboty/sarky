const db = require('quick.db');
const ms = require('parse-ms');

module.exports = {
    name: "work",
    description: "Pracujesz",

    async run (client, message, args) {
        
                const user2 = message.author
        const blacklisted = db.fetch(`blacklist_${user2.id}`)

        if( blacklisted === 1) return message.channel.send('Byczku ty masz Gbana')
        let user = message.author;
        let timeout = 500000;
        let author = await db.fetch(`worked_${message.guild.id}_${user.id}`);

        if(author !== null && timeout - (Date.now() - author) > 0){
            let time = ms(timeout - (Date.now() - author));
            return message.channel.send(`Możesz znowu popracować za ${time.minutes}minut i ${time.seconds}sekund`)
        } else {
            let amount = (Math.floor(Math.random() * 80)) + 1;
            db.add(`money_${message.guild.id}_${user.id}`, amount)
            db.set(`worked_${message.guild.id}_${user.id}`, Date.now())

            const odpowiedzi = [`Pomogłeś administracji w odbudowaniu serwera dostajesz ${amount}`]
            message.channel.send(`${user}, popracowałeś i dostałeś ${amount} hajsu`)
        }
    }
}