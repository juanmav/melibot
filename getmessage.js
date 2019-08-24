/**
 * @param notification { topic , nickname, resource };
 * */
module.exports = function (db) {
    return function getMessage(notification) {
        let generators = {
            messages: (notification) => {
                return (parseInt(notification.user_id) != parseInt(notification.resource.from.user_id))
                && notification.resource.date_read == null ?
                    `Mensaje para ${notification.nickname} de ${notification.resource.from.name}: ${notification.resource.text.plain}`
                    :
                    null;
            },
            questions: (notification) => {
                return notification.resource.status === 'UNANSWERED' ?
                    `Pregunta para ${notification.nickname} de ${notification.from.nickname}: ${notification.resource.text}`
                    :
                    null;
            },
            orders: (notification) => {

                let orderExists = db.get('orders')
                    .find({id: notification.resource.id})
                    .value();
                if (orderExists) {
                    return null;
                } else {
                    db.get('orders')
                        .push({id: notification.resource.id})
                        .write();
                    return `Venta en: ${notification.nickname}! ( Producto: ${notification.resource.order_items[0].item.title})`;
                }

            }
        };

        return generators[notification.topic](notification);
    }
};