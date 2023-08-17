const { EmbedBuilder, ActionRowBuilder, StringSelectMenuOptionBuilder } = require('@discordjs/builders');
const { SlashCommandBuilder, Client, CommandInteraction, PermissionFlagsBits, Embed, StringSelectMenuBuilder } = require('discord.js');
// const {Em} = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('bans')
		.setDescription('See bans list and unban member!')
		.setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
	/**
	 * 
	 * 
	 * @param {CommandInteraction} interaction
	 */

	async execute(client, interaction) {

		const bans = await interaction.guild.bans.fetch();

		// Create an array of banned user names and ids
		const banned = bans.map(user => `${user.user.tag} (${user.user.id})`);

		if (banned.length > 0) {

			const options = bans.map(user => ({
				label: user.user.tag,
				value: user.user.id,
				description: `Unban ${user.user.tag} from the server`
			}));
			// Create a new select menu component
			const menu = new ActionRowBuilder()
				.addComponents(
					new StringSelectMenuBuilder()
						.setCustomId('unban-menu')
						.setPlaceholder('Select a banned member to unban')
						.addOptions(options)
				);
			// Create a new embed
			const embed = new EmbedBuilder()
				.setTitle(`Banned Members in ${interaction.guild.name}`)
				.setDescription(`${banned}`)
				.setColor(0xFF0000);
			// Reply with the embed and the select menu and set the reply as ephemeral (only visible to the user)
			await interaction.reply({ embeds: [embed], components: [menu], ephemeral: true });
			// Create a collector to collect the user selection
			const filter = i => i.customId === 'unban-menu' && i.user.id === interaction.user.id;
			const collector = interaction.channel.createMessageComponentCollector({ filter, time: 15000 });
			// Listen for collect event
			collector.on('collect', async i => {
				// Get the user id from the selected option value
				const userId = i.values[0];
				// Try to unban the user from the guild
				try {
					await interaction.guild.members.unban(userId);
					menu.components[0].setDisabled(true)
					// Edit the original reply with a success message and disable the select menu
					await interaction.editReply({
						content: `Successfully unbanned <@${userId}> from the server.`,
						components: [menu],
					});
				} catch (error) {
					menu.components[0].setDisabled(true)
					// menu.components.
					// Edit the original reply with an error message and disable the select menu
					await interaction.editReply({
						content: `There was an error trying to unban <@${userId}>: ${error.message}`,
						components: [menu]
					});
				}
			});
			// Listen for end event
			collector.on('end', collected => {
				// Check if no selections were made
				if (collected.size === 0) {
					// Edit the original reply with a timeout message and disable the select menu
					interaction.editReply({
						content: 'You did not select any option. The command has timed out.',
						components: [menu.setDisabled(true)]
					});
				}
			});
		}


		else {
			const embed = new EmbedBuilder()
				.setTitle(`Banned Members in ${interaction.guild.name}`)
				.setDescription(`No baned member`)
				.setColor(0xFF0000);

			// Send the embed to the same channel as the message
			await interaction.reply({
				embeds: [embed],
			})
		}
	}


};
