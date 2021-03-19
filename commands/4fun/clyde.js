const { MessageAttachment } = require('discord.js')
const Canvacord = require('canvacord')

module.exports = {
    name: "clyde",
    usage: "clyde <text>",
    category: "fun",
    run: async (client, message, args) => {
        let text = args.join(' ')
        if(!text) return message.channel.send('Nie Podano Tekstu.')
        let img = await Canvacord.Canvas.clyde(text);
        let attachment = new MessageAttachment(img, 'clyde.png');
        message.channel.send(attachment)
    }
}