const Telegraf = require('telegraf');

module.exports = function(database) {
    console.log('Corriendo Telegram Bot :)');
    const bot = new Telegraf(process.env.TELEGRAM_API_TOKEN);
    let db = database;

    bot.start((ctx) => {
        console.log('Connections entrante');
        let connection = {userId: ctx.from.id, chatId: ctx.chat.id};
        console.log(connection);
        ctx.reply('Ya estas subcripto a las notificiaciones!');
        db
            .get('telegrams')
            .push(connection)
            .write();
    });

    bot.help((ctx) => ctx.reply('Work in progress'));
    bot.launch();

    return function (message) {
        console.log('Enviando Notificacion a Telegram');
        let connected = db
            .get('telegrams')
            .value();
        connected.forEach(c => {
            console.log('Enviando a: ' + c.userId);
            bot.telegram.sendMessage(c.chatId, message)
        })
    };
};
