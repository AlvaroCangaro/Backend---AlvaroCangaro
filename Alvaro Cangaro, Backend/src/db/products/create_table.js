const database = require('../database').mySQLConnection;

const createProductsTable = async () => {  
    try {
        await database.schema.createTable('products', productsTable => {
            productsTable.increments('id').primary();
            productsTable.string('title', 100).notNullable();
            productsTable.integer('price').notNullable();
            productsTable.string('thumbnail', 400).notNullable();
        });

        console.log('Products table created');

        database.destroy();
    } catch (err) {
        console.log(err);
        database.destroy();
    }
}

module.exports = createProductsTable;