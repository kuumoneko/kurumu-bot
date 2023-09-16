const { CommandInteraction, EmbedBuilder } = require('discord.js');
const { useQueue } = require('discord-player')

module.exports = { now_playing };

/**
 * 
 * 
 * @param {CommandInteraction} interaction 
 */

async function now_playing(client, interaction) {

    const queue = useQueue(interaction.guildId);

    if (queue) {
        return {
            code: 200,
            message: [
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
        }
    }
    else {
        return {
            code: 404,
            message: [
                new EmbedBuilder()
                    .setColor(client.get_color())
                    .addFields([
                        {
                            name: `I can't get current track`,
                            value: `Error: I'm not playing anything now`,
                        },
                    ])
            ],
        }
    }
}
