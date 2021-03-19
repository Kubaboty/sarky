const db = require("quick.db")

module.exports = {
  name: "addcmd",
  usage: "addcmd <cmd_name> <cmd_responce>",
  description: "add guild custom commands",
  category: "moderation",
  run: (client, message, args) => {
    const user2 = message.author
    const blacklisted = db.fetch(`blacklist_${user2.id}`)

    if( blacklisted === 1) return message.channel.send('Byczku ty masz Gbana')


    if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(":x: Nie Posiadasz Odpowiednich Permisji")

    let cmdname = args[0]

    if(!cmdname) return message.channel.send(`:x: Podaj nazwe komendy i odpowiedź. Wzór: \`addcmd <Nazwa_Komendy> <Odpowiedź>\``)

    let cmdresponce = args.slice(1).join(" ")

    if(!cmdresponce) return message.channel.send(`:x: Podaj nazwe komendy i odpowiedź. Wzór: \`addcmd <Nazwa_Komendy> <Odpowiedź>\``)

    let database = db.get(`cmd_${message.guild.id}`)

    if(database && database.find(x => x.name === cmdname.toLowerCase())) return message.channel.send("Tak komenda już jest w bazie danych")

    let data = {
      name: cmdname.toLowerCase(),
      responce: cmdresponce
    }

    db.push(`cmd_${message.guild.id}`, data)

    return message.channel.send("Dodaj **" + cmdname.toLowerCase() + "** Jako Komende serwerową")


  }
}
