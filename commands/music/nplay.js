const { SlashCommandBuilder , CommandInteraction } = require('discord.js');
const _ = require("lodash");
const { useQueue } = require('discord-player')

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
        const queue = useQueue(interaction.guildId);

        await interaction.reply({
            content: `Now playing: ${queue.currentTrack}`,
            ephemeral: true,
        })

    }

};
