import { GuildMember, PresenceStatus } from "discord.js";

export const canModifyQueue = (member: GuildMember) =>
  member.voice.channelId === member.guild.members.me!.voice.channelId;

export const getColorFromStatus = (status: PresenceStatus) => {
  const statutes = {
    online: "#3ba55c",
    idle: "#faa61a",
    dnd: "#ed4245",
    stream: "#593695",
    offline: "#747f8e",
    invisible: "#747f8e",
  };

  return statutes[status];
};
