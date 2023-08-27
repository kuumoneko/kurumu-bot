const { SlashCommandBuilder, PermissionFlagsBits, CommandInteraction, Client } = require('discord.js');
const { joinVoiceChannel, getVoiceConnection } = require('@discordjs/voice');
const { QueryType, useQueue, useMainPlayer } = require('discord-player')

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

        await interaction.deferReply()

        const queue = useQueue(interaction.guildId);

        if (!queue.node.isPlaying()) {
            queue.node.setPaused(true)

            await interaction.followUp({
                content: `I have pause the queue`,
                ephemeral: true,
            });
            return;
        }
        else {
            await interaction.followUp({
                content: `I have pauseed before`,
                ephemeral: true,
            });
        }


    },
};