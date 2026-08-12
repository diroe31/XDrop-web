from django.contrib import admin
from django.utils.html import format_html
from .models import Coleccion, Categoria, Producto, ProductoImagen, VarianteProducto


class ProductoImagenInline(admin.TabularInline):
    model = ProductoImagen
    extra = 1
    fields = ('imagen', 'orden', 'tipo')


class VarianteProductoInline(admin.TabularInline):
    model = VarianteProducto
    extra = 1
    fields = ('nombre', 'imagen', 'stock', 'orden')


@admin.register(Coleccion)
class ColeccionAdmin(admin.ModelAdmin):
    list_display = ('miniatura', 'nombre', 'slug')
    prepopulated_fields = {'slug': ('nombre',)}

    def miniatura(self, obj):
        if obj.imagen_portada:
            return format_html('<img src="{}" style="height:40px; border-radius:4px;" />', obj.imagen_portada.url)
        return "-"
    miniatura.short_description = "Imagen"


@admin.register(Categoria)
class CategoriaAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'coleccion')
    list_filter = ('coleccion',)
    prepopulated_fields = {'slug': ('nombre',)}


@admin.register(Producto)
class ProductoAdmin(admin.ModelAdmin):
    list_display = ('miniatura', 'nombre', 'categoria', 'precio', 'stock', 'destacado', 'activo')
    list_filter = ('categoria__coleccion', 'categoria', 'destacado', 'activo')
    prepopulated_fields = {'slug': ('nombre',)}
    inlines = [ProductoImagenInline, VarianteProductoInline]

    def miniatura(self, obj):
        primera = obj.imagenes.first()
        if primera:
            return format_html('<img src="{}" style="height:40px; border-radius:4px;" />', primera.imagen.url)
        return "-"
    miniatura.short_description = "Imagen"