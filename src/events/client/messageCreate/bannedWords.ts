import { Client, EmbedBuilder, Message } from "discord.js";
import Console from "@tdanks2000/fancyconsolelog";
import { ClientClass } from "src/structure/Client";
import { bannedWords } from "../../../utils";

// const console = new Console();

module.exports = async (message: Message, client: ClientClass) => {
  if (!bannedWords?.length) return;

  const content = message.content.toLowerCase(); // Convert to lowercase for case-insensitive matching

  let bannedWord = "";

  const containsBannedWord = bannedWords.some((word) => {
    const lowerCaseWord = word.toLowerCase(); // Convert to lowercase for case-insensitive matching
    if (content.includes(lowerCaseWord)) bannedWord = lowerCaseWord;

    return content.includes(lowerCaseWord);
  });

  if (containsBannedWord) {
    try {
      await message.delete();
      await message.member?.timeout(1 * 60 * 1000, `timed out for using: ${bannedWord}`);

      const embed = new EmbedBuilder()
        .setTitle("Need Someone to Talk To?")
        .setDescription(
          `Remember, it's okay to not be okay. If you or someone you know is struggling with thoughts of suicide, please seek help and support.
  
  If you're in crisis, you're not alone. Reach out to someone who cares about you or connect with a professional. Remember that there's hope and help available.
  
  For immediate assistance, you can contact a crisis hotline in your country. Check out this list of suicide crisis lines on Wikipedia: [Suicide Crisis Lines](https://en.wikipedia.org/wiki/List_of_suicide_crisis_lines)
  
  You matter, and there are people who want to listen and support you.`
        )
        .setColor(client.config.color)
        .setTimestamp();

      await message.author.send({
        embeds: [embed],
      });
    } catch (error) {}
  }
};
