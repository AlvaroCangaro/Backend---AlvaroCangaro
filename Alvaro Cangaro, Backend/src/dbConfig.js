const knex = require('knex');
const path = require('path');
require('dotenv').config();

const configMySQL = {
	client: 'mysql',
	connection: {
		host: '127.0.0.1',
		user: 'root',
		password: '',
		database: 'coderhouse',
	},
};

const configSQLite3 = {
	client: 'sqlite3',
	connection: { filename: path.join(__dirname, './db/ecommerce.sqlite') },
	useNullAsDefault: true,
};

const dbConnectionMySQL = knex(configMySQL);
const dbConnectionSQLite = knex(configSQLite3);
const dbConnectionMongo = process.env.MONGO_URL;

module.exports = { dbConnectionMySQL, dbConnectionSQLite, dbConnectionMongo };
