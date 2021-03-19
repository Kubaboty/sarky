const { MessageEmbed } = require('discord.js')
const moment = require('moment')
const db = require('quick.db')


const filterLevels = {
	DISABLED: 'Wyłączony',
	MEMBERS_WITHOUT_ROLES: 'Bez Role',
	ALL_MEMBERS: 'Każdy'
};
const verificationLevels = {
	NONE: 'Żaden',
	LOW: 'Niski',
	MEDIUM: 'Średni',
	HIGH: 'Wysoki',
	VERY_HIGH: 'Bardzo Wysoki'
};
const regions = {
	brazil: 'Brazylia',
	europe: 'Europa',
	hongkong: 'Hong Kong',
	india: 'Indie',
	japan: 'Japonia',
	russia: 'Rosja',
	singapore: 'Singapur',
	southafrica: 'Afryka Południowa',
	sydney: 'Sydney',
	'us-central': 'Ameryka Centralna',
	'us-east': 'Ameryka Wschodnia',
	'us-west': 'Ameryka Zachodnia',
	'us-south': 'Ameryka Południowa'
};


module.exports = {
    name: 'serverinfo',
    category: 'info',
    aliases: ['serwerinfo'],
    description: 'Informacje o serwerze',
    run: async (client, message, args)=>{
      const user2 = message.author
      const blacklisted = db.fetch(`blacklist_${user2.id}`)

      if( blacklisted === 1) return message.channel.send('Byczku ty masz Gbana')
      
          
      const roles = message.guild.roles.cache.sort((a, b) => b.position - a.position).map(role => role.toString());
		const members = message.guild.members.cache;
		const channels = message.guild.channels.cache;
    const emojis = message.guild.emojis.cache;


    const embed = new MessageEmbed()
    .setDescription(`**Informacje Serwerowe Dla  __${message.guild.name}__**`)
    .setColor('BLUE')
    .setThumbnail(message.guild.iconURL({ dynamic: true }))
    .addField('Generalne', [
      `**<:strzalki:778526397559341108> Nazwa:** ${message.guild.name}`,
      `**<:strzalki:778526397559341108> ID:** ${message.guild.id}`,
      `**<:strzalki:778526397559341108> Właściciel:** <@${message.guild.ownerID}>`,
      `**<:strzalki:778526397559341108> Region:** ${regions[message.guild.region]} `,
      `**<:strzalki:778526397559341108> Level Boosta:** ${message.guild.premiumTier ? `Level ${message.guild.premiumTier}` : 'Żaden'}`,
      `**<:strzalki:778526397559341108> Level Weryfikacji:** ${verificationLevels[message.guild.verificationLevel]}`,
      `**<:strzalki:778526397559341108> Data Stworzenia:** ${moment(message.guild.createdAt).format('DD/MM/YYYY')}  `,
      '\u200b'
    ])
    .addField('Statystyki', [
      `**<:strzalki:778526397559341108> Liczba  Ról:** ${roles.length}`,
      `**<:strzalki:778526397559341108> Łączna Liczba Emoji:** ${emojis.size}`,
      `**<:strzalki:778526397559341108> Ilość Zwykłych Emoji:** ${emojis.filter(emoji => !emoji.animated).size}`,
      `**<:strzalki:778526397559341108> Ilość animowanych Emoji:** ${emojis.filter(emoji => emoji.animated).size}`,
      `**<:strzalki:778526397559341108> Użytkownicy:** ${message.guild.memberCount}`,
      `**<:strzalki:778526397559341108> Boty:** ${members.filter(member => member.user.bot).size}`,
      `**<:strzalki:778526397559341108> Kanały Tekstowe:** ${channels.filter(channel => channel.type === 'text').size}`,
      `**<:strzalki:778526397559341108> Kanały Głosowe:** ${channels.filter(channel => channel.type === 'voice').size}`,
      `**<:strzalki:778526397559341108> Boosty:** ${message.guild.premiumSubscriptionCount || '0'}`,
      '\u200b'
    ])
    .setFooter(message.author.tag, message.author.displayAvatarURL())
    .setTimestamp();
  message.channel.send(embed);
    

          
          
    }
}