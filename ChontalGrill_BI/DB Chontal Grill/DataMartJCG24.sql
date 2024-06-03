Create Database ChontalGrill_DM;
Use ChontalGrill_DM;
DROP DATABASE ChontalGrill_DM;

-- Tabla Hechos
Create Table H_Orden (
ID_HOrden Int Primary Key,
ID_Orden Int, 
ID_Tiempo Int,
ID_Tipo_Orden Int,
ID_Metodo_Pago Int,
ID_Menu Int,
ID_Cliente Int,
ID_Empleado Int,
Descripcion VARCHAR (100),
Cantidad Int,
Monto Decimal (12,2),
Precio Decimal (6,2),
Estado Varchar(50)
);

-- Tablas de dimensiones
Create Table DIM_Menu (
ID_Menu Int Primary Key,
Nombre Varchar(100),
Categoria Varchar(50),
Precio Decimal (6,2)
);

Create Table DIM_Empleado (
ID_Empleado Int Primary Key,
Nombres Varchar(100),
Cargo Varchar(32)
);


Create Table DIM_Cliente (
ID_Cliente Int Primary Key,
Nombres Varchar(100)
);

Create Table DIM_TipoOrden (
ID_Tipo_Orden Int Primary Key,
Tipo Varchar(50)
);

Create Table DIM_Tiempo (
ID_Tiempo Int Primary Key,
Fecha Date, 
Dia INT, 
Mes INT, 
Anio int
);

Create Table DIM_MetodoPago (
ID_Metodo_Pago Int Primary Key,
Descripcion Varchar(100)
);

-- Relaciones de las tablas
Alter Table H_Orden Add Constraint FK_DIM_Menu_H_Orden Foreign Key (ID_Menu) References DIM_Menu(ID_Menu);
Alter Table H_Orden Add Constraint FK_DIM_Empleado_H_Orden Foreign Key (ID_Empleado) References DIM_Empleado(ID_Empleado);
Alter Table H_Orden Add Constraint FK_DIM_Cliente_H_Orden Foreign Key (ID_Cliente) References DIM_Cliente(ID_Cliente);
Alter Table H_Orden Add Constraint FK_DIM_TipoOrden_H_Orden Foreign Key (ID_Tipo_Orden) References DIM_TipoOrden(ID_Tipo_Orden);
Alter Table H_Orden Add Constraint FK_DIM_Tiempo_H_Orden Foreign Key (ID_Tiempo) References DIM_Tiempo(ID_Tiempo);
ALTER TABLE H_Orden ADD CONSTRAINT FK_DIM_MetodoPago_H_Orden FOREIGN KEY (ID_Metodo_Pago) REFERENCES DIM_MetodoPago(ID_Metodo_Pago);



