const {  CommandInteraction } = require('discord.js');
const { now_playing } = require('../../Commands/Music/nplay');

module.exports = { nplayy };

/**
 * 
 * 
 * @param {CommandInteraction} interaction 
 */

async function nplayy(client, interaction) {
    const npl = await now_playing(client, interaction);
    await interaction.reply({
        embeds: npl.message
    })
}