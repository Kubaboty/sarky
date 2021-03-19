const db = require('quick.db');
const Discord = require('discord.js');

module.exports = {
    name: "buy",
    aliases: ['kup'],

    async run (client, message, args) {
        let purchase = args.join(" ");
        if(!purchase) return message.channel.send('Podaj nazwe itemu')
        let items = await db.fetch(message.author.id, { items: [] });
        let amount = await db.fetch(`money_${message.guild.id}_${message.author.id}`)

        if(purchase === 'V.I.P'){
            if(amount < 1000) return message.channel.send('Nie posiadasz wystarczającej kwoty pieniędzy (1000)');
            db.subtract(`money_${message.guild.id}_${message.author.id}`, 1000);
            db.push(message.author.id, "Vip");
            message.channel.send('Kupiono Vipa')
        }
        if(purchase === 'S.V.I.P'){
            if(amount < 5000) return message.channel.send('Nie posiadasz wystarczającej kwoty pieniędzy (5000)');
            db.subtract(`money_${message.guild.id}_${message.author.id}`, 5000);
            db.push(message.author.id, "Svip");
            message.channel.send('Kupiono Svpia')
        }
    }
}
