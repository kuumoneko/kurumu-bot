const { EmbedBuilder, ActionRowBuilder, StringSelectMenuOptionBuilder } = require('discord.js');
const { SlashCommandBuilder, ButtonBuilder, ButtonStyle, CommandInteraction, PermissionFlagsBits, StringSelectMenuBuilder } = require('discord.js');
const { view_bans } = require('../../Commands/Moderator/bans');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('bans')
		.setDescription('See bans list and unban member! (only use slash command)')
		.setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
	/**
	 * 
	 * 
	 * @param {CommandInteraction} interaction
	 */

	async execute(client, interaction) {

		await interaction.deferReply({
			ephemeral: true
		});

		await view_bans(client, interaction);
	}
};