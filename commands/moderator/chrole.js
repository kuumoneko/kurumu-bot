const { SlashCommandBuilder, Client, CommandInteraction, PermissionFlagsBits, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('chrole')
		.setDescription('Change role for a member!')
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

		var Target = interaction.guild.members.cache.find(member => member.id === mb.id);
		var user = interaction.guild.members.cache.find(member => member.id === interaction.user.id);
		var rolee = interaction.guild.roles.cache.find(role => role.name === rl.name);

		if (user.roles.highest.position > Target.roles.highest.position && user.permissions.has(PermissionFlagsBits.ManageNicknames) == true && interaction.guild.roles.cache.find(role => role.name === rl.name) !== undefined) {

			if (Target.roles.cache.find(role => role.id === rolee.id) === undefined)
				Target.roles.add(rolee);
			else
				Target.roles.remove(rolee);

			await interaction.followUp({
				embeds: [
					new EmbedBuilder()
						.setColor(client.get_color())
						.addFields(
							{
								name: `You have changed role of ${Target.nickname} in role ${rolee.name}`,
								value: 'Successfully changed',
							}
						)
				],
				ephemeral: true,
			});
		}
		else {
			await interaction.followUp({
				embeds: [
					new EmbedBuilder()
						.setColor(client.get_color())
						.addFields(
							{
								name: `You can't do that activity:<`,
								value: 'Reason: Missing permission',
							}
						)
				],
				ephemeral: true,
			})
		}
	},
};