import { Context } from 'telegraf';
import { Update, Message } from 'telegraf/typings/core/types/typegram';

export interface MyContext extends Context<Update.MessageUpdate> {
  message: Update.New & Update.NonChannel & Message.TextMessage;
}