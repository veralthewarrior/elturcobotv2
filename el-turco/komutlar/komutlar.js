const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {
    try {
        await message.channel.send(`Komutlar: \n${client.commands.map(props => `\`${props.help.name}\``).join(" | ")}`);
    } catch (e) {
        throw e;
    }
}

module.exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["commands"],
  permLevel: 0
};

module.exports.help = {
  name: 'komutlar',
  description: 'Bende bulunan tüm özelliklerimi gösterir.',
  usage: 'komutlar'
};
 
//Lord Creative