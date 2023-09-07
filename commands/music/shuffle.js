const { SlashCommandBuilder, CommandInteraction, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('shuffle')
		.setDescription('Shuffle the track!'),
	/**
	 * 
	 * 
	 * @param {CommandInteraction} interaction 
	 */

	async execute(client, interaction) {

		var array = client.ctrack[interaction.guildId];
		for (let i = array.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[array[i], array[j]] = [array[j], array[i]];
		}

		client.ctrack[interaction.guildId] = array;

		await interaction.reply(
			{
				embeds: [
					new EmbedBuilder()
						.setColor(client.get_color())
						.setTitle(`Your queue has been shuffled`)
				],
				ephemeral: true,
			});
	},
};