const {
  SlashCommandBuilder,
  CommandInteraction,
  PermissionFlagsBits,
} = require("discord.js");
const {
  discordClient,
  ban_member,
  view_bans,
  chnick_member,
  chrole_member,
  deafen_member,
  kick_member,
  mute_member,
  timeout_member,
  undeafen_member,
  unmute_member,
  untimeout_member,
  move_member,
} = require("discordpath-js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("moderator")
    .setDescription("Moderate your server")
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageNicknames)
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles)
    .setDefaultMemberPermissions(PermissionFlagsBits.DeafenMembers)
    .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers)
    .setDefaultMemberPermissions(PermissionFlagsBits.MuteMembers)
    .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers)
    .addSubcommand((scm) =>
      scm
        .setName("ban")
        .setDescription("Ban a member! (only use slash command)")

        .addUserOption((member) =>
          member
            .setName("member")
            .setDescription("Who do you want to call?")
            .setRequired(true)
        )
        .addStringOption((reason) =>
          reason.setName("reason").setDescription("Why you want to do to that?")
        )
    )
    .addSubcommand((scm) =>
      scm
        .setName("bans")
        .setDescription(
          "See bans list and unban member! (only use slash command)"
        )
    )
    .addSubcommand((scm) =>
      scm
        .setName("chnick")
        .setDescription(
          "Change nickname for a member! (only use slash command)"
        )
        .addUserOption((member) =>
          member
            .setName("member")
            .setDescription("Who do you want to call?")
            .setRequired(true)
        )
        .addStringOption((nick) =>
          nick.setName("nick").setDescription("what nick you want to change?")
        )
    )
    .addSubcommand((scm) =>
      scm
        .setName("chrole")
        .setDescription("Change role for a member! (only use slash command)")
        .addUserOption((member) =>
          member
            .setName("member")
            .setDescription("Who do you want to call?")
            .setRequired(true)
        )
        .addRoleOption((role) =>
          role.setName("role").setDescription("What role you want to change?")
        )
    )
    .addSubcommand((scm) =>
      scm
        .setName("deafen")
        .setDescription("deafen a member! (only use slash command)")

        .addUserOption((option) =>
          option
            .setName("member")
            .setDescription("Who do you want to call?")
            .setRequired(true)
        )
        .addStringOption((option) =>
          option.setName("reason").setDescription("Why you want to do to that?")
        )
    )
    .addSubcommand((scm) =>
      scm
        .setName("kick")
        .setDescription("Kick a member! (only use slash command)")
        .addUserOption((member) =>
          member
            .setName("member")
            .setDescription("Who do you want to call?")
            .setRequired(true)
        )
        .addStringOption((reason) =>
          reason.setName("reason").setDescription("Why you want to do to that?")
        )
    )
    .addSubcommand((scm) =>
      scm
        .setName("mute")
        .setDescription("mute a member! (only use slash command)")

        .addUserOption((option) =>
          option
            .setName("member")
            .setDescription("Who do you want to call?")
            .setRequired(true)
        )
        .addStringOption((option) =>
          option.setName("reason").setDescription("Why you want to do to that?")
        )
    )
    .addSubcommand((scm) =>
      scm
        .setName("timeout")
        .setDescription("Timeout a member! (only use slash command)")

        .addUserOption((option) =>
          option
            .setName("member")
            .setDescription("Who do you want to call?")
            .setRequired(true)
        )

        .addIntegerOption((option) =>
          option
            .setName("time")
            .setRequired(true)
            .setDescription("How long you want to timeout?")
        )
        .addStringOption((option) =>
          option
            .setName("value")
            .setDescription("Time Unit")
            .setRequired(true)
            .addChoices(
              { name: "Seconds", value: "Seconds" },
              { name: "Minutes", value: "Minutes" },
              { name: "Hours", value: "Hours" },
              { name: "Days", value: "Days" },
              { name: "Weeks", value: "Weeks" }
            )
        )

        .addStringOption((option) =>
          option.setName("reason").setDescription("Why you want to do to that?")
        )
    )
    .addSubcommand((scm) =>
      scm
        .setName("undeafen")
        .setDescription("undeafen a member! (only use slash command)")

        .addUserOption((option) =>
          option
            .setName("member")
            .setDescription("Who do you want to call?")
            .setRequired(true)
        )
        .addStringOption((option) =>
          option.setName("reason").setDescription("Why you want to do to that?")
        )
    )
    .addSubcommand((scm) =>
      scm
        .setName("unmute")
        .setDescription("unmute a member! (only use slash command)")

        .addUserOption((option) =>
          option
            .setName("member")
            .setDescription("Who do you want to call?")
            .setRequired(true)
        )
        .addStringOption((option) =>
          option.setName("reason").setDescription("Why you want to do to that?")
        )
    )
    .addSubcommand((scm) =>
      scm
        .setName("untimeout")
        .setDescription("Untimeout a  member! (only use slash command)")
        .addUserOption((option) =>
          option
            .setName("member")
            .setDescription("Who do you want to call?")
            .setRequired(true)
        )
        .addStringOption((reason) =>
          reason.setName("reason").setDescription("Why do you do that?")
        )
    )
    .addSubcommand((scm) =>
      scm
        .setName("move")
        .setDescription(
          "Move member to another voice channel! (only use slash command)"
        )
        .addUserOption((option) =>
          option
            .setName("member")
            .setDescription("Who do you want to call?")
            .setRequired(true)
        )
        .addStringOption((channel) =>
          channel
            .setName("channel")
            .setDescription("What voice chanel you want to move to")
        )
        .addStringOption((reason) =>
          reason.setName("reason").setDescription("Why do you do that?")
        )
    ),

  /**
   *
   * @param {discordClient} client
   * @param {CommandInteraction} interaction
   */
  async execute(client, interaction) {
    await interaction.deferReply({
      ephemeral: true,
    });

    const scm = interaction.options.getSubcommand();

    var result = "";

    if (scm === "ban") {
      const mb = interaction.options.getUser("member");
      const reason = interaction.options.getString("reason");

      const AuthorMember = interaction.guild.members.cache.find(
        (member) => member.id === interaction.user.id
      );
      const targetMember = interaction.guild.members.cache.find(
        (member) => member.id === mb.id
      );

      result = await ban_member(
        client,
        interaction,
        AuthorMember,
        targetMember,
        reason
      );
    } else if (scm === "bans") {
      await view_bans(client, interaction);
    } else if (scm === "chnick") {
      const mb = interaction.options.getUser("member");
      const nick = interaction.options.getString("nick") ?? "";

      var targetMember = interaction.guild.members.cache.find(
        (member) => member.id === mb.id
      );
      var AuthorMember = interaction.guild.members.cache.find(
        (member) => member.id === interaction.user.id
      );

      result = await chnick_member(
        client,
        interaction,
        AuthorMember,
        targetMember,
        nick
      );
    } else if (scm === "chrole") {
      const mb = interaction.options.getUser("member");
      const rl = interaction.options.getRole("role");

      var targetMember = interaction.guild.members.cache.find(
        (member) => member.id === mb.id
      );
      var AuthorMember = interaction.guild.members.cache.find(
        (member) => member.id === interaction.user.id
      );
      var rolee = interaction.guild.roles.cache.find(
        (role) => role.name === rl.name
      );

      result = await chrole_member(
        client,
        interaction,
        AuthorMember,
        targetMember,
        rolee
      );
    } else if (scm === "deafen") {
      var mb = interaction.options.getUser("member");
      var reason = interaction.options.getString("reason") ?? "None";

      const AuthorMember = interaction.guild.members.cache.find(
        (member) => member.id === interaction.user.id
      );
      const targetMember = interaction.guild.members.cache.find(
        (member) => member.id === mb.id
      );

      result = await deafen_member(
        client,
        interaction,
        AuthorMember,
        targetMember,
        reason
      );
    } else if (scm === "kick") {
      const mb = interaction.options.getUser("member");
      const reason = interaction.options.getString("reason") ?? "None";

      var targetMember = interaction.guild.members.cache.find(
        (member) => member.id === mb.id
      );
      var AuthorMember = interaction.guild.members.cache.find(
        (member) => member.id === interaction.user.id
      );

      result = await kick_member(
        client,
        interaction,
        AuthorMember,
        targetMember,
        reason
      );
    } else if (scm === "mute") {
      var mb = interaction.options.getUser("member");
      var reason = interaction.options.getString("reason") ?? "None";

      const AuthorMember = interaction.guild.members.cache.find(
        (member) => member.id === interaction.user.id
      );
      const targetMember = interaction.guild.members.cache.find(
        (member) => member.id === mb.id
      );

      result = await mute_member(
        client,
        interaction,
        AuthorMember,
        targetMember,
        reason
      );
    } else if (scm === "timeout") {
      var mb = interaction.options.getUser("member");
      var time = interaction.options.getInteger("time");
      var value = interaction.options.getString("value");
      var reason = interaction.options.getString("reason") ?? "None";

      const AuthorMember = interaction.guild.members.cache.find(
        (member) => member.id === interaction.user.id
      );
      const targetMember = interaction.guild.members.cache.find(
        (member) => member.id === mb.id
      );

      result = await timeout_member(
        client,
        interaction,
        AuthorMember,
        targetMember,
        time,
        value,
        reason
      );
    } else if (scm === "undeafen") {
      var mb = interaction.options.getUser("member");
      var reason = interaction.options.getString("reason") ?? "None";

      const AuthorMember = interaction.guild.members.cache.find(
        (member) => member.id === interaction.user.id
      );
      const targetMember = interaction.guild.members.cache.find(
        (member) => member.id === mb.id
      );

      result = await undeafen_member(
        client,
        interaction,
        AuthorMember,
        targetMember,
        reason
      );
    } else if (scm === "unmute") {
      var mb = interaction.options.getUser("member");
      var reason = interaction.options.getString("reason") ?? "None";

      const AuthorMember = interaction.guild.members.cache.find(
        (member) => member.id === interaction.user.id
      );
      const targetMember = interaction.guild.members.cache.find(
        (member) => member.id === mb.id
      );

      result = await unmute_member(
        client,
        interaction,
        AuthorMember,
        targetMember,
        reason
      );
    } else if (scm === "untimeout") {
      const mb = interaction.options.getUser("member");
      const reason = interaction.options.getString("reason") ?? "None";

      const AuthorMember = interaction.guild.members.cache.find(
        (member) => member.id === interaction.user.id
      );
      const targetMember = interaction.guild.members.cache.find(
        (member) => member.id === mb.id
      );

      result = await untimeout_member(
        client,
        interaction,
        AuthorMember,
        targetMember,
        reason
      );
    } else if (scm === "move") {
      const mb = interaction.options.getUser("member");
      const channel = interaction.options.getString("channel") ?? "None";
      const reason = interaction.options.getString("reason") ?? "None";

      const AuthorMember = interaction.guild.members.cache.find(
        (member) => member.id === interaction.user.id
      );
      const targetMember = interaction.guild.members.cache.find(
        (member) => member.id === mb.id
      );

      result = await move_member(
        client,
        interaction,
        AuthorMember,
        targetMember,
        channel,
        reason
      );
    }

    if (result !== "") {
      await interaction.followUp({
        embeds: result,
        ephemeral: true,
      });
    }
  },
};
