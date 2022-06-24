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




// //CLASE

// class Contenedor {
//   constructor() {
//   }

//   save = async (object) => {

//     try {
//       const id = products.length + 1;
//       const newProduct = { ...req.body, id };
//       products.push(newProduct);
//       res.json("Saved");
//       return object.id;
//     } catch (err) {
//       console.log(`No se ha podido guardar el objeto: ${err}`);
//     }
//   };

//   getById =  (id) => {
//     let data = JSON.parse(data);
//     // console.log(arrData, "arrData")
//     let findID = arrData.find(({ id }) => id == numberID);
//     // console.log(findID, "findID")
//     try {
//       findID == undefined
//         ? console.log(null)
//         : console.log(`Producto: ${numberID} => ${findID.title}`);
//     } catch (error) {
//       console.log(`Error en el procesamiento de búsqueda: ${error}`);
//     }

//     return findID;
//   };

//   getAll = async () => {
//     let data = JSON.parse(await fs.promises.readFile(this.filename, "utf-8"));
//     console.log(data, "data")


//     return data;
//   };

//   deleteById = async (numberID) => {

//     let data = await fs.promises.readFile(this.filename, "utf-8");
//     // console.log(data, "data")
//     let arrData = JSON.parse(data);
//     // console.log(arrData, "arrData")

//     try {
//       let findID = arrData.filter(({ id }) => id != numberID);
//       await fs.promises.writeFile(
//         this.filename,
//         JSON.stringify(findID, null, 2)
//       );
//     } catch (err) {
//       console.log(`No se ha podido borrar el objeto: ${err}`);
//     }
//   };

//   deleteAll = () => {
//     console.log("Se han eliminado todos los elementos");
//     fs.promises.writeFile(this.filename, "");
//   };
// }

// module.exports = Contenedor