const { SlashCommandBuilder, CommandInteraction, EmbedBuilder } = require('discord.js');
var { freemem, totalmem, cpus } = require('os');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('status')
        .setDescription('Get status of Kurumu client'),

    /**
     * 
     * @param {CommandInteraction} interaction 
     */

    async execute(client, interaction) {

        await interaction.deferReply({
            ephemeral: true
        })

        const color = client.get_color()

        const guilds = client.client.guilds.cache

        var members = 0;

        guilds.forEach(guild => {
            members += guild.memberCount
        });

        await interaction.followUp({
            embeds: [
                new EmbedBuilder()
                    .setTitle(`Kurumu Client`)
                    .setColor(color)
                    .addFields([
                        {
                            name: `Total servers:`,
                            value: `${client.client.guilds.cache.size}`
                        },
                        {
                            name: `Total members:`,
                            value: `${members}`,
                        }
                    ]),
                new EmbedBuilder()
                    .setTitle(`This Server`)
                    .setColor(color)
                    .addFields([
                        {
                            name: `Name:`,
                            value: `${interaction.guild.name}`
                        },
                        {
                            name: `Total members:`,
                            value: `${interaction.guild.memberCount}`
                        },
                        {
                            name: `Total channels:`,
                            value: `${interaction.guild.channels.cache.size}`
                        },
                    ]),
                new EmbedBuilder()
                    .setTitle(`This User`)
                    .setColor(color)
                    .addFields([
                        {
                            name: `Name:`,
                            value: `${interaction.user.displayName}`
                        },
                        {
                            name: `Highest role:`,
                            value: `${interaction.member.roles.highest.name}`
                        },
                    ]),
                new EmbedBuilder()
                    .setTitle(`Client Status`)
                    .setColor(color)
                    .addFields([
                        {
                            name: `Version:`,
                            value: `${client.version}`
                        },
                        {
                            name: `CLient Latency:`,
                            value: `${Date.now() - interaction.createdTimestamp}ms`
                        },
                        {
                            name: `API Latency:`,
                            value: `${Math.round(client.client.ws.ping)}ms`
                        }
                    ]),
            ],
            ephemeral: true,
        })



    }
};
