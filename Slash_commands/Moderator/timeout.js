const { PermissionFlagsBits, CommandInteraction, SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js')

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


		if (AuthorMember.roles.highest.position > targetMember.roles.highest.position) {

			var component = new ActionRowBuilder()
				.setComponents([
					new ButtonBuilder()
						.setCustomId('Yes')
						.setLabel('✅')
						.setStyle(ButtonStyle.Success),
					new ButtonBuilder()
						.setCustomId('No')
						.setLabel('❌')
						.setStyle(ButtonStyle.Danger)
				]);

			var res = await interaction.followUp({
				embeds: [
					new EmbedBuilder()
						.setColor(client.get_color())
						.addFields({
							name: `Are you sure to timeout ${targetMember.displayName} with reason: ${reason}`,
							value: `You have 5 seconds to choose Yes or No`
						})
				],
				components: [component],
				ephemeral: true
			});


			const collectorFilter = i => i.user.id === interaction.user.id;

			try {
				const comfirmation = await res.awaitMessageComponent({
					filter: collectorFilter,
					time: 5000
				})


				if (comfirmation.customId == 'Yes') {
					var temp;

					switch (value) {
						case 'Seconds':
							temp = time;
							break;
						case 'Minutes':
							temp = time * 60;
							break;
						case 'Hours':
							temp = time * 60 * 60;
							break;
						case 'Days':
							temp = time * 60 * 60 * 24;
							break;
						case 'Weeks':
							temp = time * 60 * 60 * 24 * 7;
							break;
						default:
							temp = 0;
							break;
					}

					await targetMember.timeout(temp * 1000, reason)

					await comfirmation.update({
						embeds: [
							new EmbedBuilder()
								.setColor(client.get_color())
								.addFields({
									name: `You have timeouted ${targetMember.displayName}`,
									value: `Reason: ${reason}`,
								})
						],
						components : [],
						ephemeral: true,
					})
				}
				else {
					await comfirmation.update({
						embeds: [
							new EmbedBuilder()
								.setColor(client.get_color())
								.addFields({
									name: `You have cancled this action`,
									value: `Reason: I don't know :)`,
								})
						],
						components: [],
						ephemeral: true,
					})
				}
			}
			catch (e) {
				await interaction.followUp({
					embeds: [
						new EmbedBuilder()
							.setColor(client.get_color())
							.addFields({
								name: `You have cancled this action`,
								value: `Reason: Timeout`,
							})
					],
					ephemeral: true,
				})
			}

		}
		else {
			await interaction.followUp({
				embeds: [
					new EmbedBuilder()
						.setColor(client.get_color())
						.addFields({
							name: `You can't timeout ${targetMember.displayName}`,
							value: `Reason: Missing permission`,
						})
				],
				ephemeral: true,
			})
		}


	},
};