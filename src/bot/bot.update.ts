import { Update, Ctx, On, Start } from 'nestjs-telegraf';
import { MyContext } from './bot.context'; 
import { BooksService } from '../book/book.service';
import { UsersService } from '../users/users.service';

@Update()
export class BotUpdate {
  constructor(
    private booksService: BooksService,
    private usersService: UsersService
  ) {}

  @Start()
  async onStart(@Ctx() ctx: MyContext) {
    const userId = ctx.from?.id;
    if (!userId) return ctx.reply('Foydalanuvchi aniqlanmadi.');

    const chatMember = await ctx.telegram.getChatMember('@zdgfhhj', userId);
    if (chatMember.status === 'left') {
      return ctx.reply('Iltimos, avval kanalga obuna boling: @zdgfhhj');
    }

    await this.usersService.saveUser(userId);
    return ctx.reply('Xush kelibsiz! Kitoblarni korishiz mumkin.');
  }

  @On('text')
  async onText(@Ctx() ctx: MyContext) {
    const text = ctx.message?.text;
    const userId = ctx.from?.id;
    if (!text || !userId) return;

    if (text === '/books') {
      const books = await this.booksService.findAll();
      if (!books.length) return ctx.reply('bu kitoblar yoq.');
      return ctx.reply(
        books.map((b) => `${b.id}. ${b.title} - ${b.author}`).join('\n'),
      );
    }

    if (text.startsWith('/delete')) {
      const id = Number(text.split(' ')[1]);
      await this.booksService.remove(id);
      return ctx.reply(`kitob ochirildi: ${id}`);
    }
  }
}