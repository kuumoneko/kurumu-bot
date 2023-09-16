const { PermissionFlagsBits, CommandInteraction, SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { untimeout_member } = require('../../Commands/Moderator/untimeout');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('untimeout')
		.setDescription('Untimeout a  member! (only use slash command)')
		.addUserOption(option =>
			option.setName('member')
				.setDescription('Who do you want to call?')
				.setRequired(true))
		.addStringOption(reason =>
			reason.setName('reason')
				.setDescription('Why do you do that?'))

		.setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers),
	/**
	 * 
	 * 
	 * @param {CommandInteraction} interaction
	 */

	async execute(client, interaction) {

		await interaction.deferReply({
			ephemeral: true,
		});

		const mb = interaction.options.getUser('member');
		const reason = interaction.options.getString('reason') ?? 'None';

		const AuthorMember = interaction.guild.members.cache.find(member => member.id === interaction.user.id);
		const targetMember = interaction.guild.members.cache.find(member => member.id === mb.id);

		const result = await untimeout_member(client, interaction, AuthorMember, targetMember, reason);

		await interaction.followUp({
			embeds: result.message,
			ephemeral: true,
		})
	},
};