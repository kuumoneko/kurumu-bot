const { PermissionFlagsBits, CommandInteraction, SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { deafen_member } = require('../../Commands/Moderator/deafen');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('deafen')
        .setDescription('deafen a member! (only use slash command)')

        .addUserOption(option =>
            option.setName('member')
                .setDescription('Who do you want to call?')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('reason')
                .setDescription('Why you want to do to that?'))
        .setDefaultMemberPermissions(PermissionFlagsBits.MuteMembers),


    /**
     * 
     * 
     * @param {CommandInteraction} interaction
     */

    async execute(client, interaction) {
        var mb = interaction.options.getUser('member');
        var reason = interaction.options.getString('reason') ?? 'None';

        await interaction.deferReply({
            ephemeral: true,
        })

        const AuthorMember = interaction.guild.members.cache.find(member => member.id === interaction.user.id)
        const targetMember = interaction.guild.members.cache.find(member => member.id === mb.id)

        const result = await deafen_member(client, interaction, AuthorMember, targetMember, reason);

        await interaction.followUp({
            embeds: result.message,
            ephemeral: true,
        })
        return;


    },
};