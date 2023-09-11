const {  CommandInteraction } = require('discord.js');
const { useQueue, useMainPlayer } = require('discord-player')
const _ = require('lodash')
const { playing } = require('./support/playing')
const { update_component, update_embed } = require('./support/update')

module.exports = {
	see_queue
}

/**
 * 
 * all activities:
 * 
 * 		- See queue 		| Supported ✅
 * 		- Delete track(s)	| Supported ✅
 * 		- Skip to track		| Supported ✅
 * @param {CommandInteraction} interaction 
 */

async function see_queue(client, interaction) {

	var user;
	if (interaction.deferred) {
		user = interaction.user;
	}
	else {
		user = interaction.author
	}

	var embeds = await update_embed(client, interaction);

	var curr_page = 0;
	var max_page = embeds.length - 1;

	var view = await update_component(curr_page, max_page, embeds);

	var response = (interaction.deferred)

		? await interaction.followUp({
			embeds: [embeds[curr_page]],
			components: view,
		})
		: await interaction.reply({
			embeds: [embeds[curr_page]],
			components: view,
		});

	while (true) {
		const collectorFilter = i => i.user.id === user.id;
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
}
