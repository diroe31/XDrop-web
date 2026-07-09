from django.contrib import admin
from .models import ContenidoHome


@admin.register(ContenidoHome)
class ContenidoHomeAdmin(admin.ModelAdmin):
    list_display = ('tipo', 'titulo', 'autor_nombre', 'orden', 'activo')
    list_filter = ('tipo', 'activo')
    ordering = ('tipo', 'orden')

    fieldsets = (
        ('General', {
            'fields': ('tipo', 'orden', 'activo')
        }),
        ('Banner', {
            'fields': ('titulo', 'subtitulo', 'texto', 'imagen', 'texto_boton', 'url_boton'),
            'description': 'Usar solo si el tipo es "Banner principal"'
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