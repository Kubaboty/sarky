const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'eval',
    run: async (client, message, args) => {
        const msgg = message
        const mb = message.channel
        if (message.author.id !== '707306125011320904') return;
        const embed = new MessageEmbed()
            .setTitle('Poczekaj...')
        const msg = await message.channel.send(embed);
        try {
            const data = eval(args.join(' ').replace(/```/g, ''));
            const embed = new MessageEmbed()
                .setTitle('Output: ')
                .setDescription(await data)
            await msg.edit(embed)
            await msg.react('✅')
            await msg.react('❌')
            const filter = (reaction, user) => (reaction.emoji.name === '❌' || reaction.emoji.name === '✅') && (user.id === message.author.id);
            msg.awaitReactions(filter, { max: 1 })
                .then((collected) => {
                    collected.map((emoji) => {
                        switch (emoji._emoji.name) {
                            case '✅':
                                msg.reactions.removeAll();
                                break;
                            case '❌':
                                msg.delete()
                                break;
                        }
                    })
                })
        } catch (e) {
            const embed = new MessageEmbed()
                .setTitle('Error ' + e )
            return await msg.edit(embed);

        }
    }
}
