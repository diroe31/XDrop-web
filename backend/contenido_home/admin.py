from django.contrib import admin
from .models import ContenidoHome, Pregunta, QuienesSomos


@admin.register(ContenidoHome)
class ContenidoHomeAdmin(admin.ModelAdmin):
    list_display = ('tipo', 'titulo', 'autor_nombre', 'orden', 'activo')
    list_filter = ('tipo', 'activo')
    ordering = ('tipo', 'orden')

    fieldsets = (
        ('General', {
            'fields': ('tipo', 'orden', 'activo', 'texto'),
            'description': (
                'El campo "Texto" se usa para: el comentario/resena completo '
                '(si el tipo es Comentario), o un texto libre opcional '
                '(si el tipo es Banner).'
            )
        }),
        ('Banner / Galería', {
            'fields': ('titulo', 'subtitulo', 'imagen', 'texto_boton', 'url_boton'),
            'description': (
                'Titulo e Imagen se usan tanto para "Banner principal" como para '
                '"Imagen de galeria". Subtitulo, texto boton y url boton solo '
                'aplican al tipo Banner.'
            )
        }),
        ('Comentario', {
            'fields': ('autor_nombre', 'autor_ubicacion', 'calificacion', 'etiqueta_producto'),
            'description': 'Usar solo si el tipo es "Comentario / Resena". El texto del comentario va arriba, en la seccion General.'
        }),
        ('Video TikTok', {
            'fields': ('url_video', 'video_preview', 'likes', 'reproducciones'),
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