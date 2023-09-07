const { SlashCommandBuilder, CommandInteraction, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
	/**
	 * 
	 * 
	 * @param {CommandInteraction} interaction
	 */

	async execute(client, interaction) {
		await interaction.reply({
			embeds: [
				new EmbedBuilder()
					.setTitle(`CLient's Latency`)
					.setColor(client.get_color())
					.addFields([{
						name: `Ping:`,
						value: `${Date.now() - interaction.createdTimestamp}ms`
					},
					{
						name: `API Latency:`,
						value: `${Math.round(client.client.ws.ping)}ms`
					}
					])
			],
			ephemeral: true,
		})
	},
};