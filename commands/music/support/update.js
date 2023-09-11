const { CommandInteraction, EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require('discord.js');
const { ButtonStyle, StringSelectMenuBuilder, StringSelectMenuOptionBuilder } = require('discord.js');
const { useMainPlayer } = require('discord-player')
const _ = require('lodash')

module.exports = {
    update_component, update_embed
}

/**
 * 
 * @param {CommandInteraction} interaction 
 */

async function update_embed(client, interaction) {

    const tracks = client.ctrack[interaction.guildId];

    const queueLength = (_.get(client.ctrack, interaction.guildId, 'None') == 'None') ? 0 : client.ctrack[interaction.guildId].length || 0;

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
        var ava = (interaction.deferred) ? interaction.user.displayAvatarURL() : interaction.author.displayAvatarURL();
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