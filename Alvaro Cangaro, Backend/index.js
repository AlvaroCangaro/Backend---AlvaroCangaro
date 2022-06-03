class Usuario {
    constructor(nombre, apellido, libros, mascotas) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = libros;
        this.mascotas = mascotas;
    }

    getFullName() {
        console.log (`Nombre completo: ${this.nombre} ${this.apellido}`);
    }

    addMascota(mascota) {
        this.mascotas.push(mascota)
        console.log (`Has agregado: ${mascota}`)
    }
 
    countMascotas() {
        console.log (`La cantidad de mascotas que tenes es: ${this.mascotas.length}`)
    }

    addBook(titulo, escritor) {
        this.libros.push({nombre:titulo , autor:escritor})
        console.log (`Has agregado: ${titulo} de ${escritor}`)
    }

    getBookNames () {
        let titulos = []
        this.libros.forEach(libros => {
            titulos.push (libros.nombre)
        });
        console.log(`Tus libros son: ${titulos}`)
    }

}    

let user = new Usuario (
    "Alvaro", "Cangaro",

    [{
        nombre: "Farenheit 451" , autor: "Ray Bradbury"
    }],
    ["perro", "gato"]
) 

user.getFullName()
user.addMascota("hamster")
user.countMascotas()
user.addBook("Los juegos del hambre" , "Suzanne Collins")
user.getBookNames()

console.log(user)

