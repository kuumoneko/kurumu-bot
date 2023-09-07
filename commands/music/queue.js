const { SlashCommandBuilder, PermissionFlagsBits, CommandInteraction, Client, EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require('discord.js');
const { ButtonStyle, UserSelectMenuBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ComponentType } = require('discord.js');
const { QueryType, useQueue, useMainPlayer } = require('discord-player')
const _ = require('lodash')
const { playing } = require('./support/playing')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('queue')
		.setDescription('See the queue or make change tracks!'),


	/**
	 * 
	 * all activities:
	 * 
	 * 		- See queue
	 * 		- Delete track(s)
	 * 		- Swap track(s)
	 * 		- Move track(s)
	 * 		- Skip to track
	 * @param {CommandInteraction} interaction 
	 */

	async execute(client, interaction) {
		await interaction.deferReply({
			ephemeral: true
		})

		var embeds = await update_embed(client, interaction);

		var curr_page = 0;
		var max_page = embeds.length - 1;

		var view = await update_component(curr_page, max_page, embeds);

		var response = await interaction.followUp({
			embeds: [embeds[curr_page]],
			components: view,
		})

		while (true) {
			const collectorFilter = i => i.user.id === interaction.user.id;
			try {
				const confirmation = await response.awaitMessageComponent({ filter: collectorFilter });
				// const collector = response.createMessageComponentCollector({ componentType: ComponentType.StringSelect, time: 3_600_000 });

				if (confirmation.customId === '<<') {
					curr_page = 0;
					view = await update_component(curr_page, max_page, embeds);
					await confirmation.update({ embeds: [embeds[curr_page]], components: view });
				}
				else if (confirmation.customId === '<') {
					curr_page--;
					view = await update_component(curr_page, max_page, embeds);
					await confirmation.update({ embeds: [embeds[curr_page]], components: view });
				}
				else if (confirmation.customId === '>') {
					curr_page++;
					view = await update_component(curr_page, max_page, embeds);
					await confirmation.update({ embeds: [embeds[curr_page]], components: view });
				}
				else if (confirmation.customId === '>>') {
					curr_page = max_page;
					view = await update_component(curr_page, max_page, embeds);
					await confirmation.update({ embeds: [embeds[curr_page]], components: view });
				}
				else if (confirmation.customId === 'noice') {
					await confirmation.update({ content: "You have chosen this track:", embeds: [embeds[curr_page]], components: [] })

					return;
				}
				else if (confirmation.customId === 'nope') {
					await confirmation.update({ embeds: [embeds[curr_page]], components: [] })

					return;
				}
				else if (confirmation.customId === 'delete') {


					const selection = Number(confirmation.values[0]) - 1;
					var infront;
					if (selection < 1) {
						infront = [];
					}
					else {
						infront = client.ctrack[interaction.guildId].slice(0, selection);
					}

					const inafter = client.ctrack[interaction.guildId].slice(selection + 1);
					const selected = client.ctrack[interaction.guildId][selection];

					client.ctrack[interaction.guildId] = infront;

					if (_.get(client.isloop, interaction.guildId, undefined) === '2') {
						inafter.forEach(url => {
							client.ctrack[interaction.guildId].push(url)
						});
					}

					if (selection == 0) {
						useQueue(confirmation.guildId).node.stop();

						await playing(client, interaction);
					}

					await new Promise((resolve) => setTimeout(resolve, 1000));
					const deleted_track = (await useMainPlayer().search(selected))._data.tracks[0].title

					embeds = await update_embed(client, interaction);

					var curr_page = 0;
					var max_page = embeds.length - 1;

					var view = await update_component(curr_page, max_page, embeds);

					await confirmation.update({
						content: `You have deleted track ${deleted_track}`,
						embeds: [embeds[curr_page]],
						components: view,
					});
				}
				else if (confirmation.customId === 'skip') {

					const selection = Number(confirmation.values[0]) - 1;

					const bruh = ((await useMainPlayer().search(client.ctrack[interaction.guildId][selection]))._data.tracks[0].title == useQueue(interaction.guildId).currentTrack.title);


					if (bruh === false) {
						const infront = (selection !== 0) ?
							client.ctrack[interaction.guildId].slice(0, selection) : [];

						const inafter = client.ctrack[interaction.guildId].slice(selection);

						client.ctrack[interaction.guildId] = inafter;

						if (_.get(client.isloop, interaction.guildId, undefined) === '2') {
							infront.forEach(url => {
								client.ctrack[interaction.guildId].push(url)
							});
						}
						else if (client.isloop[interaction.guildId] !== '1') {
							infront.forEach(url => {
								client.ptrack[interaction.guildId].push(url)
							});
						}

						const queue = useQueue(confirmation.guildId);

						const curr_track = queue.currentTrack.title;

						useQueue(confirmation.guildId).node.stop();

						await playing(client, interaction);

						await new Promise((resolve) => setTimeout(resolve, 1000));

						const skiped_track = (await useMainPlayer().search(client.ctrack[interaction.guildId][0]))._data.tracks[0].title

						embeds = await update_embed(client, interaction);

						var curr_page = 0;
						var max_page = embeds.length - 1;

						var view = await update_component(curr_page, max_page, embeds);

						await confirmation.update({
							content: `You have skiped track ${curr_track} to ${skiped_track}`,
							embeds: [embeds[curr_page]],
							components: view,
						});
					}
					else {

						embeds = await update_embed(client, interaction);

						var curr_page = 0;
						var max_page = embeds.length - 1;

						var view = await update_component(curr_page, max_page, embeds);

						const queue = useQueue(confirmation.guildId);

						const curr_track = queue.currentTrack.title;

						await confirmation.update({
							content: `You can't skop track ${curr_track}`,
							embeds: [embeds[curr_page]],
							components: view,
						});
					}
				}
				else if (confirmation.customId === 'reset') {


					embeds = await update_embed(client, interaction);

					var curr_page = 0;
					var max_page = embeds.length - 1;

					var view = await update_component(curr_page, max_page, embeds);

					await confirmation.update({
						embeds: [embeds[curr_page]],
						components: view,
					});
				}

			} catch (e) {
				await interaction.editReply({ content: `Confirmation not received with error, cancelling...\nError: ${e}`, components: [] });
				return [];
			}
		}
	},
};

