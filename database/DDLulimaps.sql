-- ENTIDAD ADMINISTRADOR LISTO
CREATE TABLE IF NOT EXISTS Administrador (
    id_administrador INTEGER PRIMARY KEY AUTOINCREMENT,
    usuario TEXT NOT NULL,
    contrasena TEXT NOT NULL
);

-- ENTIDAD MAPA LISTO
CREATE TABLE IF NOT EXISTS Mapa (
    id_mapa INTEGER PRIMARY KEY AUTOINCREMENT,
    latitud REAL NOT NULL,
    longitud REAL NOT NULL
);

-- ENTIDAD PUNTOINTERESEXTERIOR LISTO
CREATE TABLE IF NOT EXISTS PuntoInteresExterior (
    id_puntoExterior INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    latitud REAL NOT NULL,
    longitud REAL NOT NULL,
    id_mapa INTEGER NOT NULL,
    FOREIGN KEY (id_mapa) REFERENCES Mapa(id_mapa)
);

-- ENTIDAD PARQUEADERO LISTO
CREATE TABLE IF NOT EXISTS Parqueadero (
    id_parqueadero INTEGER PRIMARY KEY AUTOINCREMENT,
    id_puntoExterior INTEGER NOT NULL,
    vehiculo TEXT NOT NULL,
    id_tipo INTEGER NOT NULL,
    FOREIGN KEY (id_tipo) REFERENCES Tipo(id_tipo)
    FOREIGN KEY (id_puntoExterior) REFERENCES PuntoInteresExterior(id_puntoExterior)
);

-- ENTIDAD ESTRUCTURA LISTO
CREATE TABLE IF NOT EXISTS Estructura (
    id_estructura INTEGER PRIMARY KEY AUTOINCREMENT,
    bloque TEXT NOT NULL,
    id_puntoExterior INTEGER NOT NULL,
    id_tipo INTEGER NOT NULL,
    FOREIGN KEY (id_puntoExterior) REFERENCES PuntoInteresExterior(id_puntoExterior),
    FOREIGN KEY (id_tipo) REFERENCES Tipo(id_tipo)
);

-- ENTIDAD TIPO LISTO
CREATE TABLE IF NOT EXISTS Tipo (
    id_tipo INTEGER PRIMARY KEY AUTOINCREMENT,
    nombreTipo TEXT NOT NULL,
);

-- ENTIDAD PISO LISTO
CREATE TABLE IF NOT EXISTS Piso (
    id_piso INTEGER PRIMARY KEY AUTOINCREMENT,
    nivel TEXT NOT NULL,
    id_estructura INTEGER NOT NULL,
    plano INTEGER NOT NULL,
    FOREIGN KEY (id_estructura) REFERENCES Estructura(id_estructura)
);

-- ENTIDAD PUNTOSINTERESINTERIOR LISTO
CREATE TABLE IF NOT EXISTS PuntoInteresInterior (
    id_puntoInterior INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    activo BOOLEAN NOT NULL,
    id_tipo INTEGER NOT NULL,
    id_piso INTEGER NOT NULL,
    FOREIGN KEY (id_tipo) REFERENCES Tipo(id_tipo)
    FOREIGN KEY (id_piso) REFERENCES Piso(id_piso)
);

-- ENTIDAD IMAGEN LISTO
CREATE TABLE IF NOT EXISTS Imagen (
    id_imagen INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    id_puntoExterior INTEGER NOT NULL,
    FOREIGN KEY (id_puntoExterior) REFERENCES PuntoInteresExterior(id_puntoExterior)
) 

-- MAPA UBICACIÓN CENTRAL DEL CAMPUS
INSERT INTO Mapa (latitud,longitud) VALUES (4.805407, -75.759847)

-- TIPOS 
INSERT INTO Tipo (nombreTipo) VALUES ('Académico'); --1
INSERT INTO Tipo (nombreTipo) VALUES ('Administrativo'); --2
INSERT INTO Tipo (nombreTipo) VALUES ('Profesores'); --3
INSERT INTO Tipo (nombreTipo) VALUES ('Particular'); --4
INSERT INTO Tipo (nombreTipo) VALUES ('Escenario Deportivo'); --5
INSERT INTO Tipo (nombreTipo) VALUES ('Biblioteca'); --6
INSERT INTO Tipo (nombreTipo) VALUES ('Salón'); --7
INSERT INTO Tipo (nombreTipo) VALUES ('Laboratorio'); --8
INSERT INTO Tipo (nombreTipo) VALUES ('Oficina'); --9
INSERT INTO Tipo (nombreTipo) VALUES ('Kiosco'); --10
INSERT INTO Tipo (nombreTipo) VALUES ('Auditorio'); --11
INSERT INTO Tipo (nombreTipo) VALUES ('Papeleria'); --12
INSERT INTO Tipo (nombreTipo) VALUES ('Bienestar'); --13
INSERT INTO Tipo (nombreTipo) VALUES ('Zona de ingreso'); --14
INSERT INTO Tipo (nombreTipo) VALUES ('Almacén'); --15

