import { Module } from '@nestjs/common';
import { TelegrafModule } from 'nestjs-telegraf';
import { BotUpdate } from './bot.update';
import { BooksModule } from '../book/book.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    TelegrafModule.forRoot({
      token: '7990913843:AAFFIkSvGlb7aWwrY-W_ygi2gwufH89CaTo',
    }),
    BooksModule,
    UsersModule,
  ],
  providers: [BotUpdate],
})
export class BotModule {}