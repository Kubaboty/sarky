const { MessageAttachment, MessageEmbed } = require('discord.js')
const Canvacord = require('canvacord')

module.exports = {
    name: "cmm",
    usage: "changemymind <text>",
    category: "fun",
    run: async (client, message, args) => {
        let text = args.join(' ')
        if(!text) return message.channel.send('Nie Podano Tekstu.')
        let img = await Canvacord.Canvas.changemymind(text);
        let attachment = new MessageAttachment(img, 'changemymind.png');
        const embed = new MessageEmbed()
        .setColor('00FF00')
        .setTitle('ChangeMyMind')
        .setImage(img)
        message.channel.send(embed)
    }
}