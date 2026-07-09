-- Datos de ejemplo para que ambos vean lo mismo al desarrollar localmente.
-- Se carga automáticamente al levantar el contenedor con docker-compose.

INSERT INTO colecciones (nombre, slug) VALUES
  ('Resident Evil', 'resident-evil'),
  ('Counter Strike', 'counter-strike'),
  ('Minecraft', 'minecraft');

INSERT INTO categorias (coleccion_id, nombre, slug) VALUES
  (1, 'Figuras', 'figuras'),
  (1, 'Pósters', 'posters'),
  (1, 'Armas', 'armas'),
  (2, 'Figuras', 'figuras'),
  (3, 'Peluches', 'peluches');

INSERT INTO productos (categoria_id, nombre, slug, descripcion, precio, stock) VALUES
  (1, 'Figura Leon S. Kennedy', 'figura-leon-kennedy', 'Figura coleccionable 18cm', 129.90, 5),
  (2, 'Póster Resident Evil Village', 'poster-re-village', 'Póster A2 alta calidad', 25.00, 20);
