-- supabase/migrations/20240101000000_initial_schema.sql
-- fecha: 19/07/2025

-- ENTIDAD MAPA
CREATE TABLE IF NOT EXISTS public.mapa (
    id_mapa SERIAL PRIMARY KEY,
    latitud REAL NOT NULL,
    longitud REAL NOT NULL
);

-- ENTIDAD TIPO
CREATE TABLE IF NOT EXISTS public.tipo (
    id_tipo SERIAL PRIMARY KEY,
    nombre_tipo TEXT NOT NULL
);

-- ENTIDAD PUNTO INTERES EXTERIOR
CREATE TABLE IF NOT EXISTS public.punto_interes_exterior (
    id_punto_exterior SERIAL PRIMARY KEY,
    nombre TEXT NOT NULL,
    latitud REAL NOT NULL,
    longitud REAL NOT NULL,
    activo BOOLEAN DEFAULT true,
    id_mapa INTEGER NOT NULL,
    FOREIGN KEY (id_mapa) REFERENCES public.mapa(id_mapa)
);

-- ENTIDAD ESTRUCTURA
CREATE TABLE IF NOT EXISTS public.estructura (
    id_estructura SERIAL PRIMARY KEY,
    bloque TEXT NOT NULL,
    id_punto_exterior INTEGER NOT NULL,
    id_tipo INTEGER NOT NULL,
    FOREIGN KEY (id_punto_exterior) REFERENCES public.punto_interes_exterior(id_punto_exterior),
    FOREIGN KEY (id_tipo) REFERENCES public.tipo(id_tipo)
);

-- ENTIDAD PARQUEADERO
CREATE TABLE IF NOT EXISTS public.parqueadero (
    id_parqueadero SERIAL PRIMARY KEY,
    id_punto_exterior INTEGER NOT NULL,
    vehiculo TEXT NOT NULL,
    id_tipo INTEGER NOT NULL,
    FOREIGN KEY (id_tipo) REFERENCES public.tipo(id_tipo),
    FOREIGN KEY (id_punto_exterior) REFERENCES public.punto_interes_exterior(id_punto_exterior)
);

-- ENTIDAD PISO
CREATE TABLE IF NOT EXISTS public.piso (
    id_piso SERIAL PRIMARY KEY,
    nivel TEXT NOT NULL,
    id_estructura INTEGER NOT NULL,
    plano TEXT NOT NULL,
    FOREIGN KEY (id_estructura) REFERENCES public.estructura(id_estructura)
);

-- ENTIDAD PUNTO INTERES INTERIOR
CREATE TABLE IF NOT EXISTS public.punto_interes_interior (
    id_punto_interior SERIAL PRIMARY KEY,
    nombre TEXT NOT NULL,
    activo BOOLEAN NOT NULL DEFAULT true,
    id_tipo INTEGER NOT NULL,
    id_piso INTEGER NOT NULL,
    FOREIGN KEY (id_tipo) REFERENCES public.tipo(id_tipo),
    FOREIGN KEY (id_piso) REFERENCES public.piso(id_piso)
);

-- ENTIDAD IMAGEN
CREATE TABLE IF NOT EXISTS public.imagen (
    id_imagen SERIAL PRIMARY KEY,
    nombre TEXT NOT NULL,
    id_punto_exterior INTEGER NOT NULL,
    FOREIGN KEY (id_punto_exterior) REFERENCES public.punto_interes_exterior(id_punto_exterior)
);

-- ENTIDAD ADMINISTRADOR (Simplificada para Supabase Auth)
CREATE TABLE IF NOT EXISTS public.administrador (
    id UUID REFERENCES auth.users ON DELETE CASCADE,
    email VARCHAR(255) UNIQUE NOT NULL,
    nombre VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    PRIMARY KEY (id)
);

-- Habilitar Row Level Security
ALTER TABLE public.mapa ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tipo ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.punto_interes_exterior ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.estructura ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.parqueadero ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.piso ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.punto_interes_interior ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.imagen ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.administrador ENABLE ROW LEVEL SECURITY;

-- Políticas básicas (lectura pública, escritura para administradores)
-- MAPA
CREATE POLICY "Lectura pública mapa" ON public.mapa
    FOR SELECT USING (true);

CREATE POLICY "Solo administradores pueden modificar mapa" ON public.mapa
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.administrador 
            WHERE administrador.id = auth.uid()
        )
    );

-- TIPO
CREATE POLICY "Lectura pública tipo" ON public.tipo
    FOR SELECT USING (true);

CREATE POLICY "Solo administradores pueden modificar tipo" ON public.tipo
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.administrador 
            WHERE administrador.id = auth.uid()
        )
    );

-- PUNTO INTERES EXTERIOR
CREATE POLICY "Lectura pública punto exterior" ON public.punto_interes_exterior
    FOR SELECT USING (true);

CREATE POLICY "Solo administradores pueden modificar punto exterior" ON public.punto_interes_exterior
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.administrador 
            WHERE administrador.id = auth.uid()
        )
    );

-- ESTRUCTURA
CREATE POLICY "Lectura pública estructura" ON public.estructura
    FOR SELECT USING (true);

CREATE POLICY "Solo administradores pueden modificar estructura" ON public.estructura
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.administrador 
            WHERE administrador.id = auth.uid()
        )
    );

-- PARQUEADERO
CREATE POLICY "Lectura pública parqueadero" ON public.parqueadero
    FOR SELECT USING (true);

CREATE POLICY "Solo administradores pueden modificar parqueadero" ON public.parqueadero
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.administrador 
            WHERE administrador.id = auth.uid()
        )
    );

-- PISO
CREATE POLICY "Lectura pública piso" ON public.piso
    FOR SELECT USING (true);

CREATE POLICY "Solo administradores pueden modificar piso" ON public.piso
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.administrador 
            WHERE administrador.id = auth.uid()
        )
    );

-- PUNTO INTERES INTERIOR
CREATE POLICY "Lectura pública punto interior" ON public.punto_interes_interior
    FOR SELECT USING (true);

CREATE POLICY "Solo administradores pueden modificar punto interior" ON public.punto_interes_interior
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.administrador 
            WHERE administrador.id = auth.uid()
        )
    );

-- IMAGEN
CREATE POLICY "Lectura pública imagen" ON public.imagen
    FOR SELECT USING (true);

CREATE POLICY "Solo administradores pueden modificar imagen" ON public.imagen
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.administrador 
            WHERE administrador.id = auth.uid()
        )
    );

-- ADMINISTRADOR
CREATE POLICY "Los administradores pueden ver su propia información" ON public.administrador
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Los administradores pueden actualizar su propia información" ON public.administrador
    FOR UPDATE USING (auth.uid() = id);