/**
 * 
 * @param {CommandInteraction} interaction 
 */

async function update_embed(client, interaction) {

	const tracks = client.ctrack[interaction.guildId];

	const queueLength = (_.get(client.ctrack , interaction.guildId , 'None') == 'None') ? 0 : client.ctrack[interaction.guildId].length || 0;

	if (queueLength == 0) {
		return [
			new EmbedBuilder()
				.setFooter({
					text: `Page 1 of 1`,
				})
				.setColor(client.get_color())
				.addFields(
					{
						name: `Your queue don't have any track`,
						value: '  '
					}
				)
		];
	}
	const totalPages = Math.ceil(queueLength / 10) || 1;

	const player = useMainPlayer()

	var embeds = []

	var j = 1;
	while (j <= totalPages) {
		var ava = interaction.user.displayAvatarURL();
		var emmm = new EmbedBuilder()
			.setThumbnail(ava)
			.setColor(client.get_color())
			.setFooter({
				text: `Page ${j} of ${totalPages}`
			})
		embeds.push(emmm);
		j++;
	}

	var i = 0;

	for (const track of tracks) {
		const search = await player.search(track)
		embeds[Math.floor(i / 10)].addFields({
			name: `${i + 1}/> ${search.tracks[0].title}`,
			value: ' 	',
		})

		i++;
	}
	return embeds;
}

/**
 * 
 * @param {[]} embeds 
 * @returns 
 */

async function update_component(curr, maxx, embeds) {

	if (embeds[0].data.fields[0].value == '  ')
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

	var delete_select = new StringSelectMenuBuilder()
		.setCustomId('delete')
		.setPlaceholder('What track do you want to delete?')


	for (i = 1; i <= embeds[curr].data.fields.length; i++) {
		delete_select.addOptions(
			new StringSelectMenuOptionBuilder()
				.setLabel(`${curr * 10 + i}`)
				.setValue(`${curr * 10 + i}`),
		)
	}

	var skip_select = new StringSelectMenuBuilder()
		.setCustomId('skip')
		.setPlaceholder('What track do you want to skip to?')


	for (i = 1; i <= embeds[curr].data.fields.length; i++) {
		skip_select.addOptions(
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
		.addComponents(delete_select)

	var view4 = new ActionRowBuilder()
		.addComponents(skip_select)


	return [view1, view2, view3, view4];
}