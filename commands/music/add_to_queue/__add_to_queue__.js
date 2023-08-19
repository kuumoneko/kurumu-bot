const { SlashCommandBuilder, PermissionFlagsBits, CommandInteraction, Client } = require('discord.js');
const { spawn } = require('child_process');
const fs = require('fs');
const { API_KEY, CLIENT_ID } = require('D:\\kurumu-bot\\config.json');
var _ = require("lodash");

const YouTube = require('D:\\kurumu-bot\\src\\youtube\\YouTube');

/**
 * 
 * @param {CommandInteraction} interaction 
 * @param {string} prompt
 */
async function add_to_queue(client, interaction, prompt) {

    const kclient = client.client;
    const id = interaction.guildId;
    var videos = await check_prompt(prompt)

    var check = _.get(client.ctrack, id, 'None');
    if (check == 'None')
    {
        client.ctrack[id] = [];
    }
    
    var ctrack = client.ctrack[id]

    videos.forEach(item => {
        ctrack.push(item)
    })

    client.ctrack[id] = ctrack;

}

module.exports = {
    add_to_queue : add_to_queue,
}



const youtube = new YouTube(API_KEY);

async function search_query(prompt) {
    const result = await youtube.searchVideos(prompt)
    return result;
}

async function search_playlist(prompt) {
    const result = await youtube.getPlaylistByID(prompt)
    return result;
}

async function search_video(prompt) {
    const result = await youtube.getVideoByID(prompt)
    return result;
}

/**
 * 
 * @param {string} prompt 
 * @returns 
 */
async function check_prompt(prompt) {


    if (prompt.indexOf('www.youtube.com/watch?v=') !== -1 || prompt.indexOf('youtu.be/') !== -1) {
        var temp = prompt.slice(prompt.length - 11);
        const res = await search_video(temp)
        var result = []
        result.push(res)
        return result

    }
    else if (prompt.indexOf('youtube.com/playlist?list=') !== -1) {
        var temp = prompt.slice(prompt.indexOf('=') + 1);

        const res = await search_playlist(temp)
        return res
    }
    else {
        const res = await search_query(prompt);

        return res
    }
}