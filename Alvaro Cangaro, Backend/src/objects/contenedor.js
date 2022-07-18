const fs = require('fs');

class Producto {
    constructor(title, price, thumbnail) {
        this.title = title;
        this.price = price;
        this.thumbnail = thumbnail;
        this.id = 0;
    }
}

class Contenedor {
    constructor(database, table) {
        this.database = database;
        this.table = table;
    }

    async save(object) {
        try {
            await this.database(this.table).insert(object);
            const id = await this.database(this.table).select('id').max('id');

            return id;
        } catch (err) {
            // Si la tabla no existe, la crea
            if ((err.code == 'ER_NO_SUCH_TABLE') || (err.code == 'SQLITE_ERROR' && err.errno == '1')) {
                const createTable = require(`../db/${this.table}/create_table`);
                await createTable();
                await this.database(this.table).insert(object);
                const id = await this.database(this.table).select('id').max('id');

                return id;
            } else {
                console.log('Error en método save: ', err);
            }
        }
    }

    async getById(number) {
        try {
            const object = await this.database(this.table).select('*').where('id', '=', number);
            return object ? object : null;
        } catch (err) {
            if ((err.code == 'ER_NO_SUCH_TABLE') || (err.code == 'SQLITE_ERROR' && err.errno == '1')) {
                const createTable = require(`../db/${this.table}/create_table`);
                return null;
            } else {
                console.log('Error en método getById: ', err);
            }
        }
    }

    async getAll() {
        try {
            const objects = await this.database.from(this.table).select('*');
            return objects;
        } catch (err) {
            if ((err.code == 'ER_NO_SUCH_TABLE') || (err.code == 'SQLITE_ERROR' && err.errno == '1')) {
                const createTable = require(`../db/${this.table}/create_table`);
                await createTable();
                return [];
            } else {
                console.log('Error en método getAll: ', err);
            }
        }
    }

    async deleteById(number) {
        try {
            await this.database.from(this.table).where('id', '=', number).del();
        } catch (err) {
            console.log('Error en método deleteById: ', err);
        }
    }

    async deleteAll() {
        try {
            await this.database.from(this.table).del();
        } catch (err) {
            console.log('Error en método deleteAll: ', err);
        }
    }

    //     async updateById(id, object) {
    //         try {
    //             let products = JSON.parse(await fs.promises.readFile(this.file, 'utf-8'));
    //             object.id = id;

    //             const index = products.findIndex((product) => {
    //                 return product.id === object.id;
    //             })

    //             if (index !== -1) {
    //                 products[index] = object;
    //                 await fs.promises.writeFile(this.file, JSON.stringify(products, null, '\t'));
    //                 return object;
    //             } else {
    //                 return { error: 'Producto no encontrado'}
    //             }
    //         } catch (err) {
    //             console.log('Error en método updateById: ', err);
    //         }
    //     }
}

module.exports = {
    Contenedor: Contenedor,
    Producto: Producto,
};