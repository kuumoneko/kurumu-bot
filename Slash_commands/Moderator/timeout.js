const { PermissionFlagsBits, CommandInteraction, SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { timeout_member } = require('../../Commands/Moderator/timeout');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('timeout')
		.setDescription('Timeout a member! (only use slash command)')

		.addUserOption(option =>
			option.setName('member')
				.setDescription('Who do you want to call?')
				.setRequired(true))

		.addIntegerOption(option =>
			option.setName('time')
				.setRequired(true)
				.setDescription('How long you want to timeout?'))
		.addStringOption(option =>
			option.setName('value')
				.setDescription('Time Unit')
				.setRequired(true)
				.addChoices(
					{ name: 'Seconds', value: 'Seconds' },
					{ name: 'Minutes', value: 'Minutes' },
					{ name: 'Hours', value: 'Hours' },
					{ name: 'Days', value: 'Days' },
					{ name: 'Weeks', value: 'Weeks' },
				))

		.addStringOption(option =>
			option.setName('reason')
				.setDescription('Why you want to do to that?'))

		.setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers),


	/**
	 * 
	 * 
	 * @param {CommandInteraction} interaction
	 */

	async execute(client, interaction) {
		var mb = interaction.options.getUser('member');
		var time = interaction.options.getInteger('time');
		var value = interaction.options.getString('value');
		var reason = interaction.options.getString('reason') ?? 'None';
		// let temp = 0;

		await interaction.deferReply({
			ephemeral: true,
		})


		const AuthorMember = interaction.guild.members.cache.find(member => member.id === interaction.user.id)
		const targetMember = interaction.guild.members.cache.find(member => member.id === mb.id)

		const result = await timeout_member(client, interaction, AuthorMember, targetMember, time, value , reason);

		await interaction.followUp({
			embeds: result.message,
			ephemeral: true,
		})
	},
};