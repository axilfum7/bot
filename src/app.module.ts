import { Module } from '@nestjs/common';
import { TelegrafModule } from 'nestjs-telegraf';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { BookBot } from './book.bot';

@Module({
  imports: [
    TelegrafModule.forRoot({
      token: '7733523998:AAG4G1dhJoHcvTY7fT4Dae1o7doWWTstrIc',
    }),
  ],
  controllers: [BookController],
  providers: [BookService, BookBot],
})
export class AppModule {}