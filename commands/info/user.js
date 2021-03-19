const { MessageEmbed } = require('discord.js');

const moment = require('moment');

const db = require('quick.db')

const statusy = {
	dnd: '<:Nie_Przeszkadzac:778978396868837416>',
	idle: '<:Zaraz_Wracam:778671257330909235>',
	offline: '<a:Offline:778672105302392864>',
	online: '<:online:778670545130487868> '
}

const flags = {
DISCORD_EMPLOYEE: '<:Pracownik_Discorda:778549913041764363>',
DISCORD_PARTNER: '<:Partner_Discorda:778549141973368832>',
BUGHUNTER_LEVEL_1: '<:Lowca_Bugow:778667952458825769>',
BUGHUNTER_LEVEL_2: '<:Lowca_Bugow_lvl2:778666826808164372>',
HYPESQUAD_EVENTS: '<:zloty_hypesquad:778528710500286494>',
HOUSE_BRAVERY: `<:dom_bravery:774950566462750720>`,
HOUSE_BRILLIANCE: `<:dom_briliance:774950580098695189>`,
HOUSE_BALANCE: `<:dom_balance:774950550923771905>`,
EARLY_SUPPORTER: '<:Supporter_Discorda:778548425058287648>',
TEAM_USER: 'Użytkownik Zespołu Discord',
VERIFIED_BOT: 'Zweryfikowany Bot',
VERIFIED_DEVELOPER: '<a:zweryfikowany_devloper_bota:774951740876390440>'
}

module.exports = {
    name: 'userinfo',
    aliases: ['user', 'profile'],
    category: 'info',
    description: 'informacje o użytkowniku',
    run: async(client, message, args)=>{
		const user2 = message.author
        const blacklisted = db.fetch(`blacklist_${user2.id}`)

        if( blacklisted === 1) return message.channel.send('Byczku ty masz Gbana')
        const member = message.mentions.members.last() || message.member;
		const roles = member.roles.cache
			.sort((a, b) => b.position - a.position)
			.map(role => role.toString())
			.slice(0, -1);
		const userFlags = member.user.flags.toArray();
		const embed = new MessageEmbed()
			.setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 512 }))
			.setColor(member.displayHexColor || 'BLUE')
			.addField('Generalne', [
				`**<:strzalki:778526397559341108> Nick:** ${member.user.username}`,
				`**<:strzalki:778526397559341108> Tag:** #${member.user.discriminator}`,
				`**<:strzalki:778526397559341108> ID:** ${member.id}`,
				`**<:strzalki:778526397559341108> Odznaki:** ${userFlags.length ? userFlags.map(flag => flags[flag]).join(', ') : 'Brak'}`,
				`**<:strzalki:778526397559341108> Avatar:** [Link Do Avataru](${member.user.displayAvatarURL({ dynamic: true })})`,
				`**<:strzalki:778526397559341108> Stworzono Konto:** ${moment(member.createdAt).format('DD/MM/YYYY')}`,
				`**<:strzalki:778526397559341108> Status:** ${statusy[member.user.presence.status]}`,
				`**<:strzalki:778526397559341108> Gra:** ${member.user.presence.game || 'Nie gra w grę'}`,
				`\u200b`
			])
			.addField('Serwerowe', [
				`**<:strzalki:778526397559341108> Najwyższa Rola:** ${member.roles.highest.id === message.guild.id ? 'Żadna' : member.roles.highest.name}`,
				`**<:strzalki:778526397559341108> Data Dołączenia Na Serwer:** ${moment(member.joinedAt).format('DD/MM/YYYY')}`,
			
				`\u200b`
			]);
		 message.channel.send(embed);

    }
}