import { SlashCommandBuilder }  from 'discord.js';

export default {
	data: new SlashCommandBuilder()
		.setName('healthcheck')
		.setDescription('Verifica a saúde do pirata! v2'),
	async execute(interaction) {
		await interaction.reply('Operante!');
		await interaction.editReply('Operante!');
	},
};
