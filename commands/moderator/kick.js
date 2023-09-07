const { SlashCommandBuilder, Client, CommandInteraction, PermissionFlagsBits, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('kick')
		.setDescription('Kick a member!')
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

		var Target = interaction.guild.members.cache.find(member => member.id === mb.id);
		var user = interaction.guild.members.cache.find(member => member.id === interaction.user.id);


		if (user.roles.highest.position > Target.roles.highest.position) {
			Target.kick({
				reason: reason,
			})

			await interaction.followUp({
				embeds: [
					new EmbedBuilder()
						.setColor(client.get_color())
						.addFields(
							{
								name: `You have kicked ${Target.displayName} `,
								value: `Reason: ${reason}`,
							}
						)
				],
				ephemeral: true,
			})
		}
		else {
			await interaction.followUp({
				embeds: [
					new EmbedBuilder()
						.setColor(client.get_color())
						.addFields(
							{
								name: `You can't kick ${Target.displayName} `,
								value: `Reason: Missing permission`,
							}
						)
				],
				ephemeral: true,
			})
		}


	},
};
