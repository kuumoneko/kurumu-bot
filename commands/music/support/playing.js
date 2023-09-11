const { CommandInteraction } = require('discord.js');
const { useQueue, useMainPlayer } = require('discord-player')
const _ = require('lodash')
const { YOUTUBE_API_KEY } = require('../../../database/config.json')

// get a similar song from YouTube based on a video ID
async function getSimilarSong(videoId) {
    // construct the API URL with the relatedToVideoId filter
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&relatedToVideoId=${videoId}&type=video&key=${YOUTUBE_API_KEY}`;
    // fetch the response from the API
    const response = await fetch(url);
    // parse the response as JSON
    const data = await response.json();
    // get the first item from the results
    const item = data.items[0];
    // return the video ID and title of the similar song
    return {
        id: item.id.videoId,
        title: item.snippet.title
    };
}

/**
 * 
 * @param {*} client 
 * @param {CommandInteraction} interaction 
 */
async function playing(client, interaction) {

    const check = useQueue(interaction.guildId);

    var user;
    if (interaction.deferred) {
        user = interaction.user;
    }
    else {
        user = interaction.author;
    }

    if (check && check.node.isPlaying()) {
        return;
    }

    const player = useMainPlayer()

    while (client.ctrack[interaction.guildId].length > 0) {

        const urrl = client.ctrack[interaction.guildId][0] ?? 'None';

        if (urrl === 'None')
            return;

        await player.play(interaction.member.voice.channel, urrl, {
            nodeOptions: {
                leaveOnEmpty: true,
                leaveOnEmptyCooldown: 300_000,
                leaveOnEnd: true,
                leaveOnEndCooldown: 300_000,
                leaveOnStop: true,
                leaveOnStopCooldown: 300_000,
                maxSize: 1000,
                maxHistorySize: 100,
                volume: 50,
                bufferingTimeout: 3000,
                connectionTimeout: 30000,
                metadata: {
                    requestedBy: user
                }
            }
        });

        await sleep(3000)

        const queue = useQueue(interaction.guildId);
        const curr = queue.currentTrack;

        while (queue.node.isPlaying()) {
            await sleep(100);
        }

        // console.log(client.ctrack[interaction.guildId])

        if (client.ctrack[interaction.guildId].length > 0)
            if (((await useMainPlayer().search(client.ctrack[interaction.guildId][0]))._data.tracks[0] == curr)) {
                if (client.isloop[interaction.guildId] === '2') {
                    const first = client.ctrack[interaction.guildId].shift();
                    client.ctrack[interaction.guildId].push(first)
                }
                else if (client.isloop[interaction.guildId] !== '1') {
                    const first = client.ctrack[interaction.guildId].shift();
                    client.ptrack[interaction.guildId].push(first)
                }
            }

        if (client.isloop[interaction.guildId] === '3' && client.ctrack[interaction.guildId].length === 0) {
            const id = client.ptrack[interaction.guildId].substr(client.ptrack[interaction.guildId] - 11);
            client.ctrack[interaction.guildId] = `https://youtu.be/${await getSimilarSong(id)}`
        }

    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = {
    playing,
};