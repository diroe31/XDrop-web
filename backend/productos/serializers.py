from rest_framework import serializers
from .models import Coleccion, Categoria, Producto, ProductoImagen, VarianteProducto


class ProductoImagenSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductoImagen
        fields = ['id', 'imagen', 'orden']

class VarianteProductoSerializer(serializers.ModelSerializer):
    class Meta:
        model = VarianteProducto
        fields = ['id', 'nombre', 'imagen', 'stock', 'orden']

class ProductoSerializer(serializers.ModelSerializer):
    imagenes = ProductoImagenSerializer(many=True, read_only=True)
    variantes = VarianteProductoSerializer(many=True, read_only=True)
    categoria_nombre = serializers.CharField(source='categoria.nombre', read_only=True)
    coleccion_nombre = serializers.CharField(source='categoria.coleccion.nombre', read_only=True)

    class Meta:
        model = Producto
        fields = [
            'id', 'nombre', 'slug', 'descripcion', 'precio', 'stock',
            'categoria', 'categoria_nombre', 'coleccion_nombre', 'destacado',
            'imagenes', 'variantes'
        ]

class CategoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categoria
        fields = ['id', 'nombre', 'slug']


class ColeccionSerializer(serializers.ModelSerializer):
    categorias = CategoriaSerializer(many=True, read_only=True)

    class Meta:
        model = Coleccion
        fields = ['id', 'nombre', 'slug', 'imagen_portada', 'categorias']