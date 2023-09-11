const { SlashCommandBuilder, CommandInteraction, EmbedBuilder } = require('discord.js');
var { freemem, totalmem, cpus } = require('os');
const { get_status } = require('../../Commands/Ultility/status');

module.exports = { status_prefix }

/**
 * 
 * @param {CommandInteraction} interaction 
 */

async function status_prefix(client, interaction) {

    const result = await get_status(client, interaction);

    await interaction.reply({
        embeds: result.message,
    });
}