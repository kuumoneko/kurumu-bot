const { SlashCommandBuilder, CommandInteraction } = require('discord.js');
const { set_loop } = require('../../Commands/Music/setloop');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('setloop')
		.setDescription('set repeat for your queue')
		.addStringOption(mode =>
			mode.setName('mode')
				.setDescription('Chose your loop mode')
				.setRequired(true)
				.addChoices(
					{ name: 'Track', value: '1' },
					{ name: 'Queue', value: '2' },
					{ name: 'Autoplay', value: '3' },
					{ name: 'Disabled', value: '0' }
				)),
	/**
	 * 
	 * 
	 * @param {CommandInteraction} interaction 
	 */

	async execute(client, interaction) {

		const mode = interaction.options.getString('mode');

		const result = await set_loop(client, interaction, mode);

		await interaction.followUp({
			embeds: result.message,
			ephemeral: true
		});
	},
};