import { SlashCommandObject } from "../../types";
import { ApplicationCommandOptionType, AttachmentBuilder } from "discord.js";
import canvafy from "canvafy";
import { calculateValue } from "../../utils";

const command: SlashCommandObject = {
  data: {
    name: "level",
    description: "shows your/someone's level",
    options: [
      {
        name: "target_user",
        description: "the user to show the level of",
        required: false,
        type: ApplicationCommandOptionType.Mentionable,
      },
    ],
  },
  options: {
    guildOnly: true,
  },

  run: async ({ interaction, client }) => {
    await interaction.deferReply();

    const mentioned_id = interaction.options.getMentionable("target_user")?.id;
    const target_user_id = mentioned_id ?? interaction.member.id;
    const target_user = await interaction.guild.members.fetch(target_user_id);

    const db = client.db.level;

    const fetchedLevel = await db.findFirst({
      where: {
        user_id: target_user_id,
        guild_id: interaction.guild.id,
      },
    });

    if (!fetchedLevel) {
      return interaction.editReply({
        content: "This user doesn't have a level yet",
      });
    }

    const allLevels = await db.findMany({
      where: {
        guild_id: interaction.guild.id,
      },
      select: {
        guild_id: false,
        id: false,
        level: true,
        user_id: true,
        xp: true,
      },
    });

    allLevels.sort((a, b) => {
      if (a.level === b.level) return b.xp - a.xp;
      else return b.level - a.level;
    });

    let currentRank = allLevels.findIndex((lvl) => lvl.user_id === target_user_id) + 1;

    const user_status = target_user.presence?.status!;

    const rank = await new canvafy.Rank()
      .setAvatar(
        target_user.user.displayAvatarURL({ size: 256, forceStatic: true, extension: "png" })
      )
      .setBackground(
        "image",
        "https://th.bing.com/th/id/R.248b992f15fb255621fa51ee0ca0cecb?rik=K8hIsVFACWQ8%2fw&pid=ImgRaw&r=0"
      )
      .setBorder(client.config.color)
      .setRank(currentRank)
      .setLevel(fetchedLevel.level)
      .setCurrentXp(fetchedLevel.xp)
      .setRequiredXp(calculateValue(fetchedLevel.level))
      .setStatus(user_status === "invisible" ? "offline" : user_status)
      .setBarColor(client.config.color)
      .setUsername(target_user.user.username)
      .build();

    // const attachment = new AttachmentBuilder(rank);

    await interaction.editReply({
      files: [
        {
          attachment: rank,
          name: `rank-${target_user.user.id}.png`,
        },
      ],
    });
  },
};

module.exports = command;
