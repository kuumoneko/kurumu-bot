const { SlashCommandBuilder, PermissionFlagsBits, CommandInteraction, Client } = require('discord.js');
const { joinVoiceChannel, getVoiceConnection } = require('@discordjs/voice');
const { QueryType, useQueue, useMainPlayer } = require('discord-player')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('resume')
        .setDescription('Resume play!'),
    /**
     * 
     * 
     * @param {CommandInteraction} interaction 
     */

    async execute(client, interaction) {

        await interaction.deferReply()

        const queue = useQueue(interaction.guildId);

        if (!queue.node.isPaused()) {
            queue.node.setPaused(false)

            await interaction.followUp({
                content: `I have resume the queue`,
                ephemeral: true,
            });
            return;
        }
        else {
            await interaction.followUp({
                content: `I'm not pausing now`,
                ephemeral: true,
            });
        }


    },
};