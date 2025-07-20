-- MAPA UBICACIÓN CENTRAL DEL CAMPUS
INSERT INTO public.mapa (latitud,longitud) VALUES (4.805407, -75.759847);

-- TIPOS 
INSERT INTO public.tipo (nombre_tipo) VALUES ('Académico'); --1
INSERT INTO public.tipo (nombre_tipo) VALUES ('Administrativo'); --2
INSERT INTO public.tipo (nombre_tipo) VALUES ('Profesores'); --3
INSERT INTO public.tipo (nombre_tipo) VALUES ('Particular'); --4
INSERT INTO public.tipo (nombre_tipo) VALUES ('Escenario Deportivo'); --5
INSERT INTO public.tipo (nombre_tipo) VALUES ('Biblioteca'); --6
INSERT INTO public.tipo (nombre_tipo) VALUES ('Salón'); --7
INSERT INTO public.tipo (nombre_tipo) VALUES ('Laboratorio'); --8
INSERT INTO public.tipo (nombre_tipo) VALUES ('Oficina'); --9
INSERT INTO public.tipo (nombre_tipo) VALUES ('Kiosco'); --10
INSERT INTO public.tipo (nombre_tipo) VALUES ('Auditorio'); --11
INSERT INTO public.tipo (nombre_tipo) VALUES ('Papeleria'); --12
INSERT INTO public.tipo (nombre_tipo) VALUES ('Bienestar'); --13
INSERT INTO public.tipo (nombre_tipo) VALUES ('Zona de ingreso'); --14
INSERT INTO public.tipo (nombre_tipo) VALUES ('Almacén'); --15

-- PUNTOS INTERES EXTERIOR
INSERT INTO public.punto_interes_exterior (nombre,latitud,longitud,activo,id_mapa) VALUES ('César Augusto López Arias',4.804728,-75.759141,true,1); --1
INSERT INTO public.punto_interes_exterior (nombre,latitud,longitud,activo,id_mapa) VALUES ('Jaime Cortés Díaz',4.803736,-75.759469,true,1); --2
INSERT INTO public.punto_interes_exterior (nombre,latitud,longitud,activo,id_mapa) VALUES ('Bloque A',4.805174,-75.759409,true,1); --3
INSERT INTO public.punto_interes_exterior (nombre,latitud,longitud,activo,id_mapa) VALUES ('Eduardo Octavio Jaramillo González',4.805702, -75.759426,true,1); --4
INSERT INTO public.punto_interes_exterior (nombre,latitud,longitud,activo,id_mapa) VALUES ('Rodrigo Rivera Correa',4.805646,-75.760128,true,1); --5
INSERT INTO public.punto_interes_exterior (nombre,latitud,longitud,activo,id_mapa) VALUES ('Daniel Becerra Piedrahita',4.8061549,-75.7600598,true,1); --6
INSERT INTO public.punto_interes_exterior (nombre,latitud,longitud,activo,id_mapa) VALUES ('Alberto Mesa Abadía',4.806132,-75.760550,true,1); --7
INSERT INTO public.punto_interes_exterior (nombre,latitud,longitud,activo,id_mapa) VALUES ('Parqueadero',4.804725,-75.758657,true,1); --8
INSERT INTO public.punto_interes_exterior (nombre,latitud,longitud,activo,id_mapa) VALUES ('Parqueadero',4.804054, -75.759795,true,1); --9
INSERT INTO public.punto_interes_exterior (nombre,latitud,longitud,activo,id_mapa) VALUES ('Parqueadero',4.804936,-75.759682,true,1); --10
INSERT INTO public.punto_interes_exterior (nombre,latitud,longitud,activo,id_mapa) VALUES ('Parqueadero',4.806057,-75.759577,true,1); --11
INSERT INTO public.punto_interes_exterior (nombre,latitud,longitud,activo,id_mapa) VALUES ('Parqueadero',4.806576,-75.760198,true,1); --12
INSERT INTO public.punto_interes_exterior (nombre,latitud,longitud,activo,id_mapa) VALUES ('Parqueadero',4.804246,-75.758789,true,1); --13
INSERT INTO public.punto_interes_exterior (nombre,latitud,longitud,activo,id_mapa) VALUES ('Cancha de Futbol',4.806215,-75.761021,true,1); --14
INSERT INTO public.punto_interes_exterior (nombre,latitud,longitud,activo,id_mapa) VALUES ('Cancha de Baloncesto',4.806130,-75.761450,true,1); --15
INSERT INTO public.punto_interes_exterior (nombre,latitud,longitud,activo,id_mapa) VALUES ('Cancha de Volleibol',4.806130,-75.761450,true,1); --16
INSERT INTO public.punto_interes_exterior (nombre,latitud,longitud,activo,id_mapa) VALUES ('Entrada Villa Olimpica',4.804112,-75.758635,true,1); --17
INSERT INTO public.punto_interes_exterior (nombre,latitud,longitud,activo,id_mapa) VALUES ('Entrada Belmonte',4.807033,-75.761539,true,1); --18
INSERT INTO public.punto_interes_exterior (nombre,latitud,longitud,activo,id_mapa) VALUES ('Cafeteria A',4.805348,-75.759111,true,1); --19
INSERT INTO public.punto_interes_exterior (nombre,latitud,longitud,activo,id_mapa) VALUES ('Cafeteria B',4.805437, -75.760029,true,1); --20
INSERT INTO public.punto_interes_exterior (nombre,latitud,longitud,activo,id_mapa) VALUES ('Papelería Principal', 4.805375, -75.759079,true,1); --21