-- ADMINISTRADOR ya se cargo
INSERT INTO Administrador (usuario,contrasena) VALUES('sistemas','1234');

-- PUNTOS INTERES EXTERIOR
INSERT INTO PuntoInteresExterior (nombre,latitud,longitud,id_mapa) VALUES ('César Augusto López Arias',4.804728,-75.759141,1); --1
INSERT INTO PuntoInteresExterior (nombre,latitud,longitud,id_mapa) VALUES ('Jaime Cortés Díaz',4.803736,-75.759469,1); --2
INSERT INTO PuntoInteresExterior (nombre,latitud,longitud,id_mapa) VALUES ('Bloque A',4.805174,-75.759409,1); --3
INSERT INTO PuntoInteresExterior (nombre,latitud,longitud,id_mapa) VALUES ('Eduardo Octavio Jaramillo González',4.805702, -75.759426,1); --4
INSERT INTO PuntoInteresExterior (nombre,latitud,longitud,id_mapa) VALUES ('Rodrigo Rivera Correa',4.805646,-75.760128,1); --5
INSERT INTO PuntoInteresExterior (nombre,latitud,longitud,id_mapa) VALUES ('Daniel Becerra Piedrahita',4.8061549,-75.7600598,1); --6
INSERT INTO PuntoInteresExterior (nombre,latitud,longitud,id_mapa) VALUES ('Alberto Mesa Abadía',4.806132,-75.760550,1); --7
INSERT INTO PuntoInteresExterior (nombre,latitud,longitud,id_mapa) VALUES ('Parqueadero',4.804725,-75.758657,1); --8
INSERT INTO PuntoInteresExterior (nombre,latitud,longitud,id_mapa) VALUES ('Parqueadero',4.804054, -75.759795,1); --9
INSERT INTO PuntoInteresExterior (nombre,latitud,longitud,id_mapa) VALUES ('Parqueadero',4.804936,-75.759682,1); --10
INSERT INTO PuntoInteresExterior (nombre,latitud,longitud,id_mapa) VALUES ('Parqueadero',4.806057,-75.759577,1); --11
INSERT INTO PuntoInteresExterior (nombre,latitud,longitud,id_mapa) VALUES ('Parqueadero',4.806576,-75.760198,1); --12
INSERT INTO PuntoInteresExterior (nombre,latitud,longitud,id_mapa) VALUES ('Parqueadero',4.804246,-75.758789,1); --13
INSERT INTO PuntoInteresExterior (nombre,latitud,longitud,id_mapa) VALUES ('Cancha de Futbol',4.806215,-75.761021,1); --14
INSERT INTO PuntoInteresExterior (nombre,latitud,longitud,id_mapa) VALUES ('Cancha de Baloncesto',4.806130,-75.761450,1); --15
INSERT INTO PuntoInteresExterior (nombre,latitud,longitud,id_mapa) VALUES ('Cancha de Volleibol',4.806130,-75.761450,1); --16
INSERT INTO PuntoInteresExterior (nombre,latitud,longitud,id_mapa) VALUES ('Entrada Villa Olimpica',4.804112,-75.758635,1); --17
INSERT INTO PuntoInteresExterior (nombre,latitud,longitud,id_mapa) VALUES ('Entrada Belmonte',4.807033,-75.761539,1); --18
INSERT INTO PuntoInteresExterior (nombre,latitud,longitud,id_mapa) VALUES ('Cafeteria A',4.805348,-75.759111,1); --19
INSERT INTO PuntoInteresExterior (nombre,latitud,longitud,id_mapa) VALUES ('Cafeteria B',4.805437, -75.760029,1); --20
INSERT INTO PuntoInteresExterior (nombre,latitud,longitud,id_mapa) VALUES ('Papelería Principal', 4.805375, -75.759079,1) --21


-- PARQUEADEROS
INSERT INTO Parqueadero (id_puntoExterior,vehiculo,id_tipo) VALUES (8,'Carros',4);
INSERT INTO Parqueadero (id_puntoExterior,vehiculo,id_tipo) VALUES (9,'Carros',4);
INSERT INTO Parqueadero (id_puntoExterior,vehiculo,id_tipo) VALUES (10,'Carros y Motos',4);
INSERT INTO Parqueadero (id_puntoExterior,vehiculo,id_tipo) VALUES (11,'Carros',3);
INSERT INTO Parqueadero (id_puntoExterior,vehiculo,id_tipo) VALUES (12,'Carros y Motos',4);
INSERT INTO Parqueadero (id_puntoExterior,vehiculo,id_tipo) VALUES (13,'Motos',4);

