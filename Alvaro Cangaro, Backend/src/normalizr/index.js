const { normalize, schema } = require('normalizr');

function normalizeMensajes(messages) {
    const author = new schema.Entity('author');

    const message = new schema.Entity(
        'message',
        { author: author },
        { idAttribute: '_id' }
    );

    const messagesSchema = new schema.Entity('messages', {
        messages: [message],
    });

    const normalizedPost = normalize(
        { id: 'messages', messages },
        messagesSchema
    );

    return normalizedPost;
}

module.exports = normalizeMensajes;
