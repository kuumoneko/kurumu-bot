const { CommandInteraction, EmbedBuilder } = require('discord.js');
const {  useQueue } = require('discord-player')

module.exports = { resuming }

/**
 * 
 * 
 * @param {CommandInteraction} interaction 
 */

async function resuming(client, interaction) {

    const queue = useQueue(interaction.guildId);

    if (queue.node.isPaused()) {
        queue.node.setPaused(false)

        return {
            code: 200,
            message: [
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
            ]
        }
    }
    else {
        return {
            code: 500,
            message: [
                new EmbedBuilder()
                    .setColor(client.get_color())
                    .addFields([
                        {
                            name: `I can't resume the queue`,
                            value: `Reason : I'm not pausing now`
                        }
                    ])
            ]
        }
    }


}