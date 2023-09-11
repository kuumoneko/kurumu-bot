const { CommandInteraction} = require('discord.js');
const { resuming } = require('../../Commands/Music/resume');

module.exports = { resume_prefix }

/**
 * 
 * 
 * @param {CommandInteraction} interaction 
 */

async function resume_prefix(client, interaction) {

    const result = await resuming(client, interaction);

    await interaction.reply({
        embeds: result.message,
        ephemeral: true
    });
}