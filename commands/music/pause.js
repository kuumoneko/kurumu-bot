const { SlashCommandBuilder, CommandInteraction, EmbedBuilder } = require('discord.js');
const { useQueue } = require('discord-player')

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

        const queue = useQueue(interaction.guildId);

        if (queue.node.isPlaying()) {
            queue.node.setPaused(true)

            await interaction.followUp({
                embeds: [
                    new EmbedBuilder()
                        .setTitle(`I have paused the queue`)
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
                                name: `I can't pause the queue`,
                                value: `Reason : I'm not playing anything now`
                            }
                        ])
                ],
                ephemeral: true,
            });
        }


    },
};