-- ESTRUCTURAS
INSERT INTO Estructura (bloque,id_puntoExterior,id_tipo) VALUES ('Administrativo',1,2);
INSERT INTO Estructura (bloque,id_puntoExterior,id_tipo) VALUES ('Posgrado',2,1);
INSERT INTO Estructura (bloque,id_puntoExterior,id_tipo) VALUES ('Bloque A',3,13);
INSERT INTO Estructura (bloque,id_puntoExterior,id_tipo) VALUES ('Bloque B',4,1);
INSERT INTO Estructura (bloque,id_puntoExterior,id_tipo) VALUES ('Auditorio',5,11);
INSERT INTO Estructura (bloque,id_puntoExterior,id_tipo) VALUES ('Bloque C',6,1);
INSERT INTO Estructura (bloque,id_puntoExterior,id_tipo) VALUES ('Laboratorios',7,1);
INSERT INTO Estructura (bloque,id_puntoExterior,id_tipo) VALUES ('Canchas',14,5);
INSERT INTO Estructura (bloque,id_puntoExterior,id_tipo) VALUES ('Canchas',15,5);
INSERT INTO Estructura (bloque,id_puntoExterior,id_tipo) VALUES ('Canchas',16,5);
INSERT INTO Estructura (bloque,id_puntoExterior,id_tipo) VALUES ('Entrada Villa Olimpica',17,14);
INSERT INTO Estructura (bloque,id_puntoExterior,id_tipo) VALUES ('Entrada Belmonte',18,14);
INSERT INTO Estructura (bloque,id_puntoExterior,id_tipo) VALUES ('Cafetería',19,10);
INSERT INTO Estructura (bloque,id_puntoExterior,id_tipo) VALUES ('Cafetería',20,10);
INSERT INTO Estructura (bloque,id_puntoExterior,id_tipo) VALUES ('Papelería',20,12);

-- IMAGENES
INSERT INTO Imagen (nombre,id_puntoExterior) VALUES ('cesarAImagen1',1);
INSERT INTO Imagen (nombre,id_puntoExterior) VALUES ('cesarAImagen2',1);
INSERT INTO Imagen (nombre,id_puntoExterior) VALUES ('cesarAImagen3',1);
INSERT INTO Imagen (nombre,id_puntoExterior) VALUES ('jaimeCImagen1',2);
INSERT INTO Imagen (nombre,id_puntoExterior) VALUES ('jaimeCImagen2',2);
INSERT INTO Imagen (nombre,id_puntoExterior) VALUES ('jaimeCImagen3',2);
INSERT INTO Imagen (nombre,id_puntoExterior) VALUES ('bloqueAImagen1',3);
INSERT INTO Imagen (nombre,id_puntoExterior) VALUES ('bloqueAImagen2',3);
INSERT INTO Imagen (nombre,id_puntoExterior) VALUES ('bloqueAImagen3',3);
INSERT INTO Imagen (nombre,id_puntoExterior) VALUES ('eduardOImagen1',4);
INSERT INTO Imagen (nombre,id_puntoExterior) VALUES ('eduardOImagen2',4);
INSERT INTO Imagen (nombre,id_puntoExterior) VALUES ('eduardOImagen3',4);
INSERT INTO Imagen (nombre,id_puntoExterior) VALUES ('rodrigoRImagen1',5);
INSERT INTO Imagen (nombre,id_puntoExterior) VALUES ('rodrigoRImagen2',5);
INSERT INTO Imagen (nombre,id_puntoExterior) VALUES ('rodrigoRImagen3',5);
INSERT INTO Imagen (nombre,id_puntoExterior) VALUES ('danielBImagen1',6);
INSERT INTO Imagen (nombre,id_puntoExterior) VALUES ('danielBImagen2',6);
INSERT INTO Imagen (nombre,id_puntoExterior) VALUES ('danielBImagen3',6);
INSERT INTO Imagen (nombre,id_puntoExterior) VALUES ('albertoMImagen1',7);
INSERT INTO Imagen (nombre,id_puntoExterior) VALUES ('albertoMImagen2',7);
INSERT INTO Imagen (nombre,id_puntoExterior) VALUES ('albertoMImagen3',7);
INSERT INTO Imagen (nombre,id_puntoExterior) VALUES ('parq1Imagen1',8);
INSERT INTO Imagen (nombre,id_puntoExterior) VALUES ('parq1Imagen2',8);
INSERT INTO Imagen (nombre,id_puntoExterior) VALUES ('parq2Imagen1',9);
INSERT INTO Imagen (nombre,id_puntoExterior) VALUES ('parq2Imagen2',9);
INSERT INTO Imagen (nombre,id_puntoExterior) VALUES ('parq3Imagen1',10);
INSERT INTO Imagen (nombre,id_puntoExterior) VALUES ('parq3Imagen2',10);
INSERT INTO Imagen (nombre,id_puntoExterior) VALUES ('parq4Imagen1',11);
INSERT INTO Imagen (nombre,id_puntoExterior) VALUES ('parq4Imagen2',11);
INSERT INTO Imagen (nombre,id_puntoExterior) VALUES ('parq5Imagen1',12);
INSERT INTO Imagen (nombre,id_puntoExterior) VALUES ('parq5Imagen2',12);
INSERT INTO Imagen (nombre,id_puntoExterior) VALUES ('parq6Imagen1',13);
INSERT INTO Imagen (nombre,id_puntoExterior) VALUES ('parq6Imagen2',13);
INSERT INTO Imagen (nombre,id_puntoExterior) VALUES ('canchaFImagen1',14);
INSERT INTO Imagen (nombre,id_puntoExterior) VALUES ('canchaFImagen2',14);
INSERT INTO Imagen (nombre,id_puntoExterior) VALUES ('canchaBImagen1',15);
INSERT INTO Imagen (nombre,id_puntoExterior) VALUES ('canchaBImagen2',15);
INSERT INTO Imagen (nombre,id_puntoExterior) VALUES ('canchaVImagen1',16);
INSERT INTO Imagen (nombre,id_puntoExterior) VALUES ('canchaVImagen2',16);
INSERT INTO Imagen (nombre,id_puntoExterior) VALUES ('entradaVImagen1',17);
INSERT INTO Imagen (nombre,id_puntoExterior) VALUES ('entradaVImagen2',17);
INSERT INTO Imagen (nombre,id_puntoExterior) VALUES ('entradaBImagen1',18);
INSERT INTO Imagen (nombre,id_puntoExterior) VALUES ('entradaBImagen2',18);
INSERT INTO Imagen (nombre,id_puntoExterior) VALUES ('cafeAImagen1',19);
INSERT INTO Imagen (nombre,id_puntoExterior) VALUES ('cafeAImagen2',19);
INSERT INTO Imagen (nombre,id_puntoExterior) VALUES ('cafeBImagen1',20);
INSERT INTO Imagen (nombre,id_puntoExterior) VALUES ('cafeBImagen2',20);
INSERT INTO Imagen (nombre,id_puntoExterior) VALUES ('cafeAImagen1',21);
INSERT INTO Imagen (nombre,id_puntoExterior) VALUES ('cafeAImagen2',21);

