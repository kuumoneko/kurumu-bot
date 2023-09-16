const { CommandInteraction, EmbedBuilder } = require('discord.js')

module.exports = { deafen_member }
/**
 * @param { CommandInteraction } interaction
 */

async function deafen_member(client, interaction, user, target, reason) {

    try {
        const AuthorMember = interaction.guild.members.cache.find(member => member.id === user.id);
        const targetMember = interaction.guild.members.cache.find(member => member.id === target.id);

        if (AuthorMember.roles.highest.position > targetMember.roles.highest.position) {
            await targetMember.edit({
                deaf: true
            });

            return {
                code: 200,
                message: [
                    new EmbedBuilder()
                        .setColor(client.get_color())
                        .addFields({
                            name: `You have deafened ${targetMember.displayName}`,
                            value: `Reason: ${reason}`,
                        })
                ],
            }
        }
        else {
            return {
                code: 404,
                message: [
                    new EmbedBuilder()
                        .setDescription(`Remove timeout a member in this server`)
                        .setColor(client.get_color())
                        .addFields({
                            name: `You can't deafen ${targetMember.displayName}`,
                            value: `Error: Missing permission`,
                        })
                ],
            }
        }
    }
    catch (e) {
        return {
            code: 500,
            message: [
                new EmbedBuilder()
                    .setColor(client.get_color())
                    .addFields({
                        name: `You can't do this action`,
                        value: `Error: ${e}`
                    })
            ]
        }
    }

}