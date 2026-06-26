import { Telegraf, Markup } from 'telegraf';
import dotenv from 'dotenv';
dotenv.config();

const bot = new Telegraf(process.env.BOT_TOKEN);
const WEBAPP_URL = process.env.WEBAPP_URL; // URL задеплоенного webapp

bot.start(async (ctx) => {
  await ctx.reply(
    '✝ Добро пожаловать в Православную Требу!\n\nЗдесь вы можете заказать требу, поставить свечу или сделать пожертвование в православные храмы.',
    Markup.keyboard([
      [Markup.button.webApp('🕯 Открыть Православную Требу', WEBAPP_URL)]
    ]).resize()
  );
});

bot.command('menu', async (ctx) => {
  await ctx.reply(
    'Выберите действие:',
    Markup.inlineKeyboard([
      [Markup.button.webApp('🕯 Открыть приложение', WEBAPP_URL)]
    ])
  );
});

// Обработка данных из webapp (при оплате)
bot.on('web_app_data', async (ctx) => {
  try {
    const data = JSON.parse(ctx.message.web_app_data.data);
    await ctx.reply(
      `✅ Заказ оформлен!\n\n` +
      data.items.map(i => `• ${i.name} — ${i.price} ₽`).join('\n') +
      `\n\nИтого: ${data.total} ₽`
    );
  } catch {
    await ctx.reply('Получены данные из приложения.');
  }
});

bot.launch();
console.log('✝ Бот запущен');

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
