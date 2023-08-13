import canvafy from "canvafy";
import { Client, EmbedBuilder, Message } from "discord.js";
import Console from "@tdanks2000/fancyconsolelog";
import { ClientClass } from "src/structure/Client";
import { calculateValue, getColorFromStatus, getRandomXp } from "../../../utils";
const cooldowns = new Set();

const manageCooldown = (id: string, timeout: number) => {
  cooldowns.add(id);
  setTimeout(() => {
    cooldowns.delete(id);
  }, timeout);
};

// const console = new Console();

module.exports = async (message: Message, client: ClientClass) => {
  if (!message.inGuild() || message.author.bot) return;

  const db = client.db.level;

  const xpToGive = getRandomXp(5, 15);

  const query = {
    user_id: message.author.id,
    guild_id: message.guild.id,
  };

  try {
    const level = await db.findFirst({
      where: query,
    });

    if (level) {
      level.xp += xpToGive;
      if (level.xp >= calculateValue(level.level)) {
        console.log("level up");
        level.xp = 0;
        level.level += 1;

        const levelUpCard = await new canvafy.LevelUp()
          .setAvatar(
            message.author.displayAvatarURL({
              size: 256,
              forceStatic: true,
              extension: "png",
            })
          )
          .setBackground("color", client.config.color)
          .setUsername(message.author.username)
          .setBorder("#1f1f1f")
          .setAvatarBorder(getColorFromStatus(message.member?.presence?.status!))
          .setLevels(level.level - 1, level.level)
          .build();

        message.channel.send({
          files: [
            {
              attachment: levelUpCard,
              name: `levelup-${message.member!.id}.png`,
            },
          ],
        });
      }
      await db
        .updateMany({
          where: query,
          data: level,
        })
        .catch((err) => {
          console.error(err);
          return;
        });

      manageCooldown(message.author.id, 60000);
    } else {
      //create new level model
      await db.create({
        data: {
          user_id: message.author.id,
          guild_id: message.guild.id,
          xp: xpToGive,
        },
      });
      manageCooldown(message.author.id, 60000);
    }
  } catch (error) {}
};
