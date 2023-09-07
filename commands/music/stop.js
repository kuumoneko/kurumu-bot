const { SlashCommandBuilder, CommandInteraction, EmbedBuilder } = require('discord.js');
const { useQueue } = require('discord-player')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('stop')
		.setDescription('Stop play and leave!'),
	/**
	 * 
	 * 
	 * @param {CommandInteraction} interaction 
	 */

	async execute(client, interaction) {

		await interaction.deferReply()

		const queue = useQueue(interaction.guildId);

		if (!queue.deleted) {
			const channell = queue.channel;
			client.ctrack[interaction.guildId] = []

			queue.setRepeatMode(0);

			queue.clear();

			queue.node.stop();

			queue.delete();

			await interaction.followUp({
				embeds: [
					new EmbedBuilder()
						.setColor(client.get_color())
						.setTitle(`I have stopped and leaved ${channell}`)
				],
				ephemeral: true,
			});
			return;
		}

		await interaction.followUp({
			embeds: [
				new EmbedBuilder()
					.setColor(client.get_color())
					.setTitle(`I have stopped and leaved Voice channel`)
			],
			ephemeral: true,
		});
	},
};