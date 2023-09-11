const { PermissionFlagsBits, CommandInteraction, SlashCommandBuilder, EmbedBuilder } = require('discord.js');

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

		if (AuthorMember.roles.highest.position > targetMember.roles.highest.position) {
			try {
				await targetMember.ban({ reason: reason });
				if (interaction.deferred == true) {
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
			}
			catch (e) {
				throw new Error(e)
			}
		}
		else {
			await interaction.reply({
				embeds: [new EmbedBuilder()
					.setColor(client.get_color())
					.addFields({
						name: `You can't do this action`,
						value: `Reason : Missing permission`
					})
				],
			});
		}
	},
};