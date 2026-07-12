// lib/api.ts
// Todas las funciones que hablan con el backend de Django viven aqui.
// Nadie mas en el proyecto deberia escribir un fetch() a mano fuera de este archivo.

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api";

// ---------- Tipos ----------
export interface ProductoImagen {
  id: number;
  imagen: string;
  orden: number;
}

export interface Producto {
  id: number;
  nombre: string;
  slug: string;
  descripcion: string;
  precio: string;
  stock: number;
  categoria: number;
  categoria_nombre: string;
  coleccion_nombre: string;
  imagenes: ProductoImagen[];
}

export interface Categoria {
  id: number;
  nombre: string;
  slug: string;
}

export interface Coleccion {
  id: number;
  nombre: string;
  slug: string;
  imagen_portada: string | null;
  categorias: Categoria[];
}

export interface Pregunta {
  id: number;
  pregunta: string;
  respuesta: string;
  orden: number;
}

export interface Nosotros {
  id: number;
  titulo: string;
  contenido: string;
  imagen: string | null;
}

export interface ContenidoHome {
  id: number;
  tipo: "banner" | "comentario" | "video_tiktok" | "galeria";
  titulo: string;
  subtitulo: string;
  texto: string;
  imagen: string | null;
  texto_boton: string;
  url_boton: string;
  autor_nombre: string;
  autor_ubicacion: string;
  calificacion: number;
  etiqueta_producto: string;
  url_video: string;
  likes: string;
  reproducciones: string;
  orden: number;
}

interface Paginado<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

interface ItemCarrito {
  producto_id: number;
  cantidad: number;
}

interface DatosPedido {
  nombre: string;
  telefono: string;
  departamento?: string;
  provincia?: string;
  distrito?: string;
  tipo_entrega: "shalom" | "contraentrega";
  punto_recojo?: string;
  items: ItemCarrito[];
}

interface RespuestaPedido {
  pedido_codigo: string;
  total: string;
  link_whatsapp: string;
}

// ---------- Helper interno ----------
async function apiGet<T>(path: string): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, { cache: "no-store" });
  if (!res.ok) {
    throw new Error(`Error ${res.status} al pedir ${path}`);
  }
  return res.json();
}

// ---------- Productos / Colecciones / Categorias ----------
export function fetchProductos(params?: { coleccionId?: number; categoriaId?: number; destacado?: boolean }) {
  const query = new URLSearchParams();
  if (params?.coleccionId) query.set("categoria__coleccion", String(params.coleccionId));
  if (params?.categoriaId) query.set("categoria", String(params.categoriaId));
  if (params?.destacado) query.set("destacado", "true");
  const qs = query.toString() ? `?${query.toString()}` : "";
  return apiGet<Paginado<Producto>>(`/productos/${qs}`);
}

export function fetchProductoPorSlug(slug: string) {
  return apiGet<Producto>(`/productos/${slug}/`);
}

export function fetchColecciones() {
  return apiGet<Paginado<Coleccion>>(`/colecciones/`);
}

export function fetchColeccionPorSlug(slug: string) {
  return apiGet<Coleccion>(`/colecciones/${slug}/`);
}

// ---------- Contenido Home (banners, comentarios, tiktok) ----------
export function fetchContenidoHome(tipo?: ContenidoHome["tipo"]) {
  const qs = tipo ? `?tipo=${tipo}` : "";
  return apiGet<ContenidoHome[]>(`/contenido-home/${qs}`);
}

// ---------- FAQ y Quienes somos ----------
export function fetchPreguntas() {
  return apiGet<Pregunta[]>(`/contenido-home/preguntas/`);
}

export function fetchNosotros() {
  return apiGet<Nosotros[]>(`/contenido-home/nosotros/`);
}

// ---------- Pedidos (carrito -> WhatsApp) ----------
export async function crearPedido(datos: DatosPedido): Promise<RespuestaPedido> {
  const res = await fetch(`${API_URL}/pedidos/crear/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(datos),
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(JSON.stringify(error));
  }
  return res.json();
}

// ---------- Miniatura oficial de TikTok (sin gastar almacenamiento propio) ----------
export async function fetchTikTokThumbnail(urlVideo: string): Promise<string | null> {
  if (!urlVideo) return null;
  try {
    const res = await fetch(
      `https://www.tiktok.com/oembed?url=${encodeURIComponent(urlVideo)}`,
      { next: { revalidate: 3600 } } // se recuerda 1 hora, no se pide cada vez
    );
    if (!res.ok) return null;
    const data = await res.json();
    return data.thumbnail_url || null;
  } catch {
    return null;
  }
}