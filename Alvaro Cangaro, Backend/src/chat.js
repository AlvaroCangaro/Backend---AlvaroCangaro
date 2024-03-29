const logger = require('./logger');

class Chat {
	constructor(knexConfig, table) {
		this.knexConfig = knexConfig;
		this.table = table;
	}

	async save(obj) {
		try {
			await this.knexConfig(this.table).insert(obj);
		} catch (err) {
			logger.error(err);
			return null;
		}
	}

	async getAll() {
		try {
			const messages = await this.knexConfig.from(this.table).select('*');
			return messages;
		} catch (err) {
			logger.error(err);
			return null;
		}
	}
}

module.exports = Chat;
