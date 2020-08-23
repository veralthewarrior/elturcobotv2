const Discord = require('discord.js');
const request = require('node-superfetch');
const db = require('quick.db');

exports.run = async (client, msg, args) => {
    msg.delete();
  const yasak = client.emojis.get('701884491647549502');
  if (msg.channel.id !== '731290120698724353') return msg.channel.send(`**Bu komutun kullanımı, bu kanalda engellenmiştir.**`).then(m => m.delete(5000));
      let u = msg.mentions.users.first() || msg.author;

        if(u.bot === true) {
                const embed = new Discord.RichEmbed()
                        .setDescription("Botların seviyesi bulunmamaktadır!")
                        .setColor("RANDOM")
                msg.channel.send(embed)
                return
        }
        let sira = '';
        var str = ''
        const sorted = msg.guild.members.filter(u => !u.user.bot).array().sort((a, b) => { return db.fetch(`seviye_${b.user.id + msg.guild.id}`) - db.fetch(`seviye_${a.user.id + msg.guild.id}`) });
        const top10 = sorted.splice(0, msg.guild.members.size)
        const mappedName = top10.filter(o => !o.bot).map(s => s.user.id);
        const mappedLevel = top10.filter(o => !o.bot).map(s => db.fetch(`seviye_${s.user.id + msg.guild.id}`) || 0)
        const emoji = client.emojis.get('702138649151668284');

        const mappedID = top10.map(s => s.user.id);
        for(var i = 0; i < 10; i++) {
            var lvl = mappedLevel[i]
      
            if(msg.author.id === mappedID[i]) {
                str += `**[${i + 1}]** ${emoji} <@${mappedName[i]}>\n  **Level:** ${lvl} \n\n`
            }

            if(msg.author.id !== mappedID[i]) {
                str += `**[${i + 1}]** ${emoji} <@${mappedName[i]}>\n  **Level:** ${lvl} \n\n`
            }
        }

        if(u.bot === true) {
                const embed = new Discord.RichEmbed()
                        .setDescription("Botların seviyesi bulunmamaktadır!")
                        .setColor("RANDOM")
                msg.channel.send(embed)
                return
        }
  
        let wEmbed = new Discord.RichEmbed()
        .setTitle(` El Turco | Seviye Sistemi`)
        .setColor('RANDOM')
        .setDescription(`${str}`)
        msg.channel.send(wEmbed)
  
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["sıralama", "lider", "lidertablosu"],
  permLevel: 0,
    kategori: "lvl"
};

exports.help = {
  name: 'sıralama',
  description: 'Seviye sisteminin sunucudaki liderlik tablosunu gĂ¶sterir.',
  usage: 'sıralama'
};