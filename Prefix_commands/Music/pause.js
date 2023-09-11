const { CommandInteraction } = require('discord.js');
const { pausing } = require('../../Commands/Music/pause');

module.exports = {
    pause_music
}

/**
 * 
 * 
 * @param {CommandInteraction} interaction 
 */

async function pause_music(client, interaction) {


    const result = await pausing(client, interaction);

    await interaction.reply({
        embeds: result.message,
    });


}