-- PARQUEADEROS
INSERT INTO public.parqueadero (id_punto_exterior,vehiculo,id_tipo) VALUES (8,'Carros',4);
INSERT INTO public.parqueadero (id_punto_exterior,vehiculo,id_tipo) VALUES (9,'Carros',4);
INSERT INTO public.parqueadero (id_punto_exterior,vehiculo,id_tipo) VALUES (10,'Carros y Motos',4);
INSERT INTO public.parqueadero (id_punto_exterior,vehiculo,id_tipo) VALUES (11,'Carros',3);
INSERT INTO public.parqueadero (id_punto_exterior,vehiculo,id_tipo) VALUES (12,'Carros y Motos',4);
INSERT INTO public.parqueadero (id_punto_exterior,vehiculo,id_tipo) VALUES (13,'Motos',4);

-- ESTRUCTURAS
INSERT INTO public.estructura (bloque,id_punto_exterior,id_tipo) VALUES ('Administrativo',1,2);
INSERT INTO public.estructura (bloque,id_punto_exterior,id_tipo) VALUES ('Posgrado',2,1);
INSERT INTO public.estructura (bloque,id_punto_exterior,id_tipo) VALUES ('Bloque A',3,13);
INSERT INTO public.estructura (bloque,id_punto_exterior,id_tipo) VALUES ('Bloque B',4,1);
INSERT INTO public.estructura (bloque,id_punto_exterior,id_tipo) VALUES ('Auditorio',5,11);
INSERT INTO public.estructura (bloque,id_punto_exterior,id_tipo) VALUES ('Bloque C',6,1);
INSERT INTO public.estructura (bloque,id_punto_exterior,id_tipo) VALUES ('Laboratorios',7,1);
INSERT INTO public.estructura (bloque,id_punto_exterior,id_tipo) VALUES ('Canchas',14,5);
INSERT INTO public.estructura (bloque,id_punto_exterior,id_tipo) VALUES ('Canchas',15,5);
INSERT INTO public.estructura (bloque,id_punto_exterior,id_tipo) VALUES ('Canchas',16,5);
INSERT INTO public.estructura (bloque,id_punto_exterior,id_tipo) VALUES ('Entrada Villa Olimpica',17,14);
INSERT INTO public.estructura (bloque,id_punto_exterior,id_tipo) VALUES ('Entrada Belmonte',18,14);
INSERT INTO public.estructura (bloque,id_punto_exterior,id_tipo) VALUES ('Cafetería',19,10);
INSERT INTO public.estructura (bloque,id_punto_exterior,id_tipo) VALUES ('Cafetería',20,10);
INSERT INTO public.estructura (bloque,id_punto_exterior,id_tipo) VALUES ('Papelería',21,12);

