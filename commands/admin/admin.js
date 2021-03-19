const Discord = require(`discord.js`)
module.exports = {
    name: 'nadajadm',
    category: 'admin',
    description: 'nadaje moda oznaczonej osobie (działa tylko na psach!)',
    run: async (client, message, args)=>{
        if(message.guild.id !== '774173877798174750') return message.channel.send(`To tu nie działa :3`)

        if(!message.member.hasPermission(`ADMINISTRATOR`)) return message.channel.send('Nie Posiadasz Odpowiednich Uprawnień!')
    
        const rolamoda = message.guild.roles.cache.get('774236409892569088')
        const oznaczony = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        const pseudo = `! `


        if(!rolamoda) return message.channel.send('Nie można znaleźć roli moderatora!')
        if(!args[0]) return message.channel.send('Musisz oznaczyć osobe lub podać id!')
        if(!oznaczony) return message.channel.send('Nie ma tej osoby na serwerze!')

        await oznaczony.roles.add(rolamoda.id).catch(err => message.channel.send('Wyskoczył Błąd Podczas dodawania roli!'))

    

    }
}