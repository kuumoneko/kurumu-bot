const { CommandInteraction, EmbedBuilder } = require('discord.js');
const { add_to_queue } = require('./support/__add_to_queue__');
const { useMainPlayer } = require('discord-player')
const _ = require('lodash')

module.exports = {
    play_music
}

/**
 *  
 * @param {CommandInteraction} interaction 
 */

async function play_music(client, interaction, prompts, isloop, isshuffle, mode) {
    const VoiceChannel = interaction.member.voice.channel;

    if (!VoiceChannel) {
        return {
            code: 404,
            message: [
                new EmbedBuilder()
                    .setColor(client.get_color())
                    .addFields({
                        name: `Please join a voice channel first`,
                        value: ` `
                    })
            ]
        };
    }

    const player = useMainPlayer();
    var tracks;

    if (_.get(client.ctrack, interaction.guildId, 'None') === 'None') {
        client.ctrack[interaction.guildId] = []
        client.ptrack[interaction.guildId] = []
    }

    var temp = prompts.split(',')

    prompts = []
    temp.forEach(prompt => {
        if (prompt[0] === ' ')
            prompt = prompt.slice(1)
        if (prompt[prompt.length - 1] === ' ')
            prompt = prompt.slice(0, prompt.length - 1)

        // console.log(prompt)
        prompts.push(prompt)
    })

    var cnt = 0;

    for (var prompt of prompts) {
        var tracks;
        if (prompt.search('youtu') != -1 || prompt.search('spotify') != -1 || prompt.search('soundcloud') != -1) {

            prompt = prompt.replace('?feature', '&feature')

            prompt = prompt.replace('?utm', '&feature')



            if (prompt.search('&') != -1) {
                prompt = prompt.split('&')[0];
            }

            tracks = await player.search(prompt);

            tracks._data.tracks.forEach(item => {
                client.ctrack[interaction.guildId].push(item.url);
                cnt++;
            })

        }
        else if (prompt !== undefined) {
            tracks = await add_to_queue(client, interaction, prompt, mode);

            if (tracks !== '') {
                client.ctrack[interaction.guildId].push(tracks[0]);
                cnt++;
            }

        }
    }

    if (isshuffle == true) {
        var array = client.ctrack[interaction.guildId];
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }

        client.ctrack[interaction.guildId] = array;
    }

    if (isloop !== 'None') {
        client.isloop[interaction.guildId] = isloop;
    }
    else {
        client.isloop[interaction.guildId] = (_.get(client.isloop, interaction.guildId, 'None') === 'None') ? '0' : client.isloop[interaction.guildId];
    }

    return {
        code: 200,
        message: [
            new EmbedBuilder()
                .setColor(client.get_color())
                .setFields({
                    name: `I have added some tracks to queue`,
                    value: `Number of tracks: ${cnt}`
                })
        ],
    }
}