-- IMAGENES
INSERT INTO public.imagen (nombre,id_punto_exterior) VALUES ('cesarAImagen1',1);
INSERT INTO public.imagen (nombre,id_punto_exterior) VALUES ('cesarAImagen2',1);
INSERT INTO public.imagen (nombre,id_punto_exterior) VALUES ('cesarAImagen3',1);
INSERT INTO public.imagen (nombre,id_punto_exterior) VALUES ('jaimeCImagen1',2);
INSERT INTO public.imagen (nombre,id_punto_exterior) VALUES ('jaimeCImagen2',2);
INSERT INTO public.imagen (nombre,id_punto_exterior) VALUES ('jaimeCImagen3',2);
INSERT INTO public.imagen (nombre,id_punto_exterior) VALUES ('bloqueAImagen1',3);
INSERT INTO public.imagen (nombre,id_punto_exterior) VALUES ('bloqueAImagen2',3);
INSERT INTO public.imagen (nombre,id_punto_exterior) VALUES ('bloqueAImagen3',3);
INSERT INTO public.imagen (nombre,id_punto_exterior) VALUES ('eduardOImagen1',4);
INSERT INTO public.imagen (nombre,id_punto_exterior) VALUES ('eduardOImagen2',4);
INSERT INTO public.imagen (nombre,id_punto_exterior) VALUES ('eduardOImagen3',4);
INSERT INTO public.imagen (nombre,id_punto_exterior) VALUES ('rodrigoRImagen1',5);
INSERT INTO public.imagen (nombre,id_punto_exterior) VALUES ('rodrigoRImagen2',5);
INSERT INTO public.imagen (nombre,id_punto_exterior) VALUES ('rodrigoRImagen3',5);
INSERT INTO public.imagen (nombre,id_punto_exterior) VALUES ('danielBImagen1',6);
INSERT INTO public.imagen (nombre,id_punto_exterior) VALUES ('danielBImagen2',6);
INSERT INTO public.imagen (nombre,id_punto_exterior) VALUES ('danielBImagen3',6);
INSERT INTO public.imagen (nombre,id_punto_exterior) VALUES ('albertoMImagen1',7);
INSERT INTO public.imagen (nombre,id_punto_exterior) VALUES ('albertoMImagen2',7);
INSERT INTO public.imagen (nombre,id_punto_exterior) VALUES ('albertoMImagen3',7);
INSERT INTO public.imagen (nombre,id_punto_exterior) VALUES ('parq1Imagen1',8);
INSERT INTO public.imagen (nombre,id_punto_exterior) VALUES ('parq1Imagen2',8);
INSERT INTO public.imagen (nombre,id_punto_exterior) VALUES ('parq2Imagen1',9);
INSERT INTO public.imagen (nombre,id_punto_exterior) VALUES ('parq2Imagen2',9);
INSERT INTO public.imagen (nombre,id_punto_exterior) VALUES ('parq3Imagen1',10);
INSERT INTO public.imagen (nombre,id_punto_exterior) VALUES ('parq3Imagen2',10);
INSERT INTO public.imagen (nombre,id_punto_exterior) VALUES ('parq4Imagen1',11);
INSERT INTO public.imagen (nombre,id_punto_exterior) VALUES ('parq4Imagen2',11);
INSERT INTO public.imagen (nombre,id_punto_exterior) VALUES ('parq5Imagen1',12);
INSERT INTO public.imagen (nombre,id_punto_exterior) VALUES ('parq5Imagen2',12);
INSERT INTO public.imagen (nombre,id_punto_exterior) VALUES ('parq6Imagen1',13);
INSERT INTO public.imagen (nombre,id_punto_exterior) VALUES ('parq6Imagen2',13);
INSERT INTO public.imagen (nombre,id_punto_exterior) VALUES ('canchaFImagen1',14);
INSERT INTO public.imagen (nombre,id_punto_exterior) VALUES ('canchaFImagen2',14);
INSERT INTO public.imagen (nombre,id_punto_exterior) VALUES ('canchaBImagen1',15);
INSERT INTO public.imagen (nombre,id_punto_exterior) VALUES ('canchaBImagen2',15);
INSERT INTO public.imagen (nombre,id_punto_exterior) VALUES ('canchaVImagen1',16);
INSERT INTO public.imagen (nombre,id_punto_exterior) VALUES ('canchaVImagen2',16);
INSERT INTO public.imagen (nombre,id_punto_exterior) VALUES ('entradaVImagen1',17);
INSERT INTO public.imagen (nombre,id_punto_exterior) VALUES ('entradaVImagen2',17);
INSERT INTO public.imagen (nombre,id_punto_exterior) VALUES ('entradaBImagen1',18);
INSERT INTO public.imagen (nombre,id_punto_exterior) VALUES ('entradaBImagen2',18);
INSERT INTO public.imagen (nombre,id_punto_exterior) VALUES ('cafeAImagen1',19);
INSERT INTO public.imagen (nombre,id_punto_exterior) VALUES ('cafeAImagen2',19);
INSERT INTO public.imagen (nombre,id_punto_exterior) VALUES ('cafeBImagen1',20);
INSERT INTO public.imagen (nombre,id_punto_exterior) VALUES ('cafeBImagen2',20);
INSERT INTO public.imagen (nombre,id_punto_exterior) VALUES ('cafeAImagen1',21);
INSERT INTO public.imagen (nombre,id_punto_exterior) VALUES ('cafeAImagen2',21);

