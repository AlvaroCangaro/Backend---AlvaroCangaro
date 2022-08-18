class Container {
	constructor(knexConfig, table) {
		this.knexConfig = knexConfig;
		this.table = table;
	}

	async save(obj) {
		try {
			await this.knexConfig(this.table).insert(obj);
		} catch (err) {
			console.error(err);
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
			console.error(error);
			return null;
		}
	}

	async getAll() {
		try {
			const products = await this.knexConfig.from(this.table).select('*');
			return products;
		} catch (err) {
			console.error(err);
			return null;
		}
	}

	async deleteById(id) {
		try {
			await this.knexConfig(this.table).where('id', '=', id).del();
		} catch (err) {
			console.error(err);
		}
	}

	async deleteAll() {
		try {
			await this.knexConfig(this.table).del();
		} catch (err) {
			console.error(err);
		}
	}
}

module.exports = Container;
