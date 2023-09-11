const { SlashCommandBuilder, CommandInteraction } = require('discord.js');
const { now_playing } = require('../../Commands/Music/nplay');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('nplay')
        .setDescription('Show current track'),

    /**
     * 
     * 
     * @param {CommandInteraction} interaction 
     */

    async execute(client, interaction) {
        await interaction.deferReply({
            ephemeral: true,
        })
        const npl = await now_playing(client, interaction);
        await interaction.followUp({
            embeds: npl.message,
            ephemeral: true
        });
    }

};
