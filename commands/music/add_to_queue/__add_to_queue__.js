const { CommandInteraction, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { spawn } = require('child_process');
var _ = require("lodash");
const aclient = require('../../../src/aclient');
const { QueryType, useMainPlayer } = require('discord-player')

/**
 * 
 * @param {CommandInteraction} interaction 
 * @param {string} prompt
 */
async function add_to_queue(client, interaction, prompt, mode) {

    const kclient = client.client;
    const id = interaction.guildId;
    var videos = await check_prompt(client, interaction, prompt, mode)

    var check = _.get(client.ctrack, id, 'None');
    if (check == 'None') {
        client.ctrack[id] = [];
    }

    var ctrack = client.ctrack[id]

    return videos;
}

module.exports = {
    add_to_queue: add_to_queue,
}



/**
 * @param {aclient} client 
 * @param {CommandInteraction} interaction 
 * @param {string} prompt 
 * @returns 
 */
async function check_prompt(client, interaction, prompt, mode) {
    const player = useMainPlayer();
    var searchResult;

    if (mode == 'youtube') {
        searchResult = await player.search(prompt, {
            requestedBy: interaction.user,

            searchEngine: QueryType.YOUTUBE_SEARCH,
        })
    }
    else if (mode == 'spotify') {
        searchResult = await player.search(prompt, {
            requestedBy: interaction.user,
            searchEngine: QueryType.SPOTIFY_SEARCH
        })
    }
    else if (mode == 'soundcloud') {
        searchResult = await player.search(prompt, {
            requestedBy: interaction.user,
            searchEngine: QueryType.SOUNDCLOUD_SEARCH,
        })
    }

    const vidsresult = searchResult.tracks;
    var kclient = client.client
    var embeds = []
    var color = client.get_color()

    /**
     * 
    item:

    duration
    author (kênh)
    title
    url
    thumnail

     */

    vidsresult.forEach(item => {

        var time = item.duration;
        var timee = time.split(':');

        timee = timee.reverse();

        var hours, minutes, seconds, days, weeks, months, years;

        seconds =   Number(timee[0]);
        minutes =   Number(timee[1]);
        hours   =   (timee.length > 2) ? Number(timee[2]) : 0;

        days   =    Math.floor(hours / 24);
        weeks  =    Math.floor(days / 7);
        months =    Math.floor(weeks / 4);
        years  =    Math.floor(months / 12);


        months =    months % 12;
        hours  =    hours % 24;
        days   =    days % 7;
        weeks  =    weeks % 4;
    
        
        // console.log(`${years}, ${months}, ${weeks}, ${days}, ${hours}:${minutes}:${seconds}`);
        var dur = "";
        if (years !== 0) {
            dur += `${years} years `
        }
        if (months !== 0) {
            dur += `${months} months `
        }
        if (weeks !== 0) {
            dur += `${weeks} weeks `
        }
        if (days !== 0) {
            dur += `${days} days `
        }
        if (hours !== 0) {
            dur += `${hours} hours `
        }
        if (minutes !== 0) {
            dur += `${minutes} minutes `
        }
        if (seconds !== 0) {
            dur += `${seconds} seconds`
        }

        const embeb = new EmbedBuilder()
            .setColor(color)
            .setDescription("Chose your track:)")
            .setThumbnail(item.thumbnail)
            .addFields(
                { name: "Track's name:", value: item.title, inline: false },
                { name: "Channel:", value: item.author, inline: false },
                { name: "Duration:", value: dur, inline: false },
            )

        embeds.push({
            embeb: embeb,
            link: item.url,
        });

    })

    var curr_page = 0;
    var max_page = vidsresult.length -1;

    var view = await update_component(curr_page, max_page);

    var response = await interaction.followUp({
        embeds: [embeds[curr_page].embeb],
        components: view,
    })

    var done = false;
    while (done == false) {
        const collectorFilter = i => i.user.id === interaction.user.id;
        try {
            const confirmation = await response.awaitMessageComponent({ filter: collectorFilter });

            if (confirmation.customId === '<<') {
                curr_page = 0;
                view = await update_component(curr_page, max_page);
                await confirmation.update({ embeds: [embeds[curr_page].embeb], components: view });
            }
            else if (confirmation.customId === '<') {
                curr_page--;
                view = await update_component(curr_page, max_page);
                await confirmation.update({ embeds: [embeds[curr_page].embeb], components: view });
            }
            else if (confirmation.customId === '>') {
                curr_page++;
                view = await update_component(curr_page, max_page);
                await confirmation.update({ embeds: [embeds[curr_page].embeb], components: view });
            }
            else if (confirmation.customId === '>>') {
                curr_page = max_page;
                view = await update_component(curr_page, max_page);
                await confirmation.update({ embeds: [embeds[curr_page].embeb], components: view });
            }
            else if (confirmation.customId === 'noice') {
                await confirmation.update({ content: "You have chosen this track:", embeds: [embeds[curr_page].embeb], components: [] })

                return embeds[curr_page].link;
            }
            else if (confirmation.customId === 'nope') {
                await confirmation.update({ content: "You haven't chosen any track", embeds: [], components: [] })

                return 'None';
            }
        } catch (e) {
            await interaction.editReply({ content: `Confirmation not received with error, cancelling...\nError: ${e}`, components: [] });
            return [];
        }
    }

}

async function update_component(curr, maxx) {

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
    
    

    var view1 = new ActionRowBuilder()
        .addComponents(butt2, butt4 , confirm)
    
    var view2 = new ActionRowBuilder()
        .addComponents(butt1 , butt3, nope)


    return [view1 , view2];


}


/**
  const buttons = [];
for (let i = 0; i < 10; i++) {
  buttons.push(
    new MessageButton()
      .setCustomId(i.toString())
      .setLabel(`Button ${i}`)
      .setStyle('PRIMARY')
  );
}

const row1 = new MessageActionRow().addComponents(buttons.slice(0, 5));
const row2 = new MessageActionRow().addComponents(buttons.slice(5, 10));

msg.reply({ embeds: [embedRecipient], components: [row1, row2] });

 */