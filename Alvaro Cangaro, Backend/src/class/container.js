class Contenedor {
    constructor() {
        this.products = require("../products.json");
    }

    save = (object) => {
        if (object.title && object.price && object.thumbnail) {
            try {
                object.id = this.products.length + 1;
                this.products.push(object);
                return object;
            } catch (err) {
                console.log(`Error en save: ${err}`);
            }
        }
    };

    update = (object, clientId) => {
        let data = this.products.findIndex(({ id }) => id == clientId);
        if (data != -1) {
            try {
                object.id = clientId;
                this.products[data] = object;

                return object;
            } catch (error) {
                console.log(`Error en update: ${err}`);
            }
        }
    };

    getById = (clientId) => {
        let data = this.products.find(({ id }) => id == clientId);
        if (data) {
            try {
                return data;
            } catch (error) {
                console.log(`Error en getById: ${error}`);
            }
        }
    };

    getAll = () => {
        try {
            return this.products;
        } catch (error) {
            console.log(`Error en getAll: ${error}`);
        }
    };

    deleteById = (clientId) => {
        try {
            let data = this.products.filter(({ id }) => id != clientId);
            return data;
        } catch (err) {
            console.log(`Error en deleteById: ${err}`);
        }

    };
}

module.exports = Contenedor;

const container = new Contenedor();

console.log(container.deleteById(8));
