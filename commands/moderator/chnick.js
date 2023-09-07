const { SlashCommandBuilder, PermissionFlagsBits, CommandInteraction,  EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('chnick')
		.setDescription('Change nickname for a member!')
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


		var Target = interaction.guild.members.cache.find(member => member.id === mb.id);
		var user = interaction.guild.members.cache.find(member => member.id === interaction.user.id);
		var clientt = interaction.guild.members.cache.find(member => member.id === client.client.user.id);

		if ((user == Target) || (user.roles.highest.position > Target.roles.highest.position && user.permissions.has(PermissionFlagsBits.ManageNicknames) == true)) {
			Target.edit({
				nick: nick,
			});
			await interaction.followUp({
				embeds: [
					new EmbedBuilder()
						.setColor(client.get_color())
						.addFields(
							{
								name: `You have changed nickname of ${Target.displayName} to ${(nick === "") ? "default" : nick}`,
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
								name: `You can't change nickname of ${Target.displayName} to ${(nick === "") ? "default" : nick}`,
								value: 'Reason: Missing permission',
							}
						)
				],
				ephemeral: true,
			})
		}

	},
};