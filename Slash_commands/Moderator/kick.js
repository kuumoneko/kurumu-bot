const { SlashCommandBuilder, CommandInteraction, PermissionFlagsBits, EmbedBuilder } = require('discord.js');
const { kick_member } = require('../../Commands/Moderator/kick');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('kick')
		.setDescription('Kick a member! (only use slash command)')
		.addUserOption(member =>
			member.setName('member')
				.setDescription('Who do you want to call?')
				.setRequired(true))
		.addStringOption(reason =>
			reason.setName('reason')
				.setDescription('Why you want to do to that?'))
		.setDefaultMemberPermissions(PermissionFlagsBits.KickMembers),
	/**
	 * 
	 * 
	 * @param {CommandInteraction} interaction
	 */

	async execute(client, interaction) {

		await interaction.deferReply({
			ephemeral: true
		})
		const mb = interaction.options.getUser('member');
		const reason = interaction.options.getString('reason') ?? 'None';

		var targetMember = interaction.guild.members.cache.find(member => member.id === mb.id);
		var AuthorMember = interaction.guild.members.cache.find(member => member.id === interaction.user.id);

		const result = await kick_member(client, interaction, AuthorMember, targetMember, reason);

		await interaction.followUp({
			embeds: result.message,
			ephemeral: true,
		})
		return;


	},
};
