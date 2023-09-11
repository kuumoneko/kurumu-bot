const { SlashCommandBuilder, CommandInteraction } = require('discord.js');
const { aclient } = require('/kurumu-bot/src/aclient');
const { helping } = require('../../Commands/Help/help');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Help for user from kurumu!')
		.addStringOption(command_help =>
			command_help.setName('command_helped')
				.setDescription('What command do you want to help?')),
	/**
	 * 
	 * @param {aclient} client 
	 * @param {CommandInteraction} interaction
	 */

	async execute(client, interaction) {
		await interaction.deferReply({
			ephemeral: true
		});

		const command_help = interaction.options.getString('command_helped') ?? 'None';

		const result = await helping(client, interaction, command_help);

		await interaction.followUp({
			embeds: result.message,
			ephemeral: true
		})

	},
};