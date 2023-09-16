const { PermissionFlagsBits, CommandInteraction, SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { ban_member } = require('../../Commands/Moderator/ban');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ban')
		.setDescription('Ban a member! (only use slash command)')

		.addUserOption(member =>
			member.setName('member')
				.setDescription('Who do you want to call?')
				.setRequired(true))

		.addStringOption(reason =>
			reason.setName('reason')
				.setDescription('Why you want to do to that?'))
		.setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),

	/**
	 * 
	 * @param {CommandInteraction} interaction
	 */

	async execute(client, interaction) {
		await interaction.deferReply({
			ephemeral: true
		});


		const mb = interaction.options.getUser('member');
		const reason = interaction.options.getString('reason');

		const AuthorMember = interaction.guild.members.cache.find(member => member.id === interaction.user.id);
		const targetMember = interaction.guild.members.cache.find(member => member.id === mb.id);

		const result = await ban_member(client, interaction, AuthorMember, targetMember, reason);

		await interaction.followUp({
			embeds: result.message,
			ephemeral: true,
		})
	},
};