from django.db import models


class ContenidoHome(models.Model):
    TIPOS = [
        ('banner', 'Banner principal'),
        ('comentario', 'Comentario / Resena'),
        ('video_tiktok', 'Video de TikTok'),
        ('galeria', 'Imagen de galeria'),
    ]

    tipo = models.CharField(max_length=30, choices=TIPOS)

    # Campos generales (usados segun el tipo)
    titulo = models.CharField(max_length=150, blank=True)          # Ej: "EXPLORA NUESTRO UNIVERSO" (banner)
    subtitulo = models.CharField(max_length=200, blank=True)        # Ej: "COLECCIONABLES PREMIUM - EDICIONES LIMITADAS"
    texto = models.TextField(blank=True)                            # Texto del comentario, o texto libre del banner
    imagen = models.ImageField(upload_to='home/', blank=True, null=True)

    # Solo para banners
    texto_boton = models.CharField(max_length=50, blank=True)       # Ej: "Ver Catalogo"
    url_boton = models.CharField(max_length=200, blank=True)        # Ej: "/catalogo"

    # Solo para comentarios
    autor_nombre = models.CharField(max_length=100, blank=True)     # Ej: "Carlos M."
    autor_ubicacion = models.CharField(max_length=100, blank=True)  # Ej: "Buenos Aires"
    calificacion = models.PositiveSmallIntegerField(default=5)      # 1 a 5 estrellas
    etiqueta_producto = models.CharField(max_length=100, blank=True)  # Ej: "Street Fighter"

    # Solo para videos de TikTok
    url_video = models.URLField(blank=True)
    likes = models.CharField(max_length=20, blank=True)             # Ej: "14.2K" (texto, no numero exacto)
    reproducciones = models.CharField(max_length=20, blank=True)    # Ej: "384"

    orden = models.PositiveIntegerField(default=0)
    activo = models.BooleanField(default=True)

    class Meta:
        ordering = ['tipo', 'orden']

    def __str__(self):
        return f"{self.get_tipo_display()} - {self.titulo or self.autor_nombre or self.id}"
    

class Pregunta(models.Model):
    pregunta = models.CharField(max_length=250)
    respuesta = models.TextField()
    orden = models.PositiveIntegerField(default=0)
    activo = models.BooleanField(default=True)

    class Meta:
        ordering = ['orden']
        verbose_name = "Pregunta frecuente"
        verbose_name_plural = "Preguntas frecuentes"

    def __str__(self):
        return self.pregunta


class QuienesSomos(models.Model):
    titulo = models.CharField(max_length=150, default="Quienes somos")
    contenido = models.TextField()
    imagen = models.ImageField(upload_to='nosotros/', blank=True, null=True)

    class Meta:
        verbose_name = "Quienes somos"
        verbose_name_plural = "Quienes somos"

    def __str__(self):
        return self.titulo