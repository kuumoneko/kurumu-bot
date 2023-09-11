const { PermissionFlagsBits, CommandInteraction, SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('untimeout')
		.setDescription('Untimeout a  member! (only use slash command)')
		.addUserOption(option =>
			option.setName('member')
				.setDescription('Who do you want to call?')
				.setRequired(true))
		.addStringOption(reason =>
			reason.setName('reason')
				.setDescription('Why do you do that?'))

		.setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers),
	/**
	 * 
	 * 
	 * @param {CommandInteraction} interaction
	 */

	async execute(client, interaction) {

		await interaction.deferReply({
			ephemeral: true,
		});

		const mb = interaction.options.getUser('member');
		const reason = interaction.options.getString('reason') ?? 'None';

		const AuthorMember = interaction.guild.members.cache.find(member => member.id === interaction.user.id);
		const targetMember = interaction.guild.members.cache.find(member => member.id === mb.id);


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
						.setTitle(`Remove timeout Action`)
						.setDescription(`Remove timeout a member in this server`)
						.setColor(client.get_color())
						.addFields({
							name: `Are you sure to remove timeout ${targetMember.displayName} with reason: ${reason}`,
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

					await targetMember.timeout(1, reason)

					await comfirmation.update({
						embeds: [
							new EmbedBuilder()
								.setColor(client.get_color())
								.addFields({
									name: `You have timeouted ${targetMember.displayName}`,
									value: `Reason: ${reason}`,
								})
						],
						components: [],
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
						.setDescription(`Remove timeout a member in this server`)
						.setColor(client.get_color())
						.addFields({
							name: `You can't remove timeout ${targetMember.displayName}`,
							value: `Reason: Missing permission`,
						})
				],
				ephemeral: true,
			})
		}
	},
};