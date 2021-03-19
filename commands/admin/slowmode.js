module.exports = {
    name: "slowmode",
    description: "Lets you set slowmode on the channel.",
    run: (client, message, args) => {
        const amount = parseInt(args[0])
        if(!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send(`:x: Nie posiadasz **Odpowiednich** uprawnień`)
        if(isNaN(amount)) return message.channel.send("Podaj czas")
        if(args[0] === amount + "s") {
        message.channel.setRateLimitPerUser(amount)
        if(amount > 1) {
        message.channel.send("Slowmode jest teraz na " + amount + " Sekund")
        return
        }
        else {message.channel.send("Slowmode jest teraz na " + amount + " Sekund")
        return }
    } if(args[0] === amount + "m") {
        message.channel.setRateLimitPerUser(amount * 60)
        if(amount > 1) {
        message.channel.send("Slowmode jest teraz na " + amount + " Minut")
        return
        } else { 
            message.channel.send("Slowmode jest teraz na  " + amount + " Minut")   
             
    
    return }
    } if(args[0] === amount + "h") {
        message.channel.setRateLimitPerUser(amount * 60 * 60)
        if(amount > 1) {
        message.channel.send("Slowmode jest teraz na " + amount + " Godzin")
        return
        } else {
            message.channel.send("Slowmode jest teraz na " + amount + " Godzin")
        return}
    } else {
        message.channel.send("Możesz tylko ustawić Slowmode na Sekundy(s), Minuty(m) i Godziny(h)")
    }

    }
}