-- PISOS
-- Edificio César Augusto López Arias - Administrativo
INSERT INTO Piso (nivel,id_estructura,plano) VALUES('1',1,'cesarAplano1'); -- 1
INSERT INTO Piso (nivel,id_estructura,plano) VALUES('2',1,'cesarAplano2'); -- 2
INSERT INTO Piso (nivel,id_estructura,plano) VALUES('3',1,'cesarAplano3'); -- 3
-- Edificio Jaime Cortés Díaz - Posgrado
INSERT INTO Piso (nivel,id_estructura,plano) VALUES('1',2,'jaimeCplano1'); -- 4
INSERT INTO Piso (nivel,id_estructura,plano) VALUES('2',2,'jaimeCplano2'); -- 5
INSERT INTO Piso (nivel,id_estructura,plano) VALUES('3',2,'jaimeCplano3'); -- 6
-- Bloque A
INSERT INTO Piso (nivel,id_estructura,plano) VALUES('1',3,'bloqueAplano1'); -- 7
INSERT INTO Piso (nivel,id_estructura,plano) VALUES('2',3,'bloqueAplano2'); -- 8
-- Eduardo Octavio Jaramillo González - Bloque B
INSERT INTO Piso (nivel,id_estructura,plano) VALUES('1',4,'eduardoOplano1'); -- 9
INSERT INTO Piso (nivel,id_estructura,plano) VALUES('2',4,'eduardoOplano2'); -- 10
INSERT INTO Piso (nivel,id_estructura,plano) VALUES('3',4,'eduardoOplano3'); -- 11
-- Rodrigo Rivera Correa - Auditorio
INSERT INTO Piso (nivel,id_estructura,plano) VALUES('1',5,'rodrigoRplano1'); -- 12
--Daniel Becerra Piedrahita - Bloque C
INSERT INTO Piso (nivel,id_estructura,plano) VALUES('1',6,'danielBplano1'); -- 13
INSERT INTO Piso (nivel,id_estructura,plano) VALUES('2',6,'danielBplano2'); -- 14
INSERT INTO Piso (nivel,id_estructura,plano) VALUES('3',6,'danielBplano3'); -- 15
INSERT INTO Piso (nivel,id_estructura,plano) VALUES('4',6,'danielBplano4'); -- 16
INSERT INTO Piso (nivel,id_estructura,plano) VALUES('5',6,'danielBplano5'); -- 17
-- Alberto Mesa Abadía - Laboratorios
INSERT INTO Piso (nivel,id_estructura,plano) VALUES('1',7,'albertoMplano1'); -- 18
INSERT INTO Piso (nivel,id_estructura,plano) VALUES('2',7,'albertoMplano2'); -- 19
INSERT INTO Piso (nivel,id_estructura,plano) VALUES('3',7,'albertoMplano3'); -- 20

-- PUNTOS INTERES INTERIORES

