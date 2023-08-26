const { SlashCommandBuilder, PermissionFlagsBits, CommandInteraction, Client, EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require('discord.js');
const { ButtonStyle, UserSelectMenuBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ComponentType } = require('discord.js');

const { joinVoiceChannel } = require('@discordjs/voice');
const { QueryType, useQueue, useMainPlayer } = require('discord-player')


// function sleep(ms) {
// 	return new Promise(() => {
// 		setTimeout(() => resolve(), ms);
// 	})
// }

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
		
	 	var embeds = await update_embed(interaction);

		var curr_page = 0;
		var max_page = embeds.length - 1;

		var view = await update_component(curr_page, max_page, embeds);

		var response = await interaction.followUp({
			embeds: [embeds[curr_page]],
			components: view,
		})

		var done = false;
		while (done == false) {
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
					await confirmation.update({embeds: [embeds[curr_page]], components: [] })

					return;
				}
				else if (confirmation.customId === 'delete') {

					const selection = Number(confirmation.values[0]) - 1;
					const queue = useQueue(confirmation.guildId);
					queue.node.remove(selection);

					const deleted_track = embeds[curr_page].data.fields[selection % 10].name;

					embeds = await update_embed(interaction);

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
					const queue = useQueue(confirmation.guildId);
					
					const curr_track = queue.currentTrack;


					queue.node.skipTo(selection);

					await new Promise((resolve) => setTimeout(resolve, 1000));

					const skiped_track = queue.currentTrack;

					
					embeds = await update_embed(interaction);

					var curr_page = 0;
					var max_page = embeds.length - 1;

					var view = await update_component(curr_page, max_page, embeds);

					await confirmation.update({
						content: `You have skiped track ${curr_track} to ${skiped_track}`,
						embeds: [embeds[curr_page]],
						components: view,
					});

					// return;
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

async function update_embed(interaction) {
	const queue = useQueue(interaction.guildId);

	const tracks = queue.tracks.data;
	const queueLength = queue.tracks.data.length;
	const totalPages = Math.ceil(queueLength / 10) || 1;

	var embeds = []

	var j = 1;
	while (j <= totalPages) {
		var ava = interaction.user.displayAvatarURL();
		var emmm = new EmbedBuilder()
			.setThumbnail(ava)
			.setFooter({
				text: `Page ${j} of ${totalPages}`
			})
		embeds.push(emmm);
		j++;
	}

	var i = 0;

	tracks.forEach(track => {
		embeds[Math.floor(i / 10)].addFields({
			name: `${i + 1}. ${track.title}`,
			value: ' 	',
		})

		i++;
	})

	return embeds;
}

/**
 * 
 * @param {[]} embeds 
 * @returns 
 */

async function update_component(curr, maxx, embeds) {

	var butt1 = new ButtonBuilder()
		.setLabel("<<")
		.setCustomId("<<")
		.setStyle(ButtonStyle.Primary)
		.setDisabled((curr == 0) ? true : false)

	var butt2 = new ButtonBuilder()
		.setLabel("<")
		.setCustomId("<")
		.setStyle(ButtonStyle.Primary)
		.setDisabled((curr == 0) ? true : false)

	var butt3 = new ButtonBuilder()
		.setLabel(">")
		.setCustomId(">")
		.setStyle(ButtonStyle.Primary)
		.setDisabled(curr == maxx ? true : false)

	var butt4 = new ButtonBuilder()
		.setLabel(">>")
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
		.addComponents(butt2, butt4, confirm)

	var view2 = new ActionRowBuilder()
		.addComponents(butt1, butt3, nope)

	var view3 = new ActionRowBuilder()
		.addComponents(delete_select)

	var view4 = new ActionRowBuilder()
		.addComponents(skip_select)

	return [view1, view2, view3, view4];


}