import readlineSync from 'readline-sync';
function Tarea(Titulo, Descripcion, Estado, Creacion, UltimaEdicion, Vencimiento, Dificultad) {
this.Titulo = Titulo;
this.Descripcion = Descripcion;
this.Estado = Estado;
this.Creacion = Creacion;
this.UltimaEdicion = UltimaEdicion;
this.Vencimiento = Vencimiento;
this.Dificultad = Dificultad;
}
Tarea.prototype.mostrar = function () {
  console.log(
    "Titulo: " + this.Titulo +
    " | Descripcion: " + this.Descripcion +
    " | Estado: " + this.Estado +
    " | Creacion: " + this.Creacion +
    " | Ultima Edicion: " + this.UltimaEdicion +
    " | Vencimiento: " + this.Vencimiento +
    " | Dificultad: " + this.Dificultad
  );
}
function ListaDeTareas() {
  this.tareas = [];
}
ListaDeTareas.prototype.verTareas = function () {
if (this.tareas.length === 0) {
  console.log("No hay tareas cargadas");
  return;
}
for (let i = 0; i < this.tareas.length; i++) {
  console.log("Tarea numero " + (i + 1));
  this.tareas[i].mostrar();
}
};
Tarea.prototype.editar = function () {
  const nuevoTitulo = readlineSync.question("Nuevo titulo: ");
  if (nuevoTitulo) this.Titulo = nuevoTitulo;
  const nuevaDescripcion = readlineSync.question("Nueva descripcion: ");
  if (nuevaDescripcion) this.Descripcion = nuevaDescripcion;
  const nuevoEstado = readlineSync.question("Nuevo estado: ");
  if (nuevoEstado) this.Estado = nuevoEstado;
  const nuevoVencimiento = readlineSync.question("Nueva fecha de vencimiento (Año, mes y dia): ");
  if (nuevoVencimiento) this.Vencimiento = new Date(nuevoVencimiento);
  const nuevaDificultad = readlineSync.question("Nueva dificultad: ");
  if (nuevaDificultad) this.Dificultad = Number(nuevaDificultad);
  this.UltimaEdicion = new Date();
  console.log("Tarea actualizada");
};
ListaDeTareas.prototype.buscarTarea = function () {
const tituloBuscar = readlineSync.question("Ingrese el titulo de la tarea (exacto) para buscarla: ");
  let encontrada = null;
  for (let i = 0; i < this.tareas.length; i++) {
    if (this.tareas[i].Titulo === tituloBuscar) {
      encontrada = this.tareas[i];
      break;
    }
}
if (encontrada) {
  console.log("Tarea encontrada:");
  encontrada.mostrar();
}
else {
  console.log("Tarea no encontrada");
}
};
ListaDeTareas.prototype.agregarTarea = function () {
  console.log("Agregar una nueva tarea: ");
  const titulo = readlineSync.question("Título (100): ");
  const descripcion = readlineSync.question("Descripción (500): ");
  const estado = readlineSync.question("Pendiente, en curso o terminada: ");
  const creacion = new Date(readlineSync.question("Fecha de creación (Año, mes y dia): "));
  const ultimaEdicion = new Date(readlineSync.question("Última edición (Año, mes y dia): "));
  const vencimiento = new Date(readlineSync.question("Vence el: "));
  const dificultad = Number(readlineSync.question("Dificultad (1-10): "));
  const nuevaTarea = new Tarea(titulo, descripcion, estado, creacion, ultimaEdicion, vencimiento, dificultad);
  this.tareas.push(nuevaTarea);
  console.log("Tarea guardada");
};
ListaDeTareas.prototype.editarTarea = function () {
  this.verTareas();
  const numero = Number(readlineSync.question("Numero de la tarea a editar: ")) - 1;
  if (numero >= 0 && numero < this.tareas.length) {
    console.log("Editando tarea");
    this.tareas[numero].editar();
  } else {
    console.log("Numero de tarea incorrecto");
  }
};
function menu() {
  const lista = new ListaDeTareas();
  let opcion;
  do {;
    console.log("1- Ver tareas");
    console.log("2- Buscar tarea");
    console.log("3- Agregar tarea");
    console.log("4- Editar tarea");
    console.log("5- Salir");
    opcion = Number(readlineSync.question("Elige una opcion: "));
    switch (opcion) {
      case 1:
        lista.verTareas();
        break;
      case 2:
        lista.buscarTarea();
        break;
      case 3:
        lista.agregarTarea();
        break;
      case 4:
        lista.editarTarea();
        break;
      case 5:
        console.log("Adios");
        break;
      default:
        console.log("Opcion invalida");
    }
  } while (opcion !== 5);
}
menu();