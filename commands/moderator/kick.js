const { SlashCommandBuilder, Client, CommandInteraction, PermissionFlagsBits } = require('discord.js');

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
		const mb = interaction.options.getUser('member')
		const reason = interaction.options.getString('reason')

		var Target = interaction.guild.members.cache.find(member => member.id === mb.id);
		var user = interaction.guild.members.cache.find(member => member.id === interaction.user.id);
		var clientt = interaction.guild.members.cache.find(member => member.id === client.client.user.id);

		if (clientt.roles.highest.position <= Target.roles.highest.position) {
			await interaction.reply(`I can't do this action :<`)
			return;
		}

		if (user.roles.highest.position > Target.roles.highest.position) {
			Target.kick({
				reason: reason,
			})

			await interaction.reply({
				content: `Done`,
				ephemeral: true,
			})

			await interaction.channel.send(`${Target} has been kicked by ${interaction.user} with reason: ${reason}`)

			return
		}


		await interaction.reply(`You can't do this action :<`)
	},
};