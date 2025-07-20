-- Seeds basados en el DDL existente
-- supabase/seed.sql

-- MAPA UBICACIÓN CENTRAL DEL CAMPUS
INSERT INTO public.mapa (latitud, longitud) VALUES (4.805407, -75.759847);

-- TIPOS 
INSERT INTO public.tipo (nombre_tipo) VALUES 
('Académico'),           -- 1
('Administrativo'),      -- 2
('Profesores'),          -- 3
('Particular'),          -- 4
('Escenario Deportivo'), -- 5
('Biblioteca'),          -- 6
('Salón'),              -- 7
('Laboratorio'),        -- 8
('Oficina'),            -- 9
('Kiosco'),             -- 10
('Auditorio'),          -- 11
('Papeleria'),          -- 12
('Bienestar'),          -- 13
('Zona de ingreso'),    -- 14
('Almacén');            -- 15

-- PUNTOS INTERES EXTERIOR
INSERT INTO public.punto_interes_exterior (nombre, latitud, longitud, id_mapa) VALUES 
('César Augusto López Arias', 4.804728, -75.759141, 1),
('Jaime Cortés Díaz', 4.803736, -75.759469, 1),
('Bloque A', 4.805174, -75.759409, 1),
('Eduardo Octavio Jaramillo González', 4.805702, -75.759426, 1),
('Rodrigo Rivera Correa', 4.805646, -75.760128, 1),
('Daniel Becerra Piedrahita', 4.8061549, -75.7600598, 1),
('Alberto Mesa Abadía', 4.806132, -75.760550, 1),
('Parqueadero', 4.804725, -75.758657, 1),
('Parqueadero', 4.804054, -75.759795, 1),
('Parqueadero', 4.804936, -75.759682, 1),
('Parqueadero', 4.806057, -75.759577, 1),
('Parqueadero', 4.806576, -75.760198, 1),
('Parqueadero', 4.804246, -75.758789, 1),
('Cancha de Futbol', 4.806215, -75.761021, 1),
('Cancha de Baloncesto', 4.806130, -75.761450, 1),
('Cancha de Volleibol', 4.806130, -75.761450, 1),
('Entrada Villa Olimpica', 4.804112, -75.758635, 1),
('Entrada Belmonte', 4.807033, -75.761539, 1),
('Cafeteria A', 4.805348, -75.759111, 1),
('Cafeteria B', 4.805437, -75.760029, 1),
('Papelería Principal', 4.805375, -75.759079, 1);

-- PARQUEADEROS
INSERT INTO public.parqueadero (id_punto_exterior, vehiculo, id_tipo) VALUES 
(8, 'Carros', 4),
(9, 'Carros', 4),
(10, 'Carros y Motos', 4),
(11, 'Carros', 3),
(12, 'Carros y Motos', 4),
(13, 'Motos', 4);

-- ESTRUCTURAS
INSERT INTO public.estructura (bloque, id_punto_exterior, id_tipo) VALUES 
('Administrativo', 1, 2),
('Posgrado', 2, 1),
('Bloque A', 3, 13),
('Bloque B', 4, 1),
('Auditorio', 5, 11),
('Bloque C', 6, 1),
('Laboratorios', 7, 1),
('Canchas', 14, 5),
('Canchas', 15, 5),
('Canchas', 16, 5),
('Entrada Villa Olimpica', 17, 14),
('Entrada Belmonte', 18, 14),
('Cafetería', 19, 10),
('Cafetería', 20, 10),
('Papelería', 21, 12);

-- IMAGENES
INSERT INTO public.imagen (nombre, id_punto_exterior) VALUES 
('cesarAImagen1', 1), ('cesarAImagen2', 1), ('cesarAImagen3', 1),
('jaimeCImagen1', 2), ('jaimeCImagen2', 2), ('jaimeCImagen3', 2),
('bloqueAImagen1', 3), ('bloqueAImagen2', 3), ('bloqueAImagen3', 3),
('eduardOImagen1', 4), ('eduardOImagen2', 4), ('eduardOImagen3', 4),
('rodrigoRImagen1', 5), ('rodrigoRImagen2', 5), ('rodrigoRImagen3', 5),
('danielBImagen1', 6), ('danielBImagen2', 6), ('danielBImagen3', 6),
('albertoMImagen1', 7), ('albertoMImagen2', 7), ('albertoMImagen3', 7),
('parq1Imagen1', 8), ('parq1Imagen2', 8),
('parq2Imagen1', 9), ('parq2Imagen2', 9),
('parq3Imagen1', 10), ('parq3Imagen2', 10),
('parq4Imagen1', 11), ('parq4Imagen2', 11),
('parq5Imagen1', 12), ('parq5Imagen2', 12),
('parq6Imagen1', 13), ('parq6Imagen2', 13),
('canchaFImagen1', 14), ('canchaFImagen2', 14),
('canchaBImagen1', 15), ('canchaBImagen2', 15),
('canchaVImagen1', 16), ('canchaVImagen2', 16),
('entradaVImagen1', 17), ('entradaVImagen2', 17),
('entradaBImagen1', 18), ('entradaBImagen2', 18),
('cafeAImagen1', 19), ('cafeAImagen2', 19),
('cafeBImagen1', 20), ('cafeBImagen2', 20),
('cafeAImagen1', 21), ('cafeAImagen2', 21);

-- PISOS (Algunos ejemplos - puedes agregar el resto)
INSERT INTO public.piso (nivel, id_estructura, plano) VALUES
-- César Augusto López Arias
('1', 1, 'cesarAplano1'), ('2', 1, 'cesarAplano2'), ('3', 1, 'cesarAplano3'),
-- Jaime Cortés Díaz
('1', 2, 'jaimeCplano1'), ('2', 2, 'jaimeCplano2'), ('3', 2, 'jaimeCplano3'),
-- Bloque A
('1', 3, 'bloqueAplano1'), ('2', 3, 'bloqueAplano2'),
-- Eduardo Octavio
('1', 4, 'eduardoOplano1'), ('2', 4, 'eduardoOplano2'), ('3', 4, 'eduardoOplano3'),
-- Rodrigo Rivera
('1', 5, 'rodrigoRplano1'),
-- Daniel Becerra
('1', 6, 'danielBplano1'), ('2', 6, 'danielBplano2'), ('3', 6, 'danielBplano3'), 
('4', 6, 'danielBplano4'), ('5', 6, 'danielBplano5'),
-- Alberto Mesa
('1', 7, 'albertoMplano1'), ('2', 7, 'albertoMplano2'), ('3', 7, 'albertoMplano3');

-- PUNTOS INTERES INTERIORES (Algunos ejemplos)
INSERT INTO public.punto_interes_interior (nombre, activo, id_tipo, id_piso) VALUES
-- César Augusto primer piso
('Seguridad y Salud en el trabajo', true, 9, 1),
('Mercadeo y Comunicaciones', true, 9, 1),
('Registro y Control', true, 9, 1),
('Tesorería', true, 9, 1),
-- César Augusto segundo piso
('Gestión Humana', true, 9, 2),
('Departamento de Sistemas', true, 9, 2),
-- César Augusto tercer piso
('Planeación', true, 9, 3),
('Proyección social', true, 9, 3),
('Rectoría y Comunicaciones', true, 9, 3);