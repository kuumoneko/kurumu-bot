const { SlashCommandBuilder, CommandInteraction } = require('discord.js');
const { get_status } = require('../../Commands/Ultility/status');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('status')
        .setDescription('Get status of Kurumu client'),

    /**
     * 
     * @param {CommandInteraction} interaction 
     */

    async execute(client, interaction) {

        await interaction.deferReply({
            ephemeral: true
        })

        const result = await get_status(client, interaction);

        await interaction.followUp({
            embeds: result.message,
            ephemeral: true
        });
    }
};
