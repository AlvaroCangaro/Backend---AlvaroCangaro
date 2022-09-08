const { dbConnectionMySQL, dbConnectionSQLite } = require('../dbConfig');
const { logger } = require('../logger');

async function CreateDbTables() {
	try {
		await dbConnectionMySQL.schema.dropTableIfExists('products');

		await dbConnectionMySQL.schema.createTable('products', (table) => {
			table.increments('id').primary();
			table.string('title', 100).notNullable();
			table.integer('price').notNullable();
			table.string('thumbnail', 255).notNullable();
		});

		dbConnectionMySQL.destroy();

		await dbConnectionSQLite.schema.dropTableIfExists('messages');

		await dbConnectionSQLite.schema.createTable('messages', (table) => {
			table.increments('id').primary();
			table.string('email', 100).notNullable();
			table.string('message', 255).notNullable();
			table.string('date', 100).notNullable();
		});

		dbConnectionSQLite.destroy();
	} catch (error) {
		logger.error(error);
	}
}

CreateDbTables();
