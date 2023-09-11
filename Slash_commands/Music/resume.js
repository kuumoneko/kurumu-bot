const { SlashCommandBuilder,  CommandInteraction } = require('discord.js');
const { resuming } = require('../../Commands/Music/resume');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('resume')
        .setDescription('Resume play!'),
    /**
     * @param {CommandInteraction} interaction 
     */

    async execute(client, interaction) {
        await interaction.deferReply({
            ephemeral: true
        });

        const result = await resuming(client, interaction);
        await interaction.followUp({
            embeds: result.message,
            ephemeral: true
        })
    },
};