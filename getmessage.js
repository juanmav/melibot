/**
 * @param notification { topic , nickname, resource };
 * */
module.exports = function getMessage(notification){
    let generators = {
        messages: (notification) => {
            return (parseInt(notification.user_id) != parseInt(notification.resource.from.user_id))
            && notification.resource.date_read == null ?
                `Mensaje para: ${notification.nickname}: ${notification.resource.text.plain}`
                :
                null;
        },
        questions: (notification) => {
            return notification.resource.status === 'UNANSWERED' ?
                `Pregunta para ${notification.nickname}: ${notification.resource.text}`
                :
                null;
        },
        orders: (notification) => {
            return notification.resource.date_closed === notification.resource.last_updated ? `Venta en: ${notification.nickname}!`
                :
                null;
        }
    };

    return generators[notification.topic](notification);
};