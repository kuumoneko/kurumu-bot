const { SlashCommandBuilder, CommandInteraction, PermissionFlagsBits, EmbedBuilder } = require('discord.js');
const { chrole_member } = require('../../Commands/Moderator/chrole');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('chrole')
		.setDescription('Change role for a member! (only use slash command)')
		.addUserOption(member =>
			member.setName('member')
				.setDescription('Who do you want to call?')
				.setRequired(true))
		.addRoleOption(role =>
			role.setName('role')
				.setDescription('What role you want to change?'))
		.setDefaultMemberPermissions(PermissionFlagsBits.ChangeNickname),

	/**
	 * 
	 * 
	 * @param {CommandInteraction} interaction
	 */

	async execute(client, interaction) {

		const mb = interaction.options.getUser('member');
		const rl = interaction.options.getRole('role');

		await interaction.deferReply({
			ephemeral: true,
		});

		try {
			var targetMember = interaction.guild.members.cache.find(member => member.id === mb.id);
			var AuthorMember = interaction.guild.members.cache.find(member => member.id === interaction.user.id);
			var rolee = interaction.guild.roles.cache.find(role => role.name === rl.name);

			const result = await chrole_member(client, interaction, AuthorMember, targetMember, rolee);

			await interaction.followUp({
				embeds: result.message,
				ephemeral: true,
			})
			return;
		}

		catch (e) {
			console.log(e)
			return
		}
	},
};