const { SlashCommandBuilder, PermissionFlagsBits, CommandInteraction, Client, EmbedBuilder } = require('discord.js');
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

        await interaction.deferReply({
            ephemeral: true
        });

        const queue = useQueue(interaction.guildId);

        if (queue.node.isPaused()) {
            queue.node.setPaused(false)

            await interaction.followUp({
                embeds: [
                    new EmbedBuilder()
                        .setTitle(`I have resumed the queue`)
                        .setThumbnail(queue.currentTrack.thumbnail)
                        .setColor(client.get_color())
                        .addFields([
                            {
                                name: `Current track:`,
                                value: `${queue.currentTrack.title}`
                            },
                            {
                                name: `Author:`,
                                value: `${queue.currentTrack.author}`,
                            },
                            {
                                name: `Now timestamp:`,
                                value: `${queue.node.getTimestamp().current.label} / ${queue.node.getTimestamp().total.label}`
                            }
                        ])
                ],
                ephemeral: true,
            });
        }
        else {
            await interaction.followUp({
                embeds: [
                    new EmbedBuilder()
                        .setColor(client.get_color())
                        .addFields([
                            {
                                name: `I can't resume the queue`,
                                value: `Reason : I'm not pausing now`
                            }
                        ])
                ],
                ephemeral: true,
            });
        }


    },
};