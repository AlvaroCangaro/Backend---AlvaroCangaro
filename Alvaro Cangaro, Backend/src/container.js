const { logger } = require('./logger');

class Container {
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

	async getbyId(id) {
		try {
			const product = await this.knexConfig
				.from(this.table)
				.select('*')
				.where('id', '=', id);
			return product;
		} catch (error) {
			logger.error(error);
			return null;
		}
	}

	async getAll() {
		try {
			const products = await this.knexConfig.from(this.table).select('*');
			return products;
		} catch (err) {
			logger.error(err);
			return null;
		}
	}

	async deleteById(id) {
		try {
			await this.knexConfig(this.table).where('id', '=', id).del();
		} catch (err) {
			logger.error(err);
		}
	}

	async deleteAll() {
		try {
			await this.knexConfig(this.table).del();
		} catch (err) {
			logger.error(err);
		}
	}
}

module.exports = Container;
