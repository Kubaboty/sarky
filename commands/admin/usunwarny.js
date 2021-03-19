const db = require("quick.db")

module.exports = {
  name: "usunwarny",
  description: "Usuwa wszystkie warny",
  run: async (client, message, args) => {
    const user2 = message.author
        const blacklisted = db.fetch(`blacklist_${user2.id}`)

        if( blacklisted === 1) return message.channel.send('Byczku ty masz Gbana')
    
    
    if(!message.member.hasPermission("ADMINISTRATOR")) {
      return message.channel.send("Nie posiadasz permisji")
    }
    
    const user = message.mentions.members.first()
    
    if(!user) {
    return message.channel.send("Musisz oznaczyć osobe")
    }
    
    if(message.mentions.users.first().bot) {
      return message.channel.send("bot nie może mieć warna")
    }

    
    let warnings = db.get(`warnings_${message.guild.id}_${user.id}`)
    
    if(warnings === null) {
      return message.channel.send(`${message.mentions.users.first().username} nie posiadasz warnów`)
    }
    
    db.delete(`warnings_${message.guild.id}_${user.id}`)
    user.send(`Twoje warny zostały usunięte przez ${message.author.username} z ${message.guild.name}`)
    await message.channel.send(`Usunięto wszystkie warny użytkownika ${message.mentions.users.first().username}`)
    
  
    
}
}