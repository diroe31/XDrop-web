-- ============================================================
-- ESQUEMA DE REFERENCIA — XDrop
-- Este archivo es una "foto" legible del esquema para consultar rápido.
-- La fuente real de la base de datos son las migraciones de Django
-- (backend/apps/*/migrations/). Si hay diferencia entre este archivo
-- y las migraciones, las migraciones mandan.
-- ============================================================

CREATE TABLE colecciones (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,          -- Ej: "Resident Evil"
    slug VARCHAR(100) UNIQUE NOT NULL,     -- Ej: "resident-evil"
    imagen_portada TEXT,
    creado_en TIMESTAMP DEFAULT NOW()
);

CREATE TABLE categorias (
    id SERIAL PRIMARY KEY,
    coleccion_id INTEGER REFERENCES colecciones(id) ON DELETE CASCADE,
    nombre VARCHAR(100) NOT NULL,          -- Ej: "Figuras", "Pósters", "Armas"
    slug VARCHAR(100) NOT NULL,
    UNIQUE (coleccion_id, slug)
);

CREATE TABLE productos (
    id SERIAL PRIMARY KEY,
    categoria_id INTEGER REFERENCES categorias(id) ON DELETE CASCADE,
    nombre VARCHAR(150) NOT NULL,
    slug VARCHAR(150) UNIQUE NOT NULL,
    descripcion TEXT,
    precio NUMERIC(10, 2) NOT NULL,
    stock INTEGER DEFAULT 0,
    activo BOOLEAN DEFAULT TRUE,
    creado_en TIMESTAMP DEFAULT NOW()
);

CREATE TABLE producto_imagenes (
    id SERIAL PRIMARY KEY,
    producto_id INTEGER REFERENCES productos(id) ON DELETE CASCADE,
    url TEXT NOT NULL,
    orden INTEGER DEFAULT 0
);

CREATE TABLE clientes (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(150) NOT NULL,
    telefono VARCHAR(20) NOT NULL,
    direccion TEXT,
    email VARCHAR(150),
    creado_en TIMESTAMP DEFAULT NOW()
);

CREATE TABLE pedidos (
    id SERIAL PRIMARY KEY,
    cliente_id INTEGER REFERENCES clientes(id),
    estado VARCHAR(30) DEFAULT 'pendiente_whatsapp',  -- pendiente_whatsapp | confirmado | enviado | cancelado
    total NUMERIC(10, 2) NOT NULL,
    creado_en TIMESTAMP DEFAULT NOW()
);

CREATE TABLE pedido_items (
    id SERIAL PRIMARY KEY,
    pedido_id INTEGER REFERENCES pedidos(id) ON DELETE CASCADE,
    producto_id INTEGER REFERENCES productos(id),
    cantidad INTEGER NOT NULL,
    precio_unitario NUMERIC(10, 2) NOT NULL
);

CREATE TABLE contenido_home (
    id SERIAL PRIMARY KEY,
    tipo VARCHAR(30) NOT NULL,   -- banner | comentario | video_tiktok | galeria
    titulo VARCHAR(150),
    contenido TEXT,              -- texto del comentario, URL del video/imagen, etc.
    orden INTEGER DEFAULT 0,
    activo BOOLEAN DEFAULT TRUE
);
