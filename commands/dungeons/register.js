import { EmbedBuilder, SlashCommandBuilder }  from 'discord.js';

import {generateDungeonInviteEmbed} from '../../embeds/generateDungeonInviteEmbed.js';
export default {
	data: new SlashCommandBuilder()
		.setName('alistamento')
		.setDescription('Inicia o alistamento para Dungeons e outros conteúdos do jogo.'),
	async execute(interaction) {

		try {
			const registerEmbed = generateDungeonInviteEmbed()
			const embeds = [registerEmbed]
			await interaction.deferReply();
			await interaction.followUp({embeds, ephemeral:false});

		}
		catch (error) {
			console.error(error);
		}

		
	},
};
