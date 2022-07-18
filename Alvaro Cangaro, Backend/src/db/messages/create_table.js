const database = require('../database').sqliteConnection;

const createMessagesTable = async () => {
    try {
        await database.schema.createTable('messages', messagesTable => {
            messagesTable.increments('id').primary();
            messagesTable.string('username', 100).notNullable();
            messagesTable.string('localTs', 26).notNullable();
            messagesTable.integer('message', 400).notNullable();
        });

        console.log('Messages table created');

        database.destroy();
    } catch (err) {
        console.log(err);
        database.destroy();
    }
}

module.exports = createMessagesTable;