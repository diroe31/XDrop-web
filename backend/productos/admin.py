from django.contrib import admin
from .models import Coleccion, Categoria, Producto, ProductoImagen


class ProductoImagenInline(admin.TabularInline):
    model = ProductoImagen
    extra = 1


@admin.register(Coleccion)
class ColeccionAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'slug')
    prepopulated_fields = {'slug': ('nombre',)}


@admin.register(Categoria)
class CategoriaAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'coleccion')
    list_filter = ('coleccion',)
    prepopulated_fields = {'slug': ('nombre',)}


@admin.register(Producto)
class ProductoAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'categoria', 'precio', 'stock', 'activo')
    list_filter = ('categoria__coleccion', 'categoria', 'activo')
    prepopulated_fields = {'slug': ('nombre',)}
    inlines = [ProductoImagenInline]