const { CommandInteraction } = require('discord.js');
const { playing } = require('../../Commands/Music/support/playing');
const { play_music } = require('../../Commands/Music/play');

module.exports = {
    play_prefix
}

/**
 *  
 * @param {CommandInteraction} interaction 
 */

async function play_prefix(client, interaction, prompts, isloop, shuffle, mode) {

    const result = await play_music(client, interaction, prompts, isloop, shuffle, mode);

    await interaction.reply({
        embeds: result.message,
    });

    if (result.code === 200) {
        await playing(client, interaction);
    }
}