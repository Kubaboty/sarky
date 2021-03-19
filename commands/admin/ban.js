const db = require('quick.db')
module.exports={
    name: 'ban',
    category: 'info',
    description: 'tworzy ankiete',
    run: async(client, message, args, ban)=>{
        const user2 = message.author
        const blacklisted = db.fetch(`blacklist_${user2.id}`)

        if( blacklisted === 1) return message.channel.send('Byczku ty masz Gbana')

        const { member, mentions } = message

        const tag = `<@${member.id}>`
    
        if (
          member.hasPermission('ADMINISTRATOR') ||
          member.hasPermission('BAN_MEMBERS')
        ) {
          const target = mentions.users.first()
          if (target) {
            const targetMember = message.guild.members.cache.get(target.id)
            targetMember.ban()
            message.channel.send(`${tag} typ dostal bana`)
          } else {
            message.channel.send(`${tag} oznacz osobe której chcesz dać bana!`)
          }
        } else {
          message.channel.send(
            `${tag} nie posiadasz permisji`
          )
        }
    
    }
}