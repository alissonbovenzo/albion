
import { EmbedBuilder } from "discord.js";

/**
 * 
 * @returns {EmbedBuilder}
 * 
 * Usage mode:
 *
 * await message.reply({ embeds: [embed] });
 * 
 */
export function generateDungeonInviteEmbed(){
    const embed = new EmbedBuilder()
      .setColor("#00b0f4")
      .setAuthor({
        name: "Alistamento <NOME_DA_DG> 00/Y",
      })
      .setTitle("Avalon Roads - Baús Dourados")
      .setDescription("```\nRequisitos:\nIP para Veteranos >= 1200\nIP para Novatos   >= 1200\n\nEscutar e seguir as calls.\n\n```\n*Requisitos de I.P.* \n`Novato: >= 1100 IP` or ``Veteranos 1200 IP``\n\n[Players necessários](https://example.com)\n2 <@&123>, 2<@&123>, 10 <@&123>")
      
      .addFields(
        {
          name: "Players",
          value: "\u200B",
          inline: false
        },
        {
          name: "Tank",
          value: "1 - <@!123>",
        },
        {
          name: "Healer",
          value: "1 - <@!123>\n2 - disponível\n3 - disponível",
          inline: true
        },
        {
          name: "DPS",
          value: "1 - <@!123><@&123>\n2 - <@!123><@&123>\n3 - <@!123><@&123>\n4- <@!123><@&123>\n5 - <@!123><@&123>",
        },
        {
          name: "Lista de Espera",
          value: "1 - <@!123><@&123>\n2 - <@!123><@&123>\n3 - <@!123><@&123>",
        }
      )
      .setColor("#00b0f4")
      .setFooter({
        text: "Astrahus Tech - Fábrica de Soluções",
        iconURL: "https://slate.dan.onl/slate.png",
      })
      .setTimestamp();
    
      embed.addFields({
        name: "Players",
        value: "0",
        inline: false,

      })
      return embed;

    

}