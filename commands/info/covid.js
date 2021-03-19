const {MessageEmbed} = require('discord.js')
const covid = require('novelcovid')
const db = require('quick.db')
module.exports={
    name: 'covid',
    category: 'info',
    description: 'Informacje o COVID-19',
    run: async(client, message, args)=>{
        const user2 = message.author
        const blacklisted = db.fetch(`blacklist_${user2.id}`)

        if( blacklisted === 1) return message.channel.send('Byczku ty masz Gbana')
        const CovidStats = await covid.all()

        return message.channel.send(new MessageEmbed()
        .setTitle("Covid-19")
        .setColor("BLUE")
        .addFields(
          { name: `Zarażeni`, value: CovidStats.cases.toLocaleString(), inline: true },
          { name: `Zarazeni Dziś`, value: CovidStats.todayCases.toLocaleString(), inline: true },
          { name: `Śmierci`, value: CovidStats.deaths.toLocaleString(), inline: true },
          { name: `Śmierci Dziś`, value: CovidStats.todayDeaths.toLocaleString(), inline: true },
          { name: `Wyleczeni`, value: CovidStats.recovered.toLocaleString(), inline: true },
          { name: `Wyleczeni Dziś`, value: CovidStats.todayRecovered.toLocaleString(), inline: true },
          { name: `Aktywne`, value: CovidStats.active.toLocaleString(), inline: true },
          { name: `Stan Krytyczny`, value: CovidStats.critical.toLocaleString(), inline: true },
          { name: `Testy`, value: CovidStats.tests.toLocaleString(), inline: true }
  
            )
        )
    }
}