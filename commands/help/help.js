const { SlashCommandBuilder, Client, CommandInteraction } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Help for user from kurumu!')
		.addStringOption(command_help =>
			command_help.setName('command_helped')
				.setDescription('What command do you want to help?')),
	/**
	 * 
	 * 
	 * @param {CommandInteraction} interaction
	 */

	async execute(client, interaction) {
		await interaction.reply('This is Help command:)))) updating....');
	},
};