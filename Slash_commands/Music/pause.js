const { SlashCommandBuilder, CommandInteraction } = require('discord.js');
const { pausing } = require('../../Commands/Music/pause');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('pause')
        .setDescription('Pause play!'),
    /**
     * 
     * 
     * @param {CommandInteraction} interaction 
     */

    async execute(client, interaction) {

        await interaction.deferReply({
            ephemeral: true
        });

        const result = await pausing(client, interaction);

        await interaction.followUp({
            embeds: result.message,
            ephemeral: true,
        });
    },
};