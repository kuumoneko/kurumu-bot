const { EmbedBuilder, ActionRowBuilder, StringSelectMenuOptionBuilder } = require('discord.js');
const { ButtonBuilder, ButtonStyle, CommandInteraction, StringSelectMenuBuilder } = require('discord.js');

module.exports = { view_bans }
/**
 * 
 * 
 * @param {CommandInteraction} interaction
 */

async function view_bans(client, interaction) {

	const bans = await interaction.guild.bans.fetch();
	const bans_length = bans.size;

	if (bans_length == 0) {
		await interaction.followUp({
			embeds: [new EmbedBuilder()
				.setTitle("Ban list for `" + `${interaction.guild}` + "`")
				.setFooter({
					text: `Page 1 of 1`,
				})
				.setColor(client.get_color())
				.addFields(
					{
						name: `Your guild don't have any banned member`,
						value: '  '
					}
				)
			],
			ephemeral: true,
		});
	}

	else {
		var embeds = await update_embeds(client, interaction);

		var curr_page = 0;
		var max_page = embeds.length - 1;

		var view = await update_component(interaction, curr_page, max_page, embeds);

		var response = await interaction.followUp({
			embeds: [embeds[curr_page]],
			components: view,
		})

		while (true) {
			const collectorFilter = i => i.user.id === interaction.user.id;
			try {
				const confirmation = await response.awaitMessageComponent({ filter: collectorFilter });

				if (confirmation.customId === '<<') {
					curr_page = 0;
					view = await update_component(interaction, curr_page, max_page, embeds);
					await confirmation.update({ embeds: [embeds[curr_page]], components: view });
				}
				else if (confirmation.customId === '<') {
					curr_page--;
					view = await update_component(interaction, curr_page, max_page, embeds);
					await confirmation.update({ embeds: [embeds[curr_page]], components: view });
				}
				else if (confirmation.customId === '>') {
					curr_page++;
					view = await update_component(interaction, curr_page, max_page, embeds);
					await confirmation.update({ embeds: [embeds[curr_page]], components: view });
				}
				else if (confirmation.customId === '>>') {
					curr_page = max_page;
					view = await update_component(interaction, curr_page, max_page, embeds);
					await confirmation.update({ embeds: [embeds[curr_page]], components: view });
				}
				else if (confirmation.customId === 'noice') {
					await confirmation.update(
						{
							content: "You have done your action",
							embeds: [embeds[curr_page]],
							components: []
						})

					return;
				}
				else if (confirmation.customId === 'nope') {
					await confirmation.update({
						content: `You have canceled your action`,
						embeds: [embeds[curr_page]],
						components: []
					})

					return;
				}
				else if (confirmation.customId === 'unban') {

					const selection = Number(confirmation.values[0]) - 1;

					const bans = await interaction.guild.bans.fetch();
					const banned_member = bans.map(user => {
						return {
							user: user.user,
						}
					});

					await interaction.guild.members.unban(banned_member[selection].user);

					embeds = await update_embeds(client, interaction);

					var curr_page = 0;
					var max_page = embeds.length - 1;

					var view = await update_component(interaction, curr_page, max_page, embeds);

					await confirmation.update({
						content: `You have unban ${banned_member[selection].user.globalName}`,
						embeds: [embeds[curr_page]],
						components: view,
					});

				} else if (confirmation.customId === 'reset') {

					await update_embeds(client, interaction);
					var curr_page = 0;
					var max_page = embeds.length - 1;

					var view = await update_component(interaction, curr_page, max_page, embeds);
					await confirmation.update({
						embeds: [embeds[curr_page]],
						components: view,
					});
				}
			}
			catch (e) {
				await interaction.editReply({
					content: `Confirmation not received with error, cancelling...\nError: ${e}`,
					components: []
				});
				return [];
			}
		}
	}
}

/**
 * 
 * @param {CommandInteraction} interaction 
 */
async function update_embeds(client, interaction) {
	const bans = await interaction.guild.bans.fetch();
	const bans_length = bans.size;
	const totalPages = Math.ceil(bans_length / 10) || 1;

	if (bans_length == 0) {
		return [
			new EmbedBuilder()
				.setTitle("Ban list for `" + `${interaction.guild}` + "`")
				.setFooter({
					text: `Page 1 of 1`,
				})
				.setColor(client.get_color())
				.addFields(
					{
						name: `Your guild don't have any banned member`,
						value: '  '
					}
				)
		];
	}

	const banned_member = bans.map(user => {
		return {
			name: user.user.globalName,
			id: user.user.id,
			reason: user.reason
		}
	});

	var embeds = []

	var j = 1;
	while (j <= totalPages) {
		var emmm = new EmbedBuilder()
			.setColor(client.get_color())
			.setFooter({
				text: `Page ${j} of ${totalPages}`
			})
		embeds.push(emmm);
		j++;
	}

	var i = 0;

	banned_member.forEach((user) => {
		embeds[Math.floor(i / 10)].addFields({
			name: `${i + 1}/> ${user.name}`,
			value: `> Reason: ${user.reason}`,
		})

		i++;
	})

	return embeds;
}


/**
 * @param {CommandInteraction} interaction 
 * @param {[]} embeds 
 * @returns 
 */

async function update_component(interaction, curr, maxx, embeds) {

	const bans = await interaction.guild.bans.fetch();
	const bans_length = bans.size;

	if (bans_length == 0)
		return [];

	var butt1 = new ButtonBuilder()
		.setLabel("⏪")
		.setCustomId("<<")
		.setStyle(ButtonStyle.Primary)
		.setDisabled((curr == 0) ? true : false)

	var butt2 = new ButtonBuilder()
		.setLabel("◀️")
		.setCustomId("<")
		.setStyle(ButtonStyle.Primary)
		.setDisabled((curr == 0) ? true : false)

	var butt3 = new ButtonBuilder()
		.setLabel("▶️")
		.setCustomId(">")
		.setStyle(ButtonStyle.Primary)
		.setDisabled(curr == maxx ? true : false)

	var butt4 = new ButtonBuilder()
		.setLabel("⏩")
		.setCustomId(">>")
		.setStyle(ButtonStyle.Primary)
		.setDisabled(curr == maxx ? true : false)

	var confirm = new ButtonBuilder()
		.setLabel("✅")
		.setCustomId("noice")
		.setStyle(ButtonStyle.Success)

	var nope = new ButtonBuilder()
		.setLabel("❌")
		.setCustomId("nope")
		.setStyle(ButtonStyle.Danger)

	var reset = new ButtonBuilder()
		.setLabel("🔃")
		.setCustomId("reset")
		.setStyle(ButtonStyle.Primary)


	var unban_select = new StringSelectMenuBuilder()
		.setCustomId('unban')
		.setPlaceholder('Who do you want to unban?')


	for (i = 1; i <= embeds[curr].data.fields.length; i++) {
		unban_select.addOptions(
			new StringSelectMenuOptionBuilder()
				.setLabel(`${curr * 10 + i}`)
				.setValue(`${curr * 10 + i}`),
		)
	}

	var view1 = new ActionRowBuilder()
		.addComponents(butt1, butt2, butt3, butt4)

	var view2 = new ActionRowBuilder()
		.addComponents(confirm, nope, reset)

	var view3 = new ActionRowBuilder()
		.addComponents(unban_select)

	return [view1, view2, view3];
}