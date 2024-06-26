class Empleado {
  constructor(nombre, apellido, telefono, correo, cargo) {
    this.id = this.generateId();
    this.nombre = nombre;
    this.apellido = apellido;
    this.telefono = telefono;
    this.correo = correo;
    this.cargo = cargo;
    this.isFavorito = false;
  }

  generateId() {
    return '_' + Math.random().toString(36).substr(2, 9);
  }

  marcarComoFavorito(status) {
    this.isFavorito = status;
  }
}

module.exports = Empleado;
