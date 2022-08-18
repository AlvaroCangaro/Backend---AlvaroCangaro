const knex = require('knex');
const path = require('path');

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
const dbConnectionMongo = 'mongodb+srv://alvarocangaro:alvaro70@cluster0.wgmmvuz.mongodb.net/?retryWrites=true&w=majority';

module.exports = { dbConnectionMySQL, dbConnectionSQLite, dbConnectionMongo };
