const mongoose = require('mongoose');
const { dbConnectionMongo } = require('../dbConfig.js');
const { logger } = require('../logger/index.js');

mongoose
	.connect(dbConnectionMongo)
	.then(() => logger.info('Mongodb conectado'))
	.catch((error) => logger.info('Error al conectar con mongodb: ', error));

class Chat {
	constructor(collectionName, schema) {
		this.collection = mongoose.model(
			collectionName,
			new mongoose.Schema(schema, { timestamps: true })
		);
	}

	async save(mensaje) {
		const objectModel = new this.collection(mensaje);

		try {
			const res = await objectModel.save();
			return res;
		} catch (err) {
			logger.info('Error al guardar el chat: ', err);
			return false;
		}
	}

	async getAll() {
		try {
			const messages = await this.collection.find({}, { __v: 0 });
			return messages;
		} catch (err) {
			logger.info('Error al conseguir chat: ', err);
			return false;
		}
	}
}

module.exports = Chat;
