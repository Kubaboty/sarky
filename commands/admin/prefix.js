const db = require("quick.db")
const { default_prefix } = require("../../config.json")

module.exports = {
  name: "prefix",
  category: "moderation",
  usage: "prefix <new-prefix>",
  description: "Zmienia prefix",
  run: async (client, message, args) => {
    const user2 = message.author
    const blacklisted = db.fetch(`blacklist_${user2.id}`)

    if( blacklisted === 1) return message.channel.send('Byczku ty masz Gbana')
    //PERMISSION
    if(!message.member.hasPermission("ADMINISTRATOR")) {
      return message.channel.send("Nie posiadasz uprawnień!")
    }
    
    if(!args[0]) {
      return message.channel.send("Musisz podać prefix!")
    } 
    
    if(args[1]) {
      return message.channel.send("Prefix nie może mieć spacji")
    }
    
    if(args[0].length > 3) {
      return message.channel.send("Prefix nie może zawierać 3 znaki")
    }
    
    if(args.join("") === default_prefix) {
      db.delete(`prefix_${message.guild.id}`)
     return await message.channel.send("Zresetowano Prefix ✅")
    }
    
    db.set(`prefix_${message.guild.id}`, args[0])
  await message.channel.send(`Ustawiono Prefix Bota na ${args[0]}`)
    
  }
}