-- PISOS
-- Edificio César Augusto López Arias - Administrativo
INSERT INTO public.piso (nivel,id_estructura,plano) VALUES('1',1,'cesarAplano1'); -- 1
INSERT INTO public.piso (nivel,id_estructura,plano) VALUES('2',1,'cesarAplano2'); -- 2
INSERT INTO public.piso (nivel,id_estructura,plano) VALUES('3',1,'cesarAplano3'); -- 3
-- Edificio Jaime Cortés Díaz - Posgrado
INSERT INTO public.piso (nivel,id_estructura,plano) VALUES('1',2,'jaimeCplano1'); -- 4
INSERT INTO public.piso (nivel,id_estructura,plano) VALUES('2',2,'jaimeCplano2'); -- 5
INSERT INTO public.piso (nivel,id_estructura,plano) VALUES('3',2,'jaimeCplano3'); -- 6
-- Bloque A
INSERT INTO public.piso (nivel,id_estructura,plano) VALUES('1',3,'bloqueAplano1'); -- 7
INSERT INTO public.piso (nivel,id_estructura,plano) VALUES('2',3,'bloqueAplano2'); -- 8
-- Eduardo Octavio Jaramillo González - Bloque B
INSERT INTO public.piso (nivel,id_estructura,plano) VALUES('1',4,'eduardoOplano1'); -- 9
INSERT INTO public.piso (nivel,id_estructura,plano) VALUES('2',4,'eduardoOplano2'); -- 10
INSERT INTO public.piso (nivel,id_estructura,plano) VALUES('3',4,'eduardoOplano3'); -- 11
-- Rodrigo Rivera Correa - Auditorio
INSERT INTO public.piso (nivel,id_estructura,plano) VALUES('1',5,'rodrigoRplano1'); -- 12
-- Daniel Becerra Piedrahita - Bloque C
INSERT INTO public.piso (nivel,id_estructura,plano) VALUES('1',6,'danielBplano1'); -- 13
INSERT INTO public.piso (nivel,id_estructura,plano) VALUES('2',6,'danielBplano2'); -- 14
INSERT INTO public.piso (nivel,id_estructura,plano) VALUES('3',6,'danielBplano3'); -- 15
INSERT INTO public.piso (nivel,id_estructura,plano) VALUES('4',6,'danielBplano4'); -- 16
INSERT INTO public.piso (nivel,id_estructura,plano) VALUES('5',6,'danielBplano5'); -- 17
-- Alberto Mesa Abadía - Laboratorios
INSERT INTO public.piso (nivel,id_estructura,plano) VALUES('1',7,'albertoMplano1'); -- 18
INSERT INTO public.piso (nivel,id_estructura,plano) VALUES('2',7,'albertoMplano2'); -- 19
INSERT INTO public.piso (nivel,id_estructura,plano) VALUES('3',7,'albertoMplano3'); -- 20

