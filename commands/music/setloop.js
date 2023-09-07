const { SlashCommandBuilder, CommandInteraction, EmbedBuilder } = require('discord.js');
const { useQueue } = require('discord-player')


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

		const queue = useQueue(interaction.guildId);

		queue.setRepeatMode(Number(mode))
		client.isloop[interaction.guildId] = mode;

		var bruh = {
			0: 'Disabled Repeated mode',
			1: 'Track Repeated mode',
			2: 'Queue Repeated mode',
			3: 'Autoplay Mode'
		}


		await interaction.reply({
			embeds: [
				new EmbedBuilder()
					.setColor(client.get_color())
					.addFields({
						name: `Current queue repeated mode has been changed`,
						value: `Current: ${bruh[Number(mode)]}`
					})
			],
			ephemeral: true,
		});
	},
};