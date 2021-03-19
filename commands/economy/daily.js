const { MessageEmbed } = require('discord.js')
const db = require('quick.db');
const ms = require('parse-ms');

module.exports = {
    name: "daily",
    description: "Otrzymujesz swoją dniówke w wysokości 500 Hajsu",

    async run (client, message, args) {
        const user2 = message.author
        const blacklisted = db.fetch(`blacklist_${user2.id}`)

        if( blacklisted === 1) return message.channel.send('Byczku ty masz Gbana')
        let user = message.author;
        let timeout = 86400000;
        let amount = 500;

        const embed = new MessageEmbed()
        .setColor('GREEN')
        .setTitle('Dodano Hajs')
        .setDescription(`<a:tak2:774302836871397396> Pomyślnie dodano ${amount} Hajsu do twojego konta!`)
        .setAuthor(message.author.tag)
        .setTimestamp();

        

        let daily = await db.fetch(`daily_${message.guild.id}_${user.id}`);

        if(daily !== null && timeout - (Date.now() - daily) > 0){
            let time = ms(timeout - (Date.now() - daily));

            
        const errembed = new MessageEmbed()
        .setColor('RED')
        .setTitle('Błąd')
        .setDescription('Już zebrałeś/aś swoją dzienną wypłate!')
        .addField('Wróc za', `${time.days}dni, ${time.hours}godzin, ${time.minutes}minut i ${time.seconds}sekund`)

            return message.channel.send(errembed)
        } else {
            db.add(`money_${message.guild.id}_${user.id}`, amount);
            db.set(`daily_${message.guild.id}_${user.id}`, Date.now());

            message.channel.send(embed)
        }
    }
}