-- PUNTOS INTERES INTERIORES
-- Edificio César Augusto López Arias - Administrativo
-- primer piso
INSERT INTO public.punto_interes_interior(nombre,activo,id_tipo,id_piso) VALUES('Seguridad y Salud en el trabajo',true,9,1);
INSERT INTO public.punto_interes_interior(nombre,activo,id_tipo,id_piso) VALUES('Mercadeo y Comunicaciones',true,9,1);
INSERT INTO public.punto_interes_interior(nombre,activo,id_tipo,id_piso) VALUES('Registro y Control',true,9,1);
INSERT INTO public.punto_interes_interior(nombre,activo,id_tipo,id_piso) VALUES('Tesorería',true,9,1);
-- segundo piso
INSERT INTO public.punto_interes_interior(nombre,activo,id_tipo,id_piso) VALUES('Gestión Humana',true,9,2);
INSERT INTO public.punto_interes_interior(nombre,activo,id_tipo,id_piso) VALUES('Departamento de Sistemas',true,9,2);
-- tercer piso
INSERT INTO public.punto_interes_interior(nombre,activo,id_tipo,id_piso) VALUES('Planeación',true,9,3);
INSERT INTO public.punto_interes_interior(nombre,activo,id_tipo,id_piso) VALUES('Proyección social',true,9,3);
INSERT INTO public.punto_interes_interior(nombre,activo,id_tipo,id_piso) VALUES('Rectoría y Comunicaciones',true,9,3);
INSERT INTO public.punto_interes_interior(nombre,activo,id_tipo,id_piso) VALUES('Jurídica, Secretaría seccional y ambiental',true,9,3);
INSERT INTO public.punto_interes_interior(nombre,activo,id_tipo,id_piso) VALUES('Auditoria',true,9,3);
-- Edificio Jaime Cortés Díaz - Posgrado
-- primer piso
INSERT INTO public.punto_interes_interior(nombre,activo,id_tipo,id_piso) VALUES('Área administrativas',true,9,4);
INSERT INTO public.punto_interes_interior(nombre,activo,id_tipo,id_piso) VALUES('Cafetería',true,10,4);
INSERT INTO public.punto_interes_interior(nombre,activo,id_tipo,id_piso) VALUES('101',true,7,4);
INSERT INTO public.punto_interes_interior(nombre,activo,id_tipo,id_piso) VALUES('102',true,7,4);
INSERT INTO public.punto_interes_interior(nombre,activo,id_tipo,id_piso) VALUES('104',true,7,4);
-- segundo piso
INSERT INTO public.punto_interes_interior(nombre,activo,id_tipo,id_piso) VALUES('Sala de Docentes',true,9,5);
INSERT INTO public.punto_interes_interior(nombre,activo,id_tipo,id_piso) VALUES('201',true,7,5);
INSERT INTO public.punto_interes_interior(nombre,activo,id_tipo,id_piso) VALUES('202',true,7,5);
INSERT INTO public.punto_interes_interior(nombre,activo,id_tipo,id_piso) VALUES('203',true,7,5);
INSERT INTO public.punto_interes_interior(nombre,activo,id_tipo,id_piso) VALUES('204',true,7,5);
INSERT INTO public.punto_interes_interior(nombre,activo,id_tipo,id_piso) VALUES('205',true,7,5);
INSERT INTO public.punto_interes_interior(nombre,activo,id_tipo,id_piso) VALUES('206',true,7,5);
-- tercer piso
INSERT INTO public.punto_interes_interior(nombre,activo,id_tipo,id_piso) VALUES('301',true,7,6);
INSERT INTO public.punto_interes_interior(nombre,activo,id_tipo,id_piso) VALUES('302',true,7,6);
INSERT INTO public.punto_interes_interior(nombre,activo,id_tipo,id_piso) VALUES('303',true,7,6);
INSERT INTO public.punto_interes_interior(nombre,activo,id_tipo,id_piso) VALUES('304',true,7,6);
INSERT INTO public.punto_interes_interior(nombre,activo,id_tipo,id_piso) VALUES('305',true,7,6);
INSERT INTO public.punto_interes_interior(nombre,activo,id_tipo,id_piso) VALUES('306',true,7,6);
INSERT INTO public.punto_interes_interior(nombre,activo,id_tipo,id_piso) VALUES('307',true,7,6);
-- Bloque A
-- primer piso
INSERT INTO public.punto_interes_interior(nombre,activo,id_tipo,id_piso) VALUES('Tenis de Mesa',true,13,7);
INSERT INTO public.punto_interes_interior(nombre,activo,id_tipo,id_piso) VALUES('Danza y Música',true,13,7);
INSERT INTO public.punto_interes_interior(nombre,activo,id_tipo,id_piso) VALUES('Sala de Descanso',true,13,7);
INSERT INTO public.punto_interes_interior(nombre,activo,id_tipo,id_piso) VALUES('Sala de Lactancia',true,13,7);
INSERT INTO public.punto_interes_interior(nombre,activo,id_tipo,id_piso) VALUES('ASPROUL',true,9,7);
INSERT INTO public.punto_interes_interior(nombre,activo,id_tipo,id_piso) VALUES('Bienestar SENA',true,9,7);
-- segundo nivel
INSERT INTO public.punto_interes_interior(nombre,activo,id_tipo,id_piso) VALUES('201',true,7,8);
INSERT INTO public.punto_interes_interior(nombre,activo,id_tipo,id_piso) VALUES('Simulación de Consulta',true,8,8);
INSERT INTO public.punto_interes_interior(nombre,activo,id_tipo,id_piso) VALUES('Antropometría',true,8,8);
INSERT INTO public.punto_interes_interior(nombre,activo,id_tipo,id_piso) VALUES('301',true,7,8);
-- Eduardo Octavio Jaramillo González - Bloque B
-- primer piso
INSERT INTO public.punto_interes_interior(nombre,activo,id_tipo,id_piso) VALUES('101',true,7,9);
INSERT INTO public.punto_interes_interior(nombre,activo,id_tipo,id_piso) VALUES('102',true,7,9);
INSERT INTO public.punto_interes_interior(nombre,activo,id_tipo,id_piso) VALUES('103',true,7,9);
INSERT INTO public.punto_interes_interior(nombre,activo,id_tipo,id_piso) VALUES('Decanatura Ciencias Económicas y Contables',true,9,9);
INSERT INTO public.punto_interes_interior(nombre,activo,id_tipo,id_piso) VALUES('Sala de Docentes',true,9,9);
INSERT INTO public.punto_interes_interior(nombre,activo,id_tipo,id_piso) VALUES('104',true,7,9);
INSERT INTO public.punto_interes_interior(nombre,activo,id_tipo,id_piso) VALUES('105',true,7,9);
INSERT INTO public.punto_interes_interior(nombre,activo,id_tipo,id_piso) VALUES('CEIDEUL',true,9,9);
INSERT INTO public.punto_interes_interior(nombre,activo,id_tipo,id_piso) VALUES('Cafetería Principal',true,10,9);
INSERT INTO public.punto_interes_interior(nombre,activo,id_tipo,id_piso) VALUES('Paraninfo Benjamin Herrera',true,11,9);
-- segundo piso
INSERT INTO public.punto_interes_interior(nombre,activo,id_tipo,id_piso) VALUES('201',true,7,10);
INSERT INTO public.punto_interes_interior(nombre,activo,id_tipo,id_piso) VALUES('203',true,7,10);
INSERT INTO public.punto_interes_interior(nombre,activo,id_tipo,id_piso) VALUES('Sala Satélite de Consulta',true,7,10);
INSERT INTO public.punto_interes_interior(nombre,activo,id_tipo,id_piso) VALUES('Sala LEF',true,9,10);
INSERT INTO public.punto_interes_interior(nombre,activo,id_tipo,id_piso) VALUES('205',true,7,10);
INSERT INTO public.punto_interes_interior(nombre,activo,id_tipo,id_piso) VALUES('206',true,7,10);
INSERT INTO public.punto_interes_interior(nombre,activo,id_tipo,id_piso) VALUES('Audiovisuales',true,9,10);
INSERT INTO public.punto_interes_interior(nombre,activo,id_tipo,id_piso) VALUES('Sala de Sistemas 1',true,7,10);
INSERT INTO public.punto_interes_interior(nombre,activo,id_tipo,id_piso) VALUES('Sala de Sistemas 2',true,7,10);
INSERT INTO public.punto_interes_interior(nombre,activo,id_tipo,id_piso) VALUES('Sala de Sistemas 3',true,7,10);
INSERT INTO public.punto_interes_interior(nombre,activo,id_tipo,id_piso) VALUES('Sala de Sistemas 4',true,7,10);
-- tercer piso
INSERT INTO public.punto_interes_interior(nombre,activo,id_tipo,id_piso) VALUES('401',true,7,11);
INSERT INTO public.punto_interes_interior(nombre,activo,id_tipo,id_piso) VALUES('402',true,7,11);
INSERT INTO public.punto_interes_interior(nombre,activo,id_tipo,id_piso) VALUES('403',true,7,11);
INSERT INTO public.punto_interes_interior(nombre,activo,id_tipo,id_piso) VALUES('404',true,7,11);
INSERT INTO public.punto_interes_interior(nombre,activo,id_tipo,id_piso) VALUES('405',true,7,11);
INSERT INTO public.punto_interes_interior(nombre,activo,id_tipo,id_piso) VALUES('502',true,7,11);
INSERT INTO public.punto_interes_interior(nombre,activo,id_tipo,id_piso) VALUES('503',true,7,11);
INSERT INTO public.punto_interes_interior(nombre,activo,id_tipo,id_piso) VALUES('Direcciones de Investigaciones',true,9,11);
-- Rodrigo Rivera Correa - Auditorio
INSERT INTO public.punto_interes_interior(nombre,activo,id_tipo,id_piso) VALUES('Mayor',true,11,12);
INSERT INTO public.punto_interes_interior(nombre,activo,id_tipo,id_piso) VALUES('Inclinado',true,11,12);
INSERT INTO public.punto_interes_interior(nombre,activo,id_tipo,id_piso) VALUES('Biblioteca',true,6,12);
-- Daniel Becerra Piedrahita - Bloque C
-- primer piso
INSERT INTO public.punto_interes_interior(nombre,activo,id_tipo,id_piso) VALUES('101',true,7,13);
INSERT INTO public.punto_interes_interior(nombre,activo,id_tipo,id_piso) VALUES('102',true,7,13);
INSERT INTO public.punto_interes_interior(nombre,activo,id_tipo,id_piso) VALUES('103',true,7,13);
INSERT INTO public.punto_interes_interior(nombre,activo,id_tipo,id_piso) VALUES('104',true,7,13);
INSERT INTO public.punto_interes_interior(nombre,activo,id_tipo,id_piso) VALUES('105',true,7,13);
INSERT INTO public.punto_interes_interior(nombre,activo,id_tipo,id_piso) VALUES('106',true,7,13);
INSERT INTO public.punto_interes_interior(nombre,activo,id_tipo,id_piso) VALUES('107',true,7,13);
INSERT INTO public.punto_interes_interior(nombre,activo,id_tipo,id_piso) VALUES('108',true,7,13);
INSERT INTO public.punto_interes_interior(nombre,activo,id_tipo,id_piso) VALUES('Prestación de Servicios',true,8,13);
INSERT INTO public.punto_interes_interior(nombre,activo,id_tipo,id_piso) VALUES('Nutrición y Dietética',true,8,13);
-- segundo piso
INSERT INTO public.punto_interes_interior(nombre,activo,id_tipo,id_piso) VALUES('201',true,7,14);
INSERT INTO public.punto_interes_interior(nombre,activo,id_tipo,id_piso) VALUES('202',true,7,14);
INSERT INTO public.punto_interes_interior(nombre,activo,id_tipo,id_piso) VALUES('203',true,7,14);
INSERT INTO public.punto_interes_interior(nombre,activo,id_tipo,id_piso) VALUES('204',true,7,14);
INSERT INTO public.punto_interes_interior(nombre,activo,id_tipo,id_piso) VALUES('205',true,7,14);
INSERT INTO public.punto_interes_interior(nombre,activo,id_tipo,id_piso) VALUES('206',true,7,14);
INSERT INTO public.punto_interes_interior(nombre,activo,id_tipo,id_piso) VALUES('207',true,7,14);
INSERT INTO public.punto_interes_interior(nombre,activo,id_tipo,id_piso) VALUES('208',true,7,14);
INSERT INTO public.punto_interes_interior(nombre,activo,id_tipo,id_piso) VALUES('209',true,7,14);
INSERT INTO public.punto_interes_interior(nombre,activo,id_tipo,id_piso) VALUES('210',true,7,14);
-- tercer piso
INSERT INTO public.punto_interes_interior(nombre,activo,id_tipo,id_piso) VALUES('301',true,7,15);
INSERT INTO public.punto_interes_interior(nombre,activo,id_tipo,id_piso) VALUES('302',true,7,15);
INSERT INTO public.punto_interes_interior(nombre,activo,id_tipo,id_piso) VALUES('303',true,7,15);
INSERT INTO public.punto_interes_interior(nombre,activo,id_tipo,id_piso) VALUES('304',true,7,15);
INSERT INTO public.punto_interes_interior(nombre,activo,id_tipo,id_piso) VALUES('305',true,7,15);
INSERT INTO public.punto_interes_interior(nombre,activo,id_tipo,id_piso) VALUES('306',true,7,15);
INSERT INTO public.punto_interes_interior(nombre,activo,id_tipo,id_piso) VALUES('307',true,7,15);
INSERT INTO public.punto_interes_interior(nombre,activo,id_tipo,id_piso) VALUES('308',true,7,15);
INSERT INTO public.punto_interes_interior(nombre,activo,id_tipo,id_piso) VALUES('309',true,7,15);
INSERT INTO public.punto_interes_interior(nombre,activo,id_tipo,id_piso) VALUES('310',true,7,15);
-- cuarto piso
INSERT INTO public.punto_interes_interior(nombre,activo,id_tipo,id_piso) VALUES('Decanatura Facultad de Ingenierías',true,9,16);
INSERT INTO public.punto_interes_interior(nombre,activo,id_tipo,id_piso) VALUES('Sala de Docentes',true,9,16);
INSERT INTO public.punto_interes_interior(nombre,activo,id_tipo,id_piso) VALUES('Audiovisuales',true,7,16);
INSERT INTO public.punto_interes_interior(nombre,activo,id_tipo,id_piso) VALUES('402',true,7,16);
INSERT INTO public.punto_interes_interior(nombre,activo,id_tipo,id_piso) VALUES('Sala de Docentes 2',true,9,16);
INSERT INTO public.punto_interes_interior(nombre,activo,id_tipo,id_piso) VALUES('403',true,7,16);
INSERT INTO public.punto_interes_interior(nombre,activo,id_tipo,id_piso) VALUES('404',true,7,16);
INSERT INTO public.punto_interes_interior(nombre,activo,id_tipo,id_piso) VALUES('Reactivos',true,15,16);
INSERT INTO public.punto_interes_interior(nombre,activo,id_tipo,id_piso) VALUES('406',true,7,16);
INSERT INTO public.punto_interes_interior(nombre,activo,id_tipo,id_piso) VALUES('407',true,7,16);
INSERT INTO public.punto_interes_interior(nombre,activo,id_tipo,id_piso) VALUES('Sala de Docentes 3',true,9,16);
INSERT INTO public.punto_interes_interior(nombre,activo,id_tipo,id_piso) VALUES('Decanatura Ciencias de la Salud, Exactas y Naturales',true,9,16);
-- quinto piso
INSERT INTO public.punto_interes_interior(nombre,activo,id_tipo,id_piso) VALUES('Químicos',true,15,17);
INSERT INTO public.punto_interes_interior(nombre,activo,id_tipo,id_piso) VALUES('Biología',true,8,17);
INSERT INTO public.punto_interes_interior(nombre,activo,id_tipo,id_piso) VALUES('Microbiología',true,8,17);
INSERT INTO public.punto_interes_interior(nombre,activo,id_tipo,id_piso) VALUES('Química',true,8,17);
INSERT INTO public.punto_interes_interior(nombre,activo,id_tipo,id_piso) VALUES('Coordinación de laboratorios FACSEN',true,9,17);
INSERT INTO public.punto_interes_interior(nombre,activo,id_tipo,id_piso) VALUES('Investigación',true,8,17);
INSERT INTO public.punto_interes_interior(nombre,activo,id_tipo,id_piso) VALUES('Simulación de Enfermería',true,8,17);
-- Alberto Mesa Abadía - Laboratorios
-- primer piso
INSERT INTO public.punto_interes_interior(nombre,activo,id_tipo,id_piso) VALUES('Hidráulica y Mecánica de Fluidos',true,8,18);
INSERT INTO public.punto_interes_interior(nombre,activo,id_tipo,id_piso) VALUES('Geología',true,8,18);
INSERT INTO public.punto_interes_interior(nombre,activo,id_tipo,id_piso) VALUES('Materiales de Construcción',true,8,18);
INSERT INTO public.punto_interes_interior(nombre,activo,id_tipo,id_piso) VALUES('Suelos',true,8,18);
INSERT INTO public.punto_interes_interior(nombre,activo,id_tipo,id_piso) VALUES('Pavimentos',true,8,18);
INSERT INTO public.punto_interes_interior(nombre,activo,id_tipo,id_piso) VALUES('Resistencia de Materiales',true,8,18);
INSERT INTO public.punto_interes_interior(nombre,activo,id_tipo,id_piso) VALUES('Geotecnólogo',true,9,18);
-- segundo piso
INSERT INTO public.punto_interes_interior(nombre,activo,id_tipo,id_piso) VALUES('Simulación Inversiones',true,9,19);
INSERT INTO public.punto_interes_interior(nombre,activo,id_tipo,id_piso) VALUES('Tecnología e Innovación Financiera',true,8,19);
INSERT INTO public.punto_interes_interior(nombre,activo,id_tipo,id_piso) VALUES('Obelix',true,9,19);
INSERT INTO public.punto_interes_interior(nombre,activo,id_tipo,id_piso) VALUES('Ingeniería de Software',true,8,19);
INSERT INTO public.punto_interes_interior(nombre,activo,id_tipo,id_piso) VALUES('Gestión Comercial',true,9,19);
INSERT INTO public.punto_interes_interior(nombre,activo,id_tipo,id_piso) VALUES('Simulación y Modelación Comercial',true,8,19);
INSERT INTO public.punto_interes_interior(nombre,activo,id_tipo,id_piso) VALUES('Logística y Mercadeo',true,8,19);
INSERT INTO public.punto_interes_interior(nombre,activo,id_tipo,id_piso) VALUES('Inteligencia Artificial y Robótica',true,8,19);
INSERT INTO public.punto_interes_interior(nombre,activo,id_tipo,id_piso) VALUES('Observatorio de Movimiento Fuerte',true,9,19);
INSERT INTO public.punto_interes_interior(nombre,activo,id_tipo,id_piso) VALUES('Topografía',true,15,19);
INSERT INTO public.punto_interes_interior(nombre,activo,id_tipo,id_piso) VALUES('Sala de Docentes',true,9,19);
INSERT INTO public.punto_interes_interior(nombre,activo,id_tipo,id_piso) VALUES('Sala SIG',true,7,19);
INSERT INTO public.punto_interes_interior(nombre,activo,id_tipo,id_piso) VALUES('Sala de Software en Ingeniería Civil',true,7,19);
-- Tercer piso
INSERT INTO public.punto_interes_interior(nombre,activo,id_tipo,id_piso) VALUES('Coordinación Laboratorios Ingenierías',true,9,20);
INSERT INTO public.punto_interes_interior(nombre,activo,id_tipo,id_piso) VALUES('Química y Análisis de Aguas',true,8,20);
INSERT INTO public.punto_interes_interior(nombre,activo,id_tipo,id_piso) VALUES('Química',true,8,20);
INSERT INTO public.punto_interes_interior(nombre,activo,id_tipo,id_piso) VALUES('Física Óptica y Ondulatoria',true,8,20);
INSERT INTO public.punto_interes_interior(nombre,activo,id_tipo,id_piso) VALUES('Física Mecánica, Electricidad y Magnetismo',true,8,20);
INSERT INTO public.punto_interes_interior(nombre,activo,id_tipo,id_piso) VALUES('Biología',true,8,20);