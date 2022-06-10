// class Usuario {
//     constructor(nombre, apellido, libros, mascotas) {
//         this.nombre = nombre;
//         this.apellido = apellido;
//         this.libros = libros;
//         this.mascotas = mascotas;
//     }

//     getFullName() {
//         console.log(`Nombre completo: ${this.nombre} ${this.apellido}`);
//     }

//     addMascota(mascota) {
//         this.mascotas.push(mascota)
//         console.log(`Has agregado: ${mascota}`)
//     }

//     countMascotas() {
//         console.log(`La cantidad de mascotas que tenes es: ${this.mascotas.length}`)
//     }

//     addBook(titulo, escritor) {
//         this.libros.push({ nombre: titulo, autor: escritor })
//         console.log(`Has agregado: ${titulo} de ${escritor}`)
//     }

//     getBookNames() {
//         let titulos = []
//         this.libros.forEach(libros => {
//             titulos.push(libros.nombre)
//         });
//         console.log(`Tus libros son: ${titulos}`)
//     }

// }

// let user = new Usuario(
//     "Alvaro", "Cangaro",

//     [{
//         nombre: "Farenheit 451", autor: "Ray Bradbury"
//     }],
//     ["perro", "gato"]
// )

// user.getFullName()
// user.addMascota("hamster")
// user.countMascotas()
// user.addBook("Los juegos del hambre", "Suzanne Collins")
// user.getBookNames()

// console.log(user)



const fs = require("fs");

const express = require("express");
const app = express();
const PORT = 8080;

const server = app.listen(PORT, () => {
    console.log(
        `Servidor HTTP conectado, escuchando en el puerto ${server.address().port}`
    );
});

server.on("error", (error) => console.log(`Error en servidor: ${error}`));

class Contenedor {
    constructor(archivo) {
        this.archivo = archivo;
        fs.promises.writeFile(archivo, "[]");
    }
    save = async (object) => {
        let data = await fs.promises.readFile(this.archivo, "utf-8");
        let arrData = JSON.parse(data);

        try {
            arrData = [...arrData, object];
            object.id = arrData.length;
            await fs.promises.writeFile(
                this.archivo,
                JSON.stringify(arrData, null, 2)
            );
            return object.id;
        } catch (err) {
            console.log(`No se ha podido guardar el objeto: ${err}`);
        }
    };

    getById = async (numberID) => {
        let data = await fs.promises.readFile(this.archivo, "utf-8");
        let arrData = JSON.parse(data);
        let findID = arrData.find(({ id }) => id == numberID);
        try {
            findID == undefined
                ? console.log(null)
                : console.log(`Producto: ${numberID} => ${findID.title}`);
        } catch (error) {
            console.log(`Error en el procesamiento de búsqueda: ${error}`);
        }

        return findID;
    };

    getAll = async () => {
        let data = await fs.promises.readFile(this.archivo, "utf-8");
        let arrData = JSON.parse(data);
        console.log(arrData);
        return arrData;
    };

    deleteById = async (numberID) => {

        let data = await fs.promises.readFile(this.archivo, "utf-8");
        let arrData = JSON.parse(data);

        try {
            let findID = arrData.filter(({ id }) => id != numberID);
            await fs.promises.writeFile(
                this.archivo,
                JSON.stringify(findID, null, 2)
            );
        } catch (err) {
            console.log(`No se ha podido guardar el objeto: ${err}`);
        }
    };

    deleteAll = () => {
        console.log("Se han eliminado todos los elementos")
        fs.promises.writeFile(this.archivo, "");
    };
}

const file = new Contenedor("./products.json");


app.get("/productos", async (req, res) => {

    let data = await file.getAll()
    let productosNombre = data.map(({ title }) => title);
    res.json(`Productos: [${productosNombre}]`);
});

app.get("/productoRandom", async (req, res) => {
    let data = await file.getAll()
    let random = Math.random() * data.length;
    let random2 = Math.floor(random)
    
    res.send (`<h1>Producto: ${data[random2].title}</h1>
    <h2>Precio: $${data[random2].price}</h2>
    `)
});


const saveFunction = async () => {
    await file.save({
        title: "Celular",
        price: "150000",
        thumbnail: "foto-celular",
    });

    await file.save({
        title: "Cargador",
        price: "7500",
        thumbnail: "foto-cargador",
    });

    await file.save({
        title: "Funda",
        price: "5000",
        thumbnail: "foto-funda",
    });

    await file.save({
        title: "Auriculares",
        price: "15000",
        thumbnail: "foto-auriculares",
    });

    await file.save({
        title: "Protector",
        price: "2000",
        thumbnail: "foto-protector",
    });

    // await file.getById(1);

    // await file.getAll();

    // await file.deleteById(3);

    // await file.deleteAll(); 
};

saveFunction();