-- Edificio César Augusto López Arias - Administrativo
--primer piso
INSERT INTO PuntoInteresInterior(nombre,activo,id_tipo,id_piso) VALUES('Seguridad y Salud en el trabajo',1,9,1);
INSERT INTO PuntoInteresInterior(nombre,activo,id_tipo,id_piso) VALUES('Mercadeo y Comunicaciones',1,9,1);
INSERT INTO PuntoInteresInterior(nombre,activo,id_tipo,id_piso) VALUES('Registro y Control',1,9,1);
INSERT INTO PuntoInteresInterior(nombre,activo,id_tipo,id_piso) VALUES('Tesorería',1,9,1);
--segundo piso
INSERT INTO PuntoInteresInterior(nombre,activo,id_tipo,id_piso) VALUES('Gestión Humana',1,9,2);
INSERT INTO PuntoInteresInterior(nombre,activo,id_tipo,id_piso) VALUES('Departamento de Sistemas',1,9,2);
--tercer piso
INSERT INTO PuntoInteresInterior(nombre,activo,id_tipo,id_piso) VALUES('Planeación',1,9,3);
INSERT INTO PuntoInteresInterior(nombre,activo,id_tipo,id_piso) VALUES('Proyección social',1,9,3);
INSERT INTO PuntoInteresInterior(nombre,activo,id_tipo,id_piso) VALUES('Rectoría y Comuniaciones',1,9,3);
INSERT INTO PuntoInteresInterior(nombre,activo,id_tipo,id_piso) VALUES('Jurídica, Secretaría seccional y ambiental',1,9,3);
INSERT INTO PuntoInteresInterior(nombre,activo,id_tipo,id_piso) VALUES('Auditoria',1,9,3);
-- Edificio Jaime Cortés Díaz - Posgrado
-- primer piso
INSERT INTO PuntoInteresInterior(nombre,activo,id_tipo,id_piso) VALUES('Área administrativas',1,9,4);
INSERT INTO PuntoInteresInterior(nombre,activo,id_tipo,id_piso) VALUES('Cafetería',1,10,4);
INSERT INTO PuntoInteresInterior(nombre,activo,id_tipo,id_piso) VALUES('101',1,7,4);
INSERT INTO PuntoInteresInterior(nombre,activo,id_tipo,id_piso) VALUES('102',1,7,4);
INSERT INTO PuntoInteresInterior(nombre,activo,id_tipo,id_piso) VALUES('104',1,7,4);
-- segundo piso
INSERT INTO PuntoInteresInterior(nombre,activo,id_tipo,id_piso) VALUES('Sala de Docentes',1,9,5);
INSERT INTO PuntoInteresInterior(nombre,activo,id_tipo,id_piso) VALUES('201',1,7,5);
INSERT INTO PuntoInteresInterior(nombre,activo,id_tipo,id_piso) VALUES('202',1,7,5);
INSERT INTO PuntoInteresInterior(nombre,activo,id_tipo,id_piso) VALUES('203',1,7,5);
INSERT INTO PuntoInteresInterior(nombre,activo,id_tipo,id_piso) VALUES('204',1,7,5);
INSERT INTO PuntoInteresInterior(nombre,activo,id_tipo,id_piso) VALUES('205',1,7,5);
INSERT INTO PuntoInteresInterior(nombre,activo,id_tipo,id_piso) VALUES('206',1,7,5);
-- tercer piso
INSERT INTO PuntoInteresInterior(nombre,activo,id_tipo,id_piso) VALUES('301',1,7,6);
INSERT INTO PuntoInteresInterior(nombre,activo,id_tipo,id_piso) VALUES('302',1,7,6);
INSERT INTO PuntoInteresInterior(nombre,activo,id_tipo,id_piso) VALUES('303',1,7,6);
INSERT INTO PuntoInteresInterior(nombre,activo,id_tipo,id_piso) VALUES('304',1,7,6);
INSERT INTO PuntoInteresInterior(nombre,activo,id_tipo,id_piso) VALUES('305',1,7,6);
INSERT INTO PuntoInteresInterior(nombre,activo,id_tipo,id_piso) VALUES('306',1,7,6);
INSERT INTO PuntoInteresInterior(nombre,activo,id_tipo,id_piso) VALUES('307',1,7,6);
-- Bloque A
-- primer piso
INSERT INTO PuntoInteresInterior(nombre,activo,id_tipo,id_piso) VALUES('Tenis de Mesa',1,13,7);
INSERT INTO PuntoInteresInterior(nombre,activo,id_tipo,id_piso) VALUES('Danza y Música',1,13,7);
INSERT INTO PuntoInteresInterior(nombre,activo,id_tipo,id_piso) VALUES('Sala de Descanso',1,13,7);
INSERT INTO PuntoInteresInterior(nombre,activo,id_tipo,id_piso) VALUES('Sala de Lactancia',1,13,7);
INSERT INTO PuntoInteresInterior(nombre,activo,id_tipo,id_piso) VALUES('ASPROUL',1,9,7);
INSERT INTO PuntoInteresInterior(nombre,activo,id_tipo,id_piso) VALUES('Bienestar SENA',1,9,7);
-- segundo nivel
INSERT INTO PuntoInteresInterior(nombre,activo,id_tipo,id_piso) VALUES('201',1,7,8);
INSERT INTO PuntoInteresInterior(nombre,activo,id_tipo,id_piso) VALUES('Simulación de Consulta',1,8,8);
INSERT INTO PuntoInteresInterior(nombre,activo,id_tipo,id_piso) VALUES('Antropometría',1,8,8);
INSERT INTO PuntoInteresInterior(nombre,activo,id_tipo,id_piso) VALUES('301',1,7,8);
-- Eduardo Octavio Jaramillo González - Bloque B
-- primer piso
INSERT INTO PuntoInteresInterior(nombre,activo,id_tipo,id_piso) VALUES('101',1,7,9);
INSERT INTO PuntoInteresInterior(nombre,activo,id_tipo,id_piso) VALUES('102',1,7,9);
INSERT INTO PuntoInteresInterior(nombre,activo,id_tipo,id_piso) VALUES('103',1,7,9);
INSERT INTO PuntoInteresInterior(nombre,activo,id_tipo,id_piso) VALUES('Decanatura Ciencias Econónomicas y Contables',1,9,9);
INSERT INTO PuntoInteresInterior(nombre,activo,id_tipo,id_piso) VALUES('Sala de Docentes',1,9,9);
INSERT INTO PuntoInteresInterior(nombre,activo,id_tipo,id_piso) VALUES('104',1,7,9);
INSERT INTO PuntoInteresInterior(nombre,activo,id_tipo,id_piso) VALUES('105',1,7,9);
INSERT INTO PuntoInteresInterior(nombre,activo,id_tipo,id_piso) VALUES('CEIDEUL',1,9,9);
INSERT INTO PuntoInteresInterior(nombre,activo,id_tipo,id_piso) VALUES('Cafetería Principal',1,10,9);
INSERT INTO PuntoInteresInterior(nombre,activo,id_tipo,id_piso) VALUES('Paraninfo Benjamin Herrera',1,11,9);
-- segundo piso
INSERT INTO PuntoInteresInterior(nombre,activo,id_tipo,id_piso) VALUES('201',1,7,10);
INSERT INTO PuntoInteresInterior(nombre,activo,id_tipo,id_piso) VALUES('203',1,7,10);
INSERT INTO PuntoInteresInterior(nombre,activo,id_tipo,id_piso) VALUES('Sala Satélite de Consulta',1,7,10);
INSERT INTO PuntoInteresInterior(nombre,activo,id_tipo,id_piso) VALUES('Sala LEF',1,9,10);
INSERT INTO PuntoInteresInterior(nombre,activo,id_tipo,id_piso) VALUES('205',1,7,10);
INSERT INTO PuntoInteresInterior(nombre,activo,id_tipo,id_piso) VALUES('206',1,7,10);
INSERT INTO PuntoInteresInterior(nombre,activo,id_tipo,id_piso) VALUES('Audiovisuales',1,9,10);
INSERT INTO PuntoInteresInterior(nombre,activo,id_tipo,id_piso) VALUES('Sala de Sistemas 1',1,7,10);
INSERT INTO PuntoInteresInterior(nombre,activo,id_tipo,id_piso) VALUES('Sala de Sistemas 2',1,7,10);
INSERT INTO PuntoInteresInterior(nombre,activo,id_tipo,id_piso) VALUES('Sala de Sistemas 3',1,7,10);
INSERT INTO PuntoInteresInterior(nombre,activo,id_tipo,id_piso) VALUES('Sala de Sistemas 4',1,7,10);
-- tercer piso
INSERT INTO PuntoInteresInterior(nombre,activo,id_tipo,id_piso) VALUES('401',1,7,11);
INSERT INTO PuntoInteresInterior(nombre,activo,id_tipo,id_piso) VALUES('402',1,7,11);
INSERT INTO PuntoInteresInterior(nombre,activo,id_tipo,id_piso) VALUES('403',1,7,11);
INSERT INTO PuntoInteresInterior(nombre,activo,id_tipo,id_piso) VALUES('404',1,7,11);
INSERT INTO PuntoInteresInterior(nombre,activo,id_tipo,id_piso) VALUES('405',1,7,11);
INSERT INTO PuntoInteresInterior(nombre,activo,id_tipo,id_piso) VALUES('502',1,7,11);
INSERT INTO PuntoInteresInterior(nombre,activo,id_tipo,id_piso) VALUES('503',1,7,11);
INSERT INTO PuntoInteresInterior(nombre,activo,id_tipo,id_piso) VALUES('Direcciones de Investigaciones',1,9,11);
-- Rodrigo Rivera Correa - Auditorio
INSERT INTO PuntoInteresInterior(nombre,activo,id_tipo,id_piso) VALUES('Mayor',1,11,12);
INSERT INTO PuntoInteresInterior(nombre,activo,id_tipo,id_piso) VALUES('Inclinado',1,11,12);
INSERT INTO PuntoInteresInterior(nombre,activo,id_tipo,id_piso) VALUES('Biblioteca',1,6,12);
--Daniel Becerra Piedrahita - Bloque C
-- primer piso
INSERT INTO PuntoInteresInterior(nombre,activo,id_tipo,id_piso) VALUES('101',1,7,13);
INSERT INTO PuntoInteresInterior(nombre,activo,id_tipo,id_piso) VALUES('102',1,7,13);
INSERT INTO PuntoInteresInterior(nombre,activo,id_tipo,id_piso) VALUES('103',1,7,13);
INSERT INTO PuntoInteresInterior(nombre,activo,id_tipo,id_piso) VALUES('104',1,7,13);
INSERT INTO PuntoInteresInterior(nombre,activo,id_tipo,id_piso) VALUES('105',1,7,13);
INSERT INTO PuntoInteresInterior(nombre,activo,id_tipo,id_piso) VALUES('106',1,7,13);
INSERT INTO PuntoInteresInterior(nombre,activo,id_tipo,id_piso) VALUES('107',1,7,13);
INSERT INTO PuntoInteresInterior(nombre,activo,id_tipo,id_piso) VALUES('108',1,7,13);
INSERT INTO PuntoInteresInterior(nombre,activo,id_tipo,id_piso) VALUES('Prestación de Servicios',1,8,13);
INSERT INTO PuntoInteresInterior(nombre,activo,id_tipo,id_piso) VALUES('Nutrición y Dietetica',1,8,13);
-- segundo piso
INSERT INTO PuntoInteresInterior(nombre,activo,id_tipo,id_piso) VALUES('201',1,7,14);
INSERT INTO PuntoInteresInterior(nombre,activo,id_tipo,id_piso) VALUES('202',1,7,14);
INSERT INTO PuntoInteresInterior(nombre,activo,id_tipo,id_piso) VALUES('203',1,7,14);
INSERT INTO PuntoInteresInterior(nombre,activo,id_tipo,id_piso) VALUES('204',1,7,14);
INSERT INTO PuntoInteresInterior(nombre,activo,id_tipo,id_piso) VALUES('205',1,7,14);
INSERT INTO PuntoInteresInterior(nombre,activo,id_tipo,id_piso) VALUES('206',1,7,14);
INSERT INTO PuntoInteresInterior(nombre,activo,id_tipo,id_piso) VALUES('207',1,7,14);
INSERT INTO PuntoInteresInterior(nombre,activo,id_tipo,id_piso) VALUES('208',1,7,14);
INSERT INTO PuntoInteresInterior(nombre,activo,id_tipo,id_piso) VALUES('209',1,7,14);
INSERT INTO PuntoInteresInterior(nombre,activo,id_tipo,id_piso) VALUES('210',1,7,14);
-- tercer piso
INSERT INTO PuntoInteresInterior(nombre,activo,id_tipo,id_piso) VALUES('301',1,7,15);
INSERT INTO PuntoInteresInterior(nombre,activo,id_tipo,id_piso) VALUES('302',1,7,15);
INSERT INTO PuntoInteresInterior(nombre,activo,id_tipo,id_piso) VALUES('303',1,7,15);
INSERT INTO PuntoInteresInterior(nombre,activo,id_tipo,id_piso) VALUES('304',1,7,15);
INSERT INTO PuntoInteresInterior(nombre,activo,id_tipo,id_piso) VALUES('305',1,7,15);
INSERT INTO PuntoInteresInterior(nombre,activo,id_tipo,id_piso) VALUES('306',1,7,15);
INSERT INTO PuntoInteresInterior(nombre,activo,id_tipo,id_piso) VALUES('307',1,7,15);
INSERT INTO PuntoInteresInterior(nombre,activo,id_tipo,id_piso) VALUES('308',1,7,15);
INSERT INTO PuntoInteresInterior(nombre,activo,id_tipo,id_piso) VALUES('309',1,7,15);
INSERT INTO PuntoInteresInterior(nombre,activo,id_tipo,id_piso) VALUES('310',1,7,15);
-- cuarto piso
INSERT INTO PuntoInteresInterior(nombre,activo,id_tipo,id_piso) VALUES('Decanatura Facultad de Ingenierías',1,9,16);
INSERT INTO PuntoInteresInterior(nombre,activo,id_tipo,id_piso) VALUES('Sala de Docentes',1,9,16);
INSERT INTO PuntoInteresInterior(nombre,activo,id_tipo,id_piso) VALUES('Audiovisuales',1,7,16);
INSERT INTO PuntoInteresInterior(nombre,activo,id_tipo,id_piso) VALUES('402',1,7,16);
INSERT INTO PuntoInteresInterior(nombre,activo,id_tipo,id_piso) VALUES('Sala de Docentes',1,9,16);
INSERT INTO PuntoInteresInterior(nombre,activo,id_tipo,id_piso) VALUES('403',1,7,16);
INSERT INTO PuntoInteresInterior(nombre,activo,id_tipo,id_piso) VALUES('404',1,7,16);
INSERT INTO PuntoInteresInterior(nombre,activo,id_tipo,id_piso) VALUES('Reactivos',1,15,16);
INSERT INTO PuntoInteresInterior(nombre,activo,id_tipo,id_piso) VALUES('406',1,7,16);
INSERT INTO PuntoInteresInterior(nombre,activo,id_tipo,id_piso) VALUES('407',1,7,16);
INSERT INTO PuntoInteresInterior(nombre,activo,id_tipo,id_piso) VALUES('Sala de Docentes',1,9,16);
INSERT INTO PuntoInteresInterior(nombre,activo,id_tipo,id_piso) VALUES('Decanatura Ciencias de la Salud, Exactas y Naturales',1,9,16);
-- quinto piso
INSERT INTO PuntoInteresInterior(nombre,activo,id_tipo,id_piso) VALUES('Químicos',1,15,17);
INSERT INTO PuntoInteresInterior(nombre,activo,id_tipo,id_piso) VALUES('Biología',1,8,17);
INSERT INTO PuntoInteresInterior(nombre,activo,id_tipo,id_piso) VALUES('Microbiología',1,8,17);
INSERT INTO PuntoInteresInterior(nombre,activo,id_tipo,id_piso) VALUES('Química',1,8,17);
INSERT INTO PuntoInteresInterior(nombre,activo,id_tipo,id_piso) VALUES('Coordinación de laboratorios FACSEN',1,9,17);
INSERT INTO PuntoInteresInterior(nombre,activo,id_tipo,id_piso) VALUES('Investigación',1,8,17);
INSERT INTO PuntoInteresInterior(nombre,activo,id_tipo,id_piso) VALUES('Simulación de Enfermería',1,8,17);
-- Alberto Mesa Abadía - Laboratorios
-- primer piso
INSERT INTO PuntoInteresInterior(nombre,activo,id_tipo,id_piso) VALUES('Hidráulica y Mecánica de Fluidos',1,8,18);
INSERT INTO PuntoInteresInterior(nombre,activo,id_tipo,id_piso) VALUES('Geología',1,8,18);
INSERT INTO PuntoInteresInterior(nombre,activo,id_tipo,id_piso) VALUES('Materiales de Construcción',1,8,18);
INSERT INTO PuntoInteresInterior(nombre,activo,id_tipo,id_piso) VALUES('Suelos',1,8,18);
INSERT INTO PuntoInteresInterior(nombre,activo,id_tipo,id_piso) VALUES('Pavimentos',1,8,18);
INSERT INTO PuntoInteresInterior(nombre,activo,id_tipo,id_piso) VALUES('Resistencia de Materiales',1,8,18);
INSERT INTO PuntoInteresInterior(nombre,activo,id_tipo,id_piso) VALUES('Geotecnólogo',1,9,18);
-- segundo piso
INSERT INTO PuntoInteresInterior(nombre,activo,id_tipo,id_piso) VALUES('Simulación Inversiones',1,9,19);
INSERT INTO PuntoInteresInterior(nombre,activo,id_tipo,id_piso) VALUES('Tecnología e Innovación Financiera',1,8,19);
INSERT INTO PuntoInteresInterior(nombre,activo,id_tipo,id_piso) VALUES('Obelix',1,9,19);
INSERT INTO PuntoInteresInterior(nombre,activo,id_tipo,id_piso) VALUES('Ingeniería de Software',1,8,19);
INSERT INTO PuntoInteresInterior(nombre,activo,id_tipo,id_piso) VALUES('Gestión Comercial',1,9,19);
INSERT INTO PuntoInteresInterior(nombre,activo,id_tipo,id_piso) VALUES('Simulación y Modelación Comercial',1,8,19);
INSERT INTO PuntoInteresInterior(nombre,activo,id_tipo,id_piso) VALUES('Logística y Mercadeo',1,8,19);
INSERT INTO PuntoInteresInterior(nombre,activo,id_tipo,id_piso) VALUES('Inteligencia Artificail y Robótica',1,8,19);
INSERT INTO PuntoInteresInterior(nombre,activo,id_tipo,id_piso) VALUES('Observatorio de Movimiento Fuerte',1,9,19);
INSERT INTO PuntoInteresInterior(nombre,activo,id_tipo,id_piso) VALUES('Topografía',1,15,19);
INSERT INTO PuntoInteresInterior(nombre,activo,id_tipo,id_piso) VALUES('Sala de Docentes',1,9,19);
INSERT INTO PuntoInteresInterior(nombre,activo,id_tipo,id_piso) VALUES('Sala SIG',1,7,19);
INSERT INTO PuntoInteresInterior(nombre,activo,id_tipo,id_piso) VALUES('Sala de Software en Ingeniería Civil',1,7,19);
-- Tercer piso
INSERT INTO PuntoInteresInterior(nombre,activo,id_tipo,id_piso) VALUES('Coordinación Laboratorios Ingenierías',1,9,20);
INSERT INTO PuntoInteresInterior(nombre,activo,id_tipo,id_piso) VALUES('Química y Análisis de Aguas',1,8,20);
INSERT INTO PuntoInteresInterior(nombre,activo,id_tipo,id_piso) VALUES('Química',1,8,20);
INSERT INTO PuntoInteresInterior(nombre,activo,id_tipo,id_piso) VALUES('Física Óptica y Ondulatoria',1,8,20);
INSERT INTO PuntoInteresInterior(nombre,activo,id_tipo,id_piso) VALUES('Física Mecánica, Electricidad y Magnetismo',1,8,20);
INSERT INTO PuntoInteresInterior(nombre,activo,id_tipo,id_piso) VALUES('Biología',1,8,20);