const { CommandInteraction, EmbedBuilder } = require('discord.js');
const { useQueue } = require('discord-player')

module.exports = {
    pausing
};

/**
 * 
 * 
 * @param {CommandInteraction} interaction 
 */

async function pausing(client, interaction) {


    const queue = useQueue(interaction.guildId);

    if (queue.node.isPlaying()) {
        queue.node.setPaused(true)

        return {
            code: 200,
            message: [
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
            ]
        };
    }
    else {
        return {
            code: 500,
            message: [
                new EmbedBuilder()
                    .setColor(client.get_color())
                    .addFields([
                        {
                            name: `I can't pause the queue`,
                            value: `Reason : I'm not playing anything now`
                        }
                    ])
            ]
        };
    }
}