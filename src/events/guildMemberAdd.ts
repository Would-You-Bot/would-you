import {
  GuildMember,
  GuildTextBasedChannel,
  PermissionFlagsBits,
} from "discord.js";
import "dotenv/config";
import { captureException } from "@sentry/node";
import WouldYou from "../util/wouldYou";
import { Event } from "../interfaces";
import { getQuestionsByType } from "../util/Functions/jsonImport";

const event: Event = {
  event: "guildMemberAdd",
  execute: async (client: WouldYou, member: GuildMember) => {
    // Always do simple if checks before the main code. This is a little but not so little performance boost :)
    if (member?.user?.bot) return;

    const guildDb = await client.database.getGuild(member.guild.id, false);
    if (guildDb && guildDb?.welcome) {
      const channel = (await member.guild.channels
        .fetch(guildDb.welcomeChannel)
        .catch((err: Error) => {
          captureException(err);
        })) as GuildTextBasedChannel;

      if (!channel?.id) return;

      if (
        member.guild.members.me &&
        !channel
          ?.permissionsFor(member.guild.members.me)
          ?.has([
            PermissionFlagsBits.ViewChannel,
            PermissionFlagsBits.SendMessages,
            PermissionFlagsBits.EmbedLinks,
          ])
      )
        return;

      const General = await getQuestionsByType(
        "wouldyourather",
        guildDb != null ? guildDb : null,
      );
      const WhatYouDo = await getQuestionsByType(
        "whatwouldyoudop",
        guildDb != null ? guildDb : null,
      );

      const randomMessage = Math.random() > 0.5 ? General : WhatYouDo;

      channel
        .send({
          content: `${client.translation.get(
            guildDb?.language,
            "Welcome.embed.title",
          )} ${
            guildDb.welcomePing
              ? `<@${member.user.id}>`
              : `${member.user.username}`
          }! ${randomMessage.question}`,
        })
        .catch((err: Error) => {
          captureException(err);
        });
      return;
    }
  },
};

export default event;
