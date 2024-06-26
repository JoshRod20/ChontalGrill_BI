

class EmpleadoService {
  constructor() {
    this.empleados = [];
  }

  async agregarEmpleado(empleado) {
    this.empleados.push(empleado);
    return true;
  }

  async actualizarEmpleado(id, datosActualizados) {
    const index = this.empleados.findIndex(emp => emp.id === id);
    if (index === -1) throw new Error('Employee not found');

    this.empleados[index] = { ...this.empleados[index], ...datosActualizados };
    return true;
  }

  async eliminarEmpleado(id) {
    const index = this.empleados.findIndex(emp => emp.id === id);
    if (index === -1) return false;

    this.empleados.splice(index, 1);
    return true;
  }

  obtenerEmpleadoPorId(id) {
    return this.empleados.find(emp => emp.id === id);
  }

  buscarEmpleados(criterio) {
    return this.empleados.filter(emp =>
      emp.nombre.toLowerCase().includes(criterio.toLowerCase()) ||
      emp.apellido.toLowerCase().includes(criterio.toLowerCase()) ||
      emp.correo.toLowerCase().includes(criterio.toLowerCase()) ||
      emp.cargo.toLowerCase().includes(criterio.toLowerCase())
    );
  }

  marcarEmpleadoComoFavorito(id) {
    const empleado = this.obtenerEmpleadoPorId(id);
    if (!empleado) throw new Error('Employee not found');

    empleado.marcarComoFavorito(true);
  }
}

module.exports = EmpleadoService;
