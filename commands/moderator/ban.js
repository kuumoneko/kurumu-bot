const { PermissionFlagsBits, CommandInteraction, SlashCommandBuilder, EmbedBuilder } = require('discord.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ban')
		.setDescription('Ban a member!')

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

		if (AuthorMember.roles.highest.position > targetMember.roles.highest.position) {
			try {

				await targetMember.ban({ reason: reason });


				await interaction.followUp({
					embeds: [new EmbedBuilder()
						.setColor(client.get_color())
						.addFields({
							name: `Yes, you have banned ${AuthorMember.nickname}`,
							value: `Reason banned: ${reason}`
						})
					],
					ephemeral: true
				});
			}
			catch (e) {
				await interaction.followUp({
					embeds: [
						new EmbedBuilder()
							.setColor(client.get_color())
							.addFields({
								name: `Nuhh, I catch an error while doing your command :<`,
								value: `Error: ${e}`
							})
					],

					ephemeral: true
				});
			}
		}
		else {
			await interaction.followUp({
				embeds: [new EmbedBuilder()
					.setColor(client.get_color())
					.addFields({
						name: `You can't do this action`,
						value: `Reason : Missing permission`
					})
				],
				ephemeral: true,
			});
		}
	},
};