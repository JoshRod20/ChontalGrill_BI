const EmpleadoService = require('../../lib/jasmine_examples/EmpleadoService');
const Empleado = require('../../lib/jasmine_examples/Empleado');

describe('EmpleadoService', function() {
  let empleadoService;
  let empleado;

  beforeEach(function() {
    empleadoService = new EmpleadoService();
    empleado = new Empleado('John', 'Doe', '1234-5678', 'john.doe@example.com', 'Mesero');
  });

  it('should be able to add an employee', async function() {
    const result = await empleadoService.agregarEmpleado(empleado);
    expect(result).toBeTruthy();
    expect(empleadoService.obtenerEmpleadoPorId(empleado.id)).toEqual(empleado);
  });

  describe('when an employee is being edited', function() {
    beforeEach(async function() {
      await empleadoService.agregarEmpleado(empleado);
      empleado.nombre = 'Jane';
      await empleadoService.actualizarEmpleado(empleado.id, empleado);
    });

    it('should be able to update employee details', function() {
      const updatedEmpleado = empleadoService.obtenerEmpleadoPorId(empleado.id);
      expect(updatedEmpleado.nombre).toEqual('Jane');
    });
  });

  it('should be able to delete an employee', async function() {
    await empleadoService.agregarEmpleado(empleado);
    const result = await empleadoService.eliminarEmpleado(empleado.id);
    expect(result).toBeTruthy();
    expect(empleadoService.obtenerEmpleadoPorId(empleado.id)).toBeUndefined();
  });

  it('should be able to search employees by name', async function() {
    await empleadoService.agregarEmpleado(empleado);
    const results = empleadoService.buscarEmpleados('John');
    expect(results.length).toBeGreaterThan(0);
    expect(results[0].nombre).toEqual('John');
  });

  // demonstrates use of spies to intercept and test method calls
  it('should call the correct method when marking an employee as favorite', function() {
    spyOn(empleado, 'marcarComoFavorito');
    
    empleadoService.agregarEmpleado(empleado);
    empleadoService.marcarEmpleadoComoFavorito(empleado.id);

    expect(empleado.marcarComoFavorito).toHaveBeenCalledWith(true);
  });

  // demonstrates use of expected exceptions
  describe('#actualizarEmpleado', function() {
    it('should throw an exception if employee does not exist', async function() {
      expect(async function() {
        await empleadoService.actualizarEmpleado('nonexistent-id', empleado);
      }).toThrowError('Employee not found');
    });
  });
});
