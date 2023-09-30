const { SlashCommandBuilder, CommandInteraction } = require('discord.js');
const { discordClient } = require('../../../index');
const { helping } = require('../../../index');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('test')
        .setDescription('test for user from kurumu!')
        .addSubcommand(sc =>
            sc
                .setName('ping')
                .setDescription('pong')
                .addBooleanOption(opt =>
                    opt
                        .setName('nani')
                        .setDescription('moi'))
        )
        .addSubcommand(sc =>
            sc
                .setName('hello')
                .setDescription('say hello')
        ),

    /**
     * 
     * @param {discordClient} client 
     * @param {CommandInteraction} interaction
     */

    async execute(client, interaction) {
        await interaction.deferReply({
            ephemeral: true
        });

        if (interaction.options._subcommand == 'ping') {
            console.log('ping')
            console.log(interaction.options.getBoolean('nani'))
        }

        // const command_help = interaction.options.getString('command_helped') ?? 'None';

        // const result = await helping(client, interaction, command_help);

        // await interaction.followUp({
        //     embeds: result,
        //     ephemeral: true
        // })

    },
};