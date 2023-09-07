const { SlashCommandBuilder, CommandInteraction, EmbedBuilder } = require('discord.js');
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



        if (queue) {
            await interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setTitle(`Now playing:`)
                        .setColor(client.get_color())
                        .setThumbnail(queue.currentTrack.thumbnail)
                        .addFields([
                            {
                                name: `Title:`,
                                value: `${queue.currentTrack.title}`,
                            },
                            {
                                name: `Author:`,
                                value: `${queue.currentTrack.author}`
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
            await interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setColor(client.get_color())
                        .addFields([
                            {
                                name: `I can't get current track`,
                                value: `Reason: I'm not playing anything now`,
                            },
                        ])
                ],

                ephemeral: true,
            });
        }



    }

};
