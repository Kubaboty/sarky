const db = require("quick.db")

module.exports = {
  name: "delcmd",
  usage: "delcmd <cmd_name>",
  description: "Delete the custom commannd",
  category: "moderation",
  run: (client, message, args) => {
    const user2 = message.author
    const blacklisted = db.fetch(`blacklist_${user2.id}`)

    if( blacklisted === 1) return message.channel.send('Byczku ty masz Gbana')

    if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(":x: Nie Posiadasz Odpowiednich Permisji")

    let cmdname = args[0]

    if(!cmdname) return message.channel.send(":x: Podaj nazwe komendy. Wzór: `delcmd <Nazwa_Komendy>`")

    let database = db.get(`cmd_${message.guild.id}`)

    if(database) {
      let data = database.find(x => x.name === cmdname.toLowerCase())

      if(!data) return message.channel.send(":x: Nie można znaleźć komendy")

      let value = database.indexOf(data)
      delete database[value]

      var filter = database.filter(x => {
        return x != null && x != ''
      })

      db.set(`cmd_${message.guild.id}`, filter)
      return message.channel.send(`Usunięto **${cmdname}** Komende!`)


    } else {
      return message.channel.send(":x: Nie mogę znaleźć komendy")
    


  }
  }
}