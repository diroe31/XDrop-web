from django.contrib import admin
from .models import ContenidoHome, Pregunta, QuienesSomos


@admin.register(ContenidoHome)
class ContenidoHomeAdmin(admin.ModelAdmin):
    list_display = ('tipo', 'titulo', 'autor_nombre', 'orden', 'activo')
    list_filter = ('tipo', 'activo')
    ordering = ('tipo', 'orden')

    fieldsets = (
        ('General', {
            'fields': ('tipo', 'orden', 'activo')
        }),
        ('Banner / Galería', {
            'fields': ('titulo', 'subtitulo', 'texto', 'imagen', 'texto_boton', 'url_boton'),
            'description': (
                'Titulo e Imagen se usan tanto para "Banner principal" como para '
                '"Imagen de galeria". Los demas campos (subtitulo, texto, texto boton, '
                'url boton) solo aplican al tipo Banner.'
            )
        }),
        ('Comentario', {
            'fields': ('autor_nombre', 'autor_ubicacion', 'calificacion', 'etiqueta_producto'),
            'description': 'Usar solo si el tipo es "Comentario / Resena"'
        }),
        ('Video TikTok', {
            'fields': ('url_video', 'likes', 'reproducciones'),
            'description': 'Usar solo si el tipo es "Video de TikTok"'
        }),
    )


@admin.register(Pregunta)
class PreguntaAdmin(admin.ModelAdmin):
    list_display = ('pregunta', 'orden', 'activo')
    ordering = ('orden',)


@admin.register(QuienesSomos)
class QuienesSomosAdmin(admin.ModelAdmin):
    list_display = ('titulo',)