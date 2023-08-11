import { EmbedBuilder, Interaction, PermissionsBitField } from "discord.js";
import Console from "@tdanks2000/fancyconsolelog";
import { ClientClass } from "../../../structure/Client";

const console = new Console();

module.exports = async (interaction: Interaction, client: ClientClass) => {
  if (!interaction.isButton()) return;

  const button: any = client.buttons.get(interaction.customId);
  if (!button) return;

  try {
    if (button.permissions) {
      if (
        !interaction.memberPermissions!.has(PermissionsBitField.resolve(button.permissions || []))
      ) {
        const perms = new EmbedBuilder()
          .setDescription(
            `🚫 ${interaction.user}, You don't have \`${button.permissions}\` permissions to interact this button!`
          )
          .setColor("Red");
        return interaction.reply({ embeds: [perms], ephemeral: true });
      }
    }
    await button.run(interaction, client);
  } catch (error) {
    console.log((error as Error).message);
  }
};
