const { SlashCommandBuilder, PermissionFlagsBits, CommandInteraction, EmbedBuilder } = require('discord.js');
const { chnick_member } = require('../../Commands/Moderator/chnick');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('chnick')
		.setDescription('Change nickname for a member! (only use slash command)')
		.addUserOption(member =>
			member.setName('member')
				.setDescription('Who do you want to call?')
				.setRequired(true))
		.addStringOption(nick =>
			nick.setName('nick')
				.setDescription('what nick you want to change?'))

		.setDefaultMemberPermissions(PermissionFlagsBits.ChangeNickname)
	,

	/**
	 * 
	 * 
	 * @param {CommandInteraction} interaction 
	 */

	async execute(client, interaction) {
		await interaction.deferReply({
			ephemeral: true,
		})

		const mb = interaction.options.getUser('member');
		const nick = interaction.options.getString('nick') ?? "";


		var targetMember = interaction.guild.members.cache.find(member => member.id === mb.id);
		var AuthorMember = interaction.guild.members.cache.find(member => member.id === interaction.user.id);

		const result = await chnick_member(client, interaction, AuthorMember, targetMember, nick);

		await interaction.followUp({
			embeds: result.message,
			ephemeral: true,
		})
		return